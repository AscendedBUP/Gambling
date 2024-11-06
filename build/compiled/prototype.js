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
    constructor(width, height) {
        this.element = document.querySelector("#slot-machine");
        this.reels = [];
        width = Math.min(width, 5);
        for (let i = 0; i < width; i++) {
            this.reels.push(new SlotMachineReel);
        }
    }
    spin() {
        for (const reel of this.reels) {
            reel.spin();
        }
    }
}
class SlotMachineReel {
    spin() {
    }
}
// class SlotMachineReel {
//     currentPosition = 0
//     reelStrip: ReelStrip = DEFAULT_REEL
//     elements: HTMLTableCellElement[]
//     advance: number = 0
//     spinInterval: number
//     constructor(elements: HTMLTableCellElement[]) {
//         this.elements = elements
//         this.updateElements()
//     }
//     spin() {
//         this.advance = random(10, 20);
//         clearInterval(this.spinInterval)
//         this.spinInterval = setInterval(() => { this.advanceReel() }, 100 + random(-40, 30))
//     }
//     advanceReel() {
//         this.currentPosition = (this.currentPosition + 1) % this.reelStrip.length
//         this.updateElements()
//         if (this.advance <= 0) {
//             clearInterval(this.spinInterval)
//             return
//         }
//         this.advance--
//     }
//     updateElements() {
//         if (this.reelStrip.length < this.elements.length) {
//             throw new Error("reel too short");
//         }
//         for (let i = 0; i < this.elements.length; i++) {
//             let symbol = this.reelStrip[(this.currentPosition + i) % this.reelStrip.length];
//             let cellImageSrc = SYMBOL_DATA[symbol].image;
//             this.elements[i].querySelector("img").replaceWith(cellImageSrc);
//             console.log(this.elements[i].querySelector("img").src)
//         }
//     }
// }
function slotCell(symbolPath) {
    let cellImage = createImage(symbolPath);
    cellImage.classList.add("slot-cell");
    return cellImage;
}
// let slotMachine = new SlotMachine(3, 3)
// document.querySelector("#spin").addEventListener("click", () => { slotMachine.spin() })
//# sourceMappingURL=prototype.js.map