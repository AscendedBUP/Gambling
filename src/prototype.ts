const SLOT_MACHINE_MAX_WIDTH = 5
const SLOT_MACHINE_STARTING_WIDTH = 3
const SLOT_MACHINE_HEIGHT = 3

type SymbolSpread = Record<SlotMachineSymbols, number>

enum SlotMachineSymbols {
    CHERRY = 'symbol-1', 
    BELL = 'symbol-2', 
    STAR = 'symbol-3',
}

interface SymbolDataInterface {
    imagePath: string
    image: HTMLImageElement
    multiplier: number
}

const SYMBOL_DATA: {[key in SlotMachineSymbols]: SymbolDataInterface} = {
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
}

class SlotMachine {
    element = document.querySelector("#slot-machine") as HTMLDivElement
    reels: SlotMachineReel[] = []
    result = new Matrix<SlotMachineSymbols>(SLOT_MACHINE_MAX_WIDTH, SLOT_MACHINE_HEIGHT)

    constructor() {
        let width = SLOT_MACHINE_STARTING_WIDTH

        for (let i = 0; i < width; i++) {
            this.reels.push(new SlotMachineReel(this.element))
        }
    }

    spin() {
        for (const reel of this.reels) {
            reel.spin()
        }
    }
}

// class SlotMachineReel {
//     spin() {

//     }
// }

class SlotMachineReel {
    symbolSpread: SymbolSpread = testSymbolSpread
    element: HTMLDivElement

    constructor(slotMachine: HTMLDivElement) {
        this.element = this.createReelElement(slotMachine)
    }

    createReelElement(slotMachine: HTMLDivElement): HTMLDivElement {
        let reelTemplate = document.querySelector("#reel-template") as HTMLTemplateElement
        let newReel = reelTemplate.content.querySelector(".reel") as HTMLDivElement

        slotMachine.appendChild(newReel)
        return newReel
    }

    getRandomSymbols(length: number): SlotMachineSymbols[] {
        const potentialCells: SlotMachineSymbols[] = []

        for (const symbol in testSymbolSpread) {
            let amount = testSymbolSpread[symbol]
            for (let i = 0; i < amount; i++) {
                potentialCells.push(symbol as SlotMachineSymbols)
            }
        }
    
    }

    // spin() {
    //     this.advance = random(10, 20);

    //     clearInterval(this.spinInterval)
    //     this.spinInterval = setInterval(() => { this.advanceReel() }, 100 + random(-40, 30))
    // }

    // advanceReel() {
    //     this.currentPosition = (this.currentPosition + 1) % this.reelStrip.length
    //     this.updateElements()

    //     if (this.advance <= 0) {
    //         clearInterval(this.spinInterval)
    //         return
    //     }

    //     this.advance--
    // }

    // updateElements() {
    //     if (this.reelStrip.length < this.elements.length) {
    //         throw new Error("reel too short");
    //     }

    //     for (let i = 0; i < this.elements.length; i++) {
    //         let symbol = this.reelStrip[(this.currentPosition + i) % this.reelStrip.length];
    //         let cellImageSrc = SYMBOL_DATA[symbol].image;

    //         this.elements[i].querySelector("img").replaceWith(cellImageSrc);
    //         console.log(this.elements[i].querySelector("img").src)
    //     }
    // }
}

function slotCell(symbolPath: string): HTMLImageElement {
    let cellImage = createImage(symbolPath)
    cellImage.classList.add("slot-cell")
    return cellImage
}

// let slotMachine = new SlotMachine(3, 3)

// document.querySelector("#spin").addEventListener("click", () => { slotMachine.spin() })

