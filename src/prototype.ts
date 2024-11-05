// import { random, sizedArray2D } from "./helper_functions"

type ReelStrip = SlotMachineSymbols[]

interface SymbolDataInterface {
    symbolPath: string
    image: HTMLImageElement
    multiplier: number
}

enum SlotMachineSymbols {
    CHERRY = 'symbol-1', 
    BELL = 'symbol-2', 
    STAR = 'symbol-3',
}

const SYMBOL_DATA: {[key in SlotMachineSymbols]: SymbolDataInterface} = {
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
}

const DEFAULT_REEL: ReelStrip = [
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
]

class SlotMachine {
    table = document.querySelector("#slot-machine")
    reels: SlotMachineReel[] = []

    constructor(width: number, height: number) {
        let reelsElements = this.createTable(width, height)

        for (const reelElements of reelsElements) {
            this.reels.push(new SlotMachineReel(reelElements))
        }
    }

    spin() {
        for (const reel of this.reels) {
            reel.spin()
        }
    }

    createTable(width: number, height: number): HTMLTableCellElement[][] {
        const rowTemplate = document.querySelector("#slot-machine-row-template") as HTMLTemplateElement;
        const cellTemplate = document.querySelector("#slot-machine-cell-template") as HTMLTemplateElement;
        let reelsElements: HTMLTableCellElement[][] = sizedArray2D(width, height)

        for (let y = 0; y < height; y++) {
            let rowTemplateClone = rowTemplate.content.cloneNode(true) as Element;
            let newRow = rowTemplateClone.querySelector("tr")

            for (let x = 0; x < width; x++) {
                const cellTemplateClone = cellTemplate.content.cloneNode(true) as Element;
                const newCell = cellTemplateClone.querySelector("td")
                newCell.id = `new-cell-${x}-${y}`

                reelsElements[x][y] = newCell
                newRow.appendChild(newCell);
            }
            this.table.appendChild(newRow);
        }

        return reelsElements
    }
}

class SlotMachineReel {
    currentPosition = 0
    reelStrip: ReelStrip = DEFAULT_REEL
    elements: HTMLTableCellElement[]
    advance: number = 0
    spinInterval: number

    constructor(elements: HTMLTableCellElement[]) {
        this.elements = elements
        this.updateElements()
    }

    spin() {
        this.advance = random(10, 20);

        clearInterval(this.spinInterval)
        this.spinInterval = setInterval(() => { this.advanceReel() }, 100 + random(-40, 30))
    }

    advanceReel() {
        this.currentPosition = (this.currentPosition + 1) % this.reelStrip.length
        this.updateElements()

        if (this.advance <= 0) {
            clearInterval(this.spinInterval)
            return
        }

        this.advance--
    }

    updateElements() {
        if (this.reelStrip.length < this.elements.length) {
            throw new Error("reel too short");
        }

        for (let i = 0; i < this.elements.length; i++) {
            let symbol = this.reelStrip[(this.currentPosition + i) % this.reelStrip.length];
            let cellImageSrc = SYMBOL_DATA[symbol].image;

            this.elements[i].querySelector("img").replaceWith(cellImageSrc);
            console.log(this.elements[i].querySelector("img").src)
        }
    }
}

function slotCell(symbolPath: string): HTMLImageElement {
    let cellImage = preloadImage(symbolPath)
    cellImage.classList.add("slot-cell")
    return cellImage
}

// let slotMachine = new SlotMachine(3, 3)

// document.querySelector("#spin").addEventListener("click", () => { slotMachine.spin() })

