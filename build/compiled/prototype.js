// import { random, sizedArray2D } from "./helper_functions"
var SlotMachineSymbols;
(function (SlotMachineSymbols) {
    SlotMachineSymbols["CHERRY"] = "symbol-1";
    SlotMachineSymbols["BELL"] = "symbol-2";
    SlotMachineSymbols["STAR"] = "symbol-3";
})(SlotMachineSymbols || (SlotMachineSymbols = {}));
const SYMBOL_DATA = {
    "symbol-1": {
        symbolPath: "symbols/cherry.png",
        image: slotCell("symbols/cherry.png"),
        multiplier: 5
    },
    "symbol-2": {
        symbolPath: "symbols/bell.png",
        image: slotCell("symbols/bell.png"),
        multiplier: 10
    },
    "symbol-3": {
        symbolPath: "symbols/star.png",
        image: slotCell("symbols/star.png"),
        multiplier: 25
    },
};
const DEFAULT_REEL = [
    SlotMachineSymbols.CHERRY,
    SlotMachineSymbols.CHERRY,
    SlotMachineSymbols.BELL,
    SlotMachineSymbols.CHERRY,
    SlotMachineSymbols.BELL,
    SlotMachineSymbols.BELL,
    SlotMachineSymbols.CHERRY,
    SlotMachineSymbols.STAR,
    SlotMachineSymbols.CHERRY,
    SlotMachineSymbols.BELL,
    SlotMachineSymbols.CHERRY,
    SlotMachineSymbols.BELL,
    SlotMachineSymbols.BELL,
    SlotMachineSymbols.CHERRY,
    SlotMachineSymbols.CHERRY,
    SlotMachineSymbols.STAR,
    SlotMachineSymbols.CHERRY,
];
class SlotMachine {
    constructor(width, height) {
        this.table = document.querySelector("#slot-machine");
        this.reels = [];
        let reelsElements = this.createTable(width, height);
        for (const reelElements of reelsElements) {
            this.reels.push(new SlotMachineReel(reelElements));
        }
    }
    spin() {
        for (const reel of this.reels) {
            reel.spin();
        }
    }
    createTable(width, height) {
        const rowTemplate = document.querySelector("#slot-machine-row-template");
        const cellTemplate = document.querySelector("#slot-machine-cell-template");
        let reelsElements = sizedArray2D(width, height);
        for (let y = 0; y < height; y++) {
            let rowTemplateClone = rowTemplate.content.cloneNode(true);
            let newRow = rowTemplateClone.querySelector("tr");
            for (let x = 0; x < width; x++) {
                const cellTemplateClone = cellTemplate.content.cloneNode(true);
                const newCell = cellTemplateClone.querySelector("td");
                newCell.id = `new-cell-${x}-${y}`;
                reelsElements[x][y] = newCell;
                newRow.appendChild(newCell);
            }
            this.table.appendChild(newRow);
        }
        return reelsElements;
    }
}
class SlotMachineReel {
    constructor(elements) {
        this.currentPosition = 0;
        this.reelStrip = DEFAULT_REEL;
        this.advance = 0;
        this.elements = elements;
        this.updateElements();
    }
    spin() {
        this.advance = random(10, 20);
        clearInterval(this.spinInterval);
        this.spinInterval = setInterval(() => { this.advanceReel(); }, 100 + random(-40, 30));
    }
    advanceReel() {
        this.currentPosition = (this.currentPosition + 1) % this.reelStrip.length;
        this.updateElements();
        if (this.advance <= 0) {
            clearInterval(this.spinInterval);
            return;
        }
        this.advance--;
    }
    updateElements() {
        if (this.reelStrip.length < this.elements.length) {
            throw new Error("reel too short");
        }
        for (let i = 0; i < this.elements.length; i++) {
            let symbol = this.reelStrip[(this.currentPosition + i) % this.reelStrip.length];
            let cellImageSrc = SYMBOL_DATA[symbol].image;
            this.elements[i].querySelector("img").replaceWith(cellImageSrc);
            console.log(this.elements[i].querySelector("img").src);
        }
    }
}
function slotCell(symbolPath) {
    let cellImage = preloadImage(symbolPath);
    cellImage.classList.add("slot-cell");
    return cellImage;
}
// let slotMachine = new SlotMachine(3, 3)
// document.querySelector("#spin").addEventListener("click", () => { slotMachine.spin() })
//# sourceMappingURL=prototype.js.map