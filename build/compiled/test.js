// import { acceleratingScrollTo, delay, random, sizedArray2D, smoothScroll } from "./helper_functions"
// import { SlotMachineSymbols, SYMBOL_DATA } from "./prototype"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const CELL_SIZE = 128;
const SPIN_LENGTH = 16;
const POINT_DISPLAY_FORMAT = "Points: %s";
const SEQUENCE_LENGTH_MULTIPLIER = {
    3: 1,
    4: 5,
    5: 50
};
document.querySelector("#spin").addEventListener("click", onSpinClick);
let slotMachine = document.querySelector('#slot-machine');
let reels = document.querySelectorAll(".reel");
let pointsDisplay = document.querySelector("#points-display");
console.log(reels);
slotMachine.style.setProperty("--cell-size", `${CELL_SIZE}px`);
let scrollPosition = 0;
let scrollTarget = 0;
let interval;
let timestamp = Date.now();
let isSpinning = false;
let spinningReels = 0;
let spinResults = sizedArray2D(3, 5);
let points = 0;
for (const reel of reels) {
    reel.scrollTo({ top: CELL_SIZE, behavior: "instant" });
}
const testSymbolSpread = {
    "symbol-1": 11,
    "symbol-2": 8,
    "symbol-3": 5
};
function onSpinClick() {
    if (isSpinning)
        return;
    isSpinning = true;
    reels.forEach((reel, index) => {
        delay(index * 400).then(() => {
            spinningReels++;
            spin(reel, index);
        });
    });
}
function spin(reel, reelIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("test");
        let chosenSymbols = fillReel(reel);
        yield smoothScroll(reel, { top: reel.scrollTop - CELL_SIZE / 2 });
        yield acceleratingScrollTo(reel, { top: CELL_SIZE * (SPIN_LENGTH + 1) }, 50, 4);
        cleanReel(reel);
        chosenSymbols.forEach((symbol, index) => {
            spinResults[index][reelIndex] = symbol;
        });
        spinningReels--;
        if (spinningReels <= 0) {
            spinningReels = 0;
            checkSpin();
        }
    });
}
function checkSpin() {
    for (const row of spinResults) {
        let result = checkForSequence(row);
        if (result == null)
            continue;
        let symbolMultiplier = SYMBOL_DATA[result.symbol].multiplier;
        let lengthMultiplier = SEQUENCE_LENGTH_MULTIPLIER[result.length];
        addToScore(symbolMultiplier * lengthMultiplier);
    }
    isSpinning = false;
}
function checkForSequence(row) {
    let length = 0;
    let previousSymbol = undefined;
    for (const symbol of row) {
        if (previousSymbol == symbol || previousSymbol == undefined) {
            length++;
            previousSymbol = symbol;
            continue;
        }
        if (length >= 3) {
            return { symbol: previousSymbol, length: length };
        }
        length = 1;
        previousSymbol = symbol;
    }
    if (length >= 3) {
        return { symbol: previousSymbol, length: length };
    }
    return null;
}
function fillReel(reel) {
    const newCells = [];
    const potentialCells = [];
    const resultSymbols = [];
    for (const symbol in testSymbolSpread) {
        let amount = testSymbolSpread[symbol];
        for (let i = 0; i < amount; i++) {
            potentialCells.push(symbol);
        }
    }
    for (let i = 0; i < SPIN_LENGTH - 3; i++) {
        let randomIndex = random(0, potentialCells.length);
        let chosenSymbol = potentialCells.splice(randomIndex, 1)[0];
        newCells.push(SYMBOL_DATA[chosenSymbol].image.cloneNode());
    }
    for (let i = 0; i < 3; i++) {
        let randomIndex = random(0, potentialCells.length);
        let chosenSymbol = potentialCells.splice(randomIndex, 1)[0];
        newCells.push(SYMBOL_DATA[chosenSymbol].image.cloneNode());
        resultSymbols.push(chosenSymbol);
    }
    reel.append(...newCells);
    return resultSymbols;
}
function cleanReel(reel) {
    let necessaryCells = reel.querySelectorAll("img:nth-last-child(-n + 4)");
    reel.replaceChildren(...necessaryCells);
    reel.scrollTo({ top: CELL_SIZE, behavior: "instant" });
}
function addToScore(value) {
    points += value;
    pointsDisplay.textContent = POINT_DISPLAY_FORMAT.replace("%s", `${points}`);
    console.log("current score", points);
}
//# sourceMappingURL=test.js.map