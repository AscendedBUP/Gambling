// // import { acceleratingScrollTo, delay, random, sizedArray2D, smoothScroll } from "./helper_functions"
// // import { SlotMachineSymbols, SYMBOL_DATA } from "./prototype"
const CELL_SIZE = 128;
const SPIN_LENGTH = 16;
const POINT_DISPLAY_FORMAT = "Points: %s";
const SEQUENCE_LENGTH_MULTIPLIER = {
    3: 1,
    4: 5,
    5: 50
};
const testSymbolSpread = {
    "symbol-1": 11,
    "symbol-2": 8,
    "symbol-3": 5
};
// document.querySelector("#spin").addEventListener("click", onSpinClick)
// let slotMachine = document.querySelector('#slot-machine') as HTMLDivElement
// let reels = document.querySelectorAll(".reel") 
// let pointsDisplay = document.querySelector("#points-display") as HTMLHeadingElement
// console.log(reels)
// slotMachine.style.setProperty("--cell-size", `${CELL_SIZE}px`)
// let scrollPosition = 0
// let scrollTarget = 0
// let interval: number
// let timestamp: number = Date.now()
// let isSpinning = false
// let spinningReels = 0
// let spinResults: SlotMachineSymbols[][] = sizedArray2D(3, 5)
// let points: number = 0
// for (const reel of reels) {
//     reel.scrollTo({top: CELL_SIZE, behavior: "instant"})
// }
// function onSpinClick() {
//     if (isSpinning)
//         return
//     isSpinning = true
//     reels.forEach((reel, index) => {
//         delay(index * 400).then(() => {
//             spinningReels++
//             spin(reel as HTMLDivElement, index) 
//         })
//     })
// }
// async function spin(reel: HTMLDivElement, reelIndex: number) {
//     console.log("test")
//     let chosenSymbols = fillReel(reel)
//     await smoothScroll(reel, {top: reel.scrollTop - CELL_SIZE / 2})
//     await acceleratingScrollTo(reel, {top: CELL_SIZE * (SPIN_LENGTH + 1) }, 50, 4)
//     cleanReel(reel)
//     chosenSymbols.forEach((symbol, index) => {
//         spinResults[index][reelIndex] = symbol
//     })
//     spinningReels--
//     if (spinningReels <= 0) {
//         spinningReels = 0
//         checkSpin()
//     }
// }
// function checkSpin() {
//     for (const row of spinResults) {
//         let result = checkForSequence(row)
//         if (result == null)
//             continue
//         let symbolMultiplier = SYMBOL_DATA[result.symbol].multiplier
//         let lengthMultiplier = SEQUENCE_LENGTH_MULTIPLIER[result.length]
//         addToScore(symbolMultiplier * lengthMultiplier)
//     }
//     isSpinning = false
// }
// function checkForSequence(row: SlotMachineSymbols[]): {"symbol": SlotMachineSymbols, "length": number} | null {
//     let length = 0
//     let previousSymbol: SlotMachineSymbols = undefined
//     for (const symbol of row) {
//         if ( previousSymbol == symbol || previousSymbol == undefined) {
//             length++
//             previousSymbol = symbol
//             continue
//         }
//         if (length >= 3) {
//             return {symbol: previousSymbol, length: length}
//         }
//         length = 1
//         previousSymbol = symbol
//     }
//     if (length >= 3) {
//         return {symbol: previousSymbol, length: length}
//     }
//     return null
// }
// function fillReel(reel: HTMLDivElement): SlotMachineSymbols[] {
//     const newCells: HTMLImageElement[] = []
//     const potentialCells: SlotMachineSymbols[] = []
//     const resultSymbols: SlotMachineSymbols[] = []
//     for (const symbol in testSymbolSpread) {
//         let amount = testSymbolSpread[symbol]
//         for (let i = 0; i < amount; i++) {
//             potentialCells.push(symbol as SlotMachineSymbols)
//         }
//     }
//     for (let i = 0; i < SPIN_LENGTH - 3; i++) {
//         let randomIndex = random(0, potentialCells.length)
//         let chosenSymbol = potentialCells.splice(randomIndex, 1)[0]
//         newCells.push(SYMBOL_DATA[chosenSymbol].image.cloneNode() as HTMLImageElement)
//     }
//     for (let i = 0; i < 3; i++) {
//         let randomIndex = random(0, potentialCells.length)
//         let chosenSymbol = potentialCells.splice(randomIndex, 1)[0]
//         newCells.push(SYMBOL_DATA[chosenSymbol].image.cloneNode() as HTMLImageElement)
//         resultSymbols.push(chosenSymbol)
//     }
//     reel.append(...newCells)
//     return resultSymbols
// }
// function cleanReel(reel: HTMLDivElement) {
//     let necessaryCells = reel.querySelectorAll("img:nth-last-child(-n + 4)")
//     reel.replaceChildren(...necessaryCells)
//     reel.scrollTo({top: CELL_SIZE, behavior: "instant"})
// }
// function addToScore(value: number) {
//     points += value
//     pointsDisplay.textContent = POINT_DISPLAY_FORMAT.replace("%s", `${points}`)
//     console.log("current score", points)
// }
//# sourceMappingURL=test.js.map