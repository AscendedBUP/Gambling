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
const SLOT_MACHINE_STARTING_WIDTH = 3;
const SLOT_MACHINE_HEIGHT = 3;
let score = 0;
var SlotMachineSymbols;
(function (SlotMachineSymbols) {
    SlotMachineSymbols["CHERRY"] = "symbol-1";
    SlotMachineSymbols["BELL"] = "symbol-2";
    SlotMachineSymbols["STAR"] = "symbol-3";
})(SlotMachineSymbols || (SlotMachineSymbols = {}));
const SYMBOL_DATA = {
    "symbol-1": {
        imagePath: "symbols/cherry.png",
        image: slotCell("symbols/cherry.png"),
        multiplier: 5
    },
    "symbol-2": {
        imagePath: "symbols/bell.png",
        image: slotCell("symbols/bell.png"),
        multiplier: 10
    },
    "symbol-3": {
        imagePath: "symbols/star.png",
        image: slotCell("symbols/star.png"),
        multiplier: 25
    },
};
class SlotMachine {
    constructor() {
        this.element = document.querySelector("#slot-machine");
        this.reels = [];
        this.rolledSymbols = new Matrix(SLOT_MACHINE_MAX_WIDTH, SLOT_MACHINE_HEIGHT);
        for (let i = 0; i < SLOT_MACHINE_STARTING_WIDTH; i++) {
            this.reels.push(new SlotMachineReel(this.element));
        }
    }
    spin() {
        return __awaiter(this, void 0, void 0, function* () {
            let resultPromises = [];
            for (const reel of this.reels) {
                resultPromises.push(reel.spin());
            }
            for (let i = 0; i < resultPromises.length; i++) {
                let reelResult = yield resultPromises[i];
                this.rolledSymbols.replaceColumn(i, ...reelResult);
            }
            this.calculateResultScore();
        });
    }
    calculateResultScore() {
        console.log(this.rolledSymbols);
    }
}
class SlotMachineReel {
    constructor(slotMachine) {
        this.symbolSpread = testSymbolSpread;
        this.element = this.createReelElement(slotMachine);
        this.currentSymbols = this.fillReel(4).slice(1, 3);
        this.element.scroll({ top: CELL_SIZE, behavior: "instant" });
    }
    spin() {
        return __awaiter(this, void 0, void 0, function* () {
            this.fillReel(SPIN_LENGTH);
            let result = this.fillReel(4);
            yield smoothScrollBy(this.element, { top: -CELL_SIZE / 2 });
            yield acceleratingScrollTo(this.element, { top: CELL_SIZE * (SPIN_LENGTH + 1) }, 50, 4);
            this.cleanReel();
            return result;
        });
    }
    fillReel(symbolAmount) {
        let reelCells = [];
        let resultSymbols = this.getRandomSymbols(symbolAmount);
        for (const symbol of resultSymbols) {
            let newCell = slotCell(SYMBOL_DATA[symbol].imagePath);
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
        for (const symbol in testSymbolSpread) {
            let amount = testSymbolSpread[symbol];
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
        let reelTemplateClone = reelTemplate.content;
        let newReel = reelTemplateClone.querySelector(".reel").cloneNode();
        console.log(newReel);
        slotMachine.appendChild(newReel);
        return newReel;
    }
}
function slotCell(symbolPath) {
    let cellImage = createImage(symbolPath);
    cellImage.classList.add("slot-cell");
    return cellImage;
}
let slotMachine = new SlotMachine();
document.querySelector("#spin").addEventListener("click", () => { slotMachine.spin(); });
// document.querySelector("#spin").addEventListener("click", () => { slotMachine.spin() })
//# sourceMappingURL=prototype.js.map