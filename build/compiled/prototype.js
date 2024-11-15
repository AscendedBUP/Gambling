var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SLOT_MACHINE_MAX_WIDTH = 5;
const SLOT_MACHINE_STARTING_WIDTH = 5;
const SLOT_MACHINE_HEIGHT = 3;
const CELL_SIZE = 128;
const SPIN_LENGTH = 16;
const POINT_DISPLAY_FORMAT = "Points: %s";
const REEL_SELECTOR = document.querySelector("#reel-selector");
let selectedReel;
const SEQUENCE_LENGTH_MULTIPLIER = {
    3: 1,
    4: 5,
    5: 50
};
const DEFAULT_SYMBOL_COUNTS = {
    "symbol-1": 0,
    "symbol-2": 0,
    "symbol-3": 0,
    "symbol-4": 0,
    "symbol-5": 0,
    "symbol-6": 0,
};
const STARTING_SYMBOL_COUNTS = {
    "symbol-1": 20,
    "symbol-2": 15,
    "symbol-3": 5,
    "symbol-4": 5,
    "symbol-5": 0,
    "symbol-6": 3,
};
var SlotMachineSymbols;
(function (SlotMachineSymbols) {
    SlotMachineSymbols["CHERRY"] = "symbol-1";
    SlotMachineSymbols["GRAPE"] = "symbol-2";
    SlotMachineSymbols["BELL"] = "symbol-3";
    SlotMachineSymbols["LUCKY"] = "symbol-4";
    SlotMachineSymbols["STAR"] = "symbol-5";
    SlotMachineSymbols["SEVEN"] = "symbol-6";
})(SlotMachineSymbols || (SlotMachineSymbols = {}));
const SYMBOL_DATA = {
    "symbol-1": {
        imageSrc: "symbols/cherry.png",
        image: slotCell("symbols/cherry.png"),
        score: 5,
        cost: 5,
    },
    "symbol-2": {
        imageSrc: "symbols/grape.png",
        image: slotCell("symbols/grape.png"),
        score: 10,
        cost: 10,
    },
    "symbol-3": {
        imageSrc: "symbols/bell.png",
        image: slotCell("symbols/bell.png"),
        score: 15,
        cost: 20,
    },
    "symbol-4": {
        imageSrc: "symbols/lucky.png",
        image: slotCell("symbols/lucky.png"),
        score: 20,
        cost: 25,
    },
    "symbol-5": {
        imageSrc: "symbols/star.png",
        image: slotCell("symbols/star.png"),
        score: 50,
        cost: 30,
    },
    "symbol-6": {
        imageSrc: "symbols/seven.png",
        image: slotCell("symbols/seven.png"),
        score: 100,
        cost: 100,
    },
};
class SlotMachine {
    constructor() {
        this.element = document.querySelector("#slot-machine");
        this.reels = [];
        this.rolledSymbols = new Matrix(SLOT_MACHINE_MAX_WIDTH, SLOT_MACHINE_HEIGHT);
        this.isSpinning = false;
        console.log(this.element);
        for (let i = 0; i < SLOT_MACHINE_STARTING_WIDTH; i++) {
            this.reels.push(new SlotMachineReel(this.element, i));
        }
    }
    spin() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isSpinning || score <= 0 || spins <= 0)
                return;
            updateScore(-1);
            this.isSpinning = true;
            let resultPromises = [];
            for (const reel of this.reels) {
                resultPromises.push(reel.spin());
                yield delay(200);
            }
            for (let i = 0; i < resultPromises.length; i++) {
                let reelResult = yield resultPromises[i];
                this.rolledSymbols.replaceColumn(i, ...reelResult);
            }
            this.calculateResultScore();
            this.isSpinning = false;
            updateSpins(-1);
        });
    }
    calculateResultScore() {
        for (const row of this.rolledSymbols.rows) {
            updateScore(this.scoreSequence(row));
        }
    }
    scoreSequence(symbolSequence) {
        let length = 0;
        let previousSymbol;
        for (const symbol of symbolSequence) {
            if (previousSymbol != undefined && previousSymbol != symbol)
                break;
            length++;
            previousSymbol = symbol;
        }
        if (length < 3)
            return 0;
        return SYMBOL_DATA[previousSymbol].score * SEQUENCE_LENGTH_MULTIPLIER[length];
    }
}
class SlotMachineReel {
    constructor(slotMachine, index) {
        this.symbolCounts = new Proxy(structuredClone(DEFAULT_SYMBOL_COUNTS), {
            set: this.setSymbolCount.bind(this)
        });
        this.element = this.createReelElement(slotMachine);
        this.reelListing = new ReelListing(this, index);
        for (const symbol in STARTING_SYMBOL_COUNTS) {
            this.symbolCounts[symbol] = STARTING_SYMBOL_COUNTS[symbol];
        }
        this.currentSymbols = this.fillReel(4).slice(1, 3);
        this.element.scroll({ top: CELL_SIZE, behavior: "instant" });
    }
    spin() {
        return __awaiter(this, void 0, void 0, function* () {
            this.fillReel(SPIN_LENGTH);
            let result = this.fillReel(3);
            yield smoothScrollBy(this.element, { top: -CELL_SIZE / 2 });
            yield acceleratingScrollTo(this.element, { top: CELL_SIZE * (SPIN_LENGTH + 4) }, 50, 4);
            this.cleanReel();
            return result;
        });
    }
    fillReel(symbolAmount) {
        let reelCells = [];
        let resultSymbols = this.getRandomSymbols(symbolAmount);
        for (const symbol of resultSymbols) {
            let newCell = slotCell(SYMBOL_DATA[symbol].imageSrc);
            reelCells.push(newCell);
        }
        this.element.append(...reelCells);
        return resultSymbols;
    }
    cleanReel() {
        let necessaryCells = this.element.querySelectorAll("img:nth-last-child(-n + 4)");
        this.element.replaceChildren(...necessaryCells);
        this.element.scrollTo({ top: CELL_SIZE, behavior: "instant" });
    }
    getRandomSymbols(length) {
        let result = [];
        let potentialCells = [];
        for (const symbol of Object.keys(this.symbolCounts)) {
            let amount = this.symbolCounts[symbol];
            for (let i = 0; i < amount; i++) {
                potentialCells.push(symbol);
            }
        }
        for (let i = 0; i < length; i++) {
            let randomIndex = random(0, potentialCells.length);
            let symbol = potentialCells.splice(randomIndex, 1)[0];
            result.push(symbol);
        }
        return result;
    }
    createReelElement(slotMachine) {
        let reelTemplate = document.querySelector("#reel-template");
        let templateClone = reelTemplate.content.cloneNode(true);
        let newReel = templateClone.querySelector(".reel");
        newReel.setAttribute("test", `1`);
        slotMachine.appendChild(newReel);
        return newReel;
    }
    setSymbolCount(symbolSpread, symbol, newAmount) {
        newAmount = Math.max(0, newAmount);
        let difference = newAmount - symbolSpread[symbol];
        if (difference > 0) {
            this.reelListing.addToContents(symbol, difference);
        }
        else if (difference < 0) {
            this.reelListing.removeFromContents(symbol, -difference);
        }
        return Reflect.set(symbolSpread, symbol, newAmount);
    }
}
class ReelListing {
    static selectListing(listing) {
        if (this.selectedListing) {
            this.selectedListing.element.classList.remove('selected-reel');
        }
        listing.element.classList.add('selected-reel');
        this.selectedListing = listing;
    }
    constructor(reel, index) {
        this.reel = reel;
        this.element = this.createListingElement(index);
        this.reelContentDisplay = this.element.querySelector(".reel-contents");
        this.element.addEventListener("mousedown", this.selectListing.bind(this));
    }
    addToContents(symbol, count) {
        let newElements = [];
        for (let i = 0; i < count; i++) {
            let newImage = createImage(SYMBOL_DATA[symbol].imageSrc);
            newImage.setAttribute("symbol", symbol);
            newElements.push(newImage);
        }
        this.reelContentDisplay.append(...newElements);
    }
    removeFromContents(symbol, count) {
        let symbolImages = this.reelContentDisplay.querySelectorAll(`img[symbol=${symbol}]`);
        count = Math.min(count, symbolImages.length);
        for (let i = 0; i < count; i++) {
            symbolImages[i].remove();
        }
    }
    createListingElement(index) {
        if (!ReelListing.listingContainer)
            throw new Error("Listing container has not been set");
        let reelListingTemplate = document.querySelector("#reel-listing-template");
        let templateContent = reelListingTemplate.content.cloneNode(true);
        let reelListing = templateContent.querySelector(".reel-listing");
        templateContent.querySelector(".reel-name").textContent = `Reel ${index + 1}`;
        ReelListing.listingContainer.appendChild(reelListing);
        return reelListing;
    }
    selectListing() {
        ReelListing.selectListing(this);
    }
}
function slotCell(symbolPath) {
    let cellImage = createImage(symbolPath);
    cellImage.classList.add("slot-cell");
    return cellImage;
}
let score = 0;
function updateScore(points) {
    score += points;
    document.querySelector("#points-display").textContent = `Points: ${score}`;
    console.log("current score", score);
    if (score <= 0) {
        gameOver();
    }
}
let spins = 0;
function updateSpins(difference) {
    spins += difference;
    document.querySelector("#spins-display").textContent = `Spins: ${spins}`;
    if (spins <= 0) {
        gameOver();
    }
}
ReelListing.listingContainer = REEL_SELECTOR;
updateScore(100);
let slotMachine;
// delay(40)
// .then(() => { startSlotMachine() })
function startSlotMachine() {
    slotMachine = new SlotMachine();
    slotMachine.element.onscroll = () => { console.log("is scrolling"); };
    document.querySelector("#spin").addEventListener("click", () => { slotMachine.spin(); });
}
//# sourceMappingURL=prototype.js.map