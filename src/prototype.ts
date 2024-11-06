const SLOT_MACHINE_MAX_WIDTH = 5
const SLOT_MACHINE_STARTING_WIDTH = 3
const SLOT_MACHINE_HEIGHT = 3

let score = 0

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
    rolledSymbols = new Matrix<SlotMachineSymbols>(SLOT_MACHINE_MAX_WIDTH, SLOT_MACHINE_HEIGHT)

    constructor() {
        for (let i = 0; i < SLOT_MACHINE_STARTING_WIDTH; i++) {
            this.reels.push(new SlotMachineReel(this.element))
        }
    }

    async spin() {
        let resultPromises: Promise<SlotMachineSymbols[]>[] = []

        for (const reel of this.reels) {
            resultPromises.push(reel.spin())
        }

        for (let i = 0; i < resultPromises.length; i++) {
            let reelResult = await resultPromises[i]
            this.rolledSymbols.replaceColumn(i, ...reelResult)
        }

        this.calculateResultScore()
    }

    calculateResultScore() {
        console.log(this.rolledSymbols)
    }
}

class SlotMachineReel {
    symbolSpread: SymbolSpread = testSymbolSpread
    element: HTMLDivElement
    currentSymbols: SlotMachineSymbols[]

    constructor(slotMachine: HTMLDivElement) {
        this.element = this.createReelElement(slotMachine)
        this.currentSymbols = this.fillReel(4).slice(1, 3)
        this.element.scroll({top: CELL_SIZE, behavior: "instant"})
    }

    async spin(): Promise<SlotMachineSymbols[]> {
        this.fillReel(SPIN_LENGTH)
        let result = this.fillReel(4)

        await smoothScrollBy(this.element, {top: -CELL_SIZE / 2})
        await acceleratingScrollTo(this.element, {top: CELL_SIZE * (SPIN_LENGTH + 1) }, 50, 4)
        
        this.cleanReel()
        return result
    }

    fillReel(symbolAmount: number): SlotMachineSymbols[] {
        let reelCells: HTMLImageElement[] = []
        let resultSymbols = this.getRandomSymbols(symbolAmount)

        for (const symbol of resultSymbols) {
            let newCell = slotCell(SYMBOL_DATA[symbol].imagePath)
            reelCells.push(newCell)
        }

        this.element.append(...reelCells)
        return resultSymbols
    }

    cleanReel() {
        let necessaryCells = this.element.querySelectorAll("img:nth-last-child(-n + 4)")
        this.element.replaceChildren(...necessaryCells)
        this.element.scrollTo({top: CELL_SIZE, behavior: "instant"})
    }

    getRandomSymbols(length: number): SlotMachineSymbols[] {
        let result: SlotMachineSymbols[] = []
        let potentialCells: SlotMachineSymbols[] = []

        for (const symbol in testSymbolSpread) {
            let amount = testSymbolSpread[symbol]
            for (let i = 0; i < amount; i++) {
                potentialCells.push(symbol as SlotMachineSymbols)
            }
        }
        
        for (let i = 0; i < length; i++) {
            let randomIndex = random(0, potentialCells.length)
            let symbol = potentialCells.splice(randomIndex, 1)[0]
            result.push(symbol)
        }

        return result
    }

    createReelElement(slotMachine: HTMLDivElement): HTMLDivElement {
        let reelTemplate = document.querySelector("#reel-template") as HTMLTemplateElement
        let reelTemplateClone = reelTemplate.content
        let newReel = reelTemplateClone.querySelector(".reel").cloneNode() as HTMLDivElement

        console.log(newReel)

        slotMachine.appendChild(newReel)
        return newReel
    }
}

function slotCell(symbolPath: string): HTMLImageElement {
    let cellImage = createImage(symbolPath)
    cellImage.classList.add("slot-cell")
    return cellImage
}

let slotMachine = new SlotMachine()

document.querySelector("#spin").addEventListener("click", () => { slotMachine.spin() })

// document.querySelector("#spin").addEventListener("click", () => { slotMachine.spin() })

