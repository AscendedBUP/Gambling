type SymbolCounts = Record<SlotMachineSymbols, number>

const SLOT_MACHINE_MAX_WIDTH = 5
const SLOT_MACHINE_STARTING_WIDTH = 5
const SLOT_MACHINE_HEIGHT = 3
const CELL_SIZE = 128
const SPIN_LENGTH = 16
const POINT_DISPLAY_FORMAT = "Points: %s"
const REEL_SELECTOR: HTMLDivElement = document.querySelector("#reel-selector")

let selectedReel: SlotMachineReel

const SEQUENCE_LENGTH_MULTIPLIER: Record<number, number> = {
    3: 1,
    4: 5,
    5: 50
}

const DEFAULT_SYMBOL_COUNTS: Record<SlotMachineSymbols, number> = {
    "symbol-1": 0,
    "symbol-2": 0,
    "symbol-3": 0,
    "symbol-4": 0,
    "symbol-5": 0,
    "symbol-6": 0,
}

const STARTING_SYMBOL_COUNTS: Record<SlotMachineSymbols, number> = {
    "symbol-1": 20,
    "symbol-2": 15,
    "symbol-3": 5,
    "symbol-4": 5,
    "symbol-5": 0,
    "symbol-6": 3,
}

enum SlotMachineSymbols {
    CHERRY = 'symbol-1', 
    GRAPE = 'symbol-2',
    BELL = 'symbol-3', 
    LUCKY = 'symbol-4',
    STAR = 'symbol-5',
    SEVEN = 'symbol-6',
}

interface SymbolDataInterface {
    imageSrc: string
    image: HTMLImageElement
    score: number
    cost: number
}

const SYMBOL_DATA: {[key in SlotMachineSymbols]: SymbolDataInterface} = {
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
}

class SlotMachine {
    element = document.querySelector("#slot-machine") as HTMLDivElement
    reels: SlotMachineReel[] = []
    rolledSymbols = new Matrix<SlotMachineSymbols>(SLOT_MACHINE_MAX_WIDTH, SLOT_MACHINE_HEIGHT)
    isSpinning: boolean = false

    constructor() {
        console.log(this.element)

        for (let i = 0; i < SLOT_MACHINE_STARTING_WIDTH; i++) {
            this.reels.push(new SlotMachineReel(this.element, i))
        }
    }

    async spin() {
        if (this.isSpinning || score <= 0 || spins <= 0)
            return

        updateScore(-1)
        this.isSpinning = true
        let resultPromises: Promise<SlotMachineSymbols[]>[] = []

        for (const reel of this.reels) {
            resultPromises.push(reel.spin())
            await delay(200)
        }

        for (let i = 0; i < resultPromises.length; i++) {
            let reelResult = await resultPromises[i]
            this.rolledSymbols.replaceColumn(i, ...reelResult)
        }

        this.calculateResultScore()
        this.isSpinning = false

        updateSpins(-1)
    }

    calculateResultScore() {
        for (const row of this.rolledSymbols.rows) {
            updateScore(this.scoreSequence(row))
        }
    }

    scoreSequence(symbolSequence: SlotMachineSymbols[]): number {
        let length = 0
        let previousSymbol: SlotMachineSymbols

        for (const symbol of symbolSequence) {
            if (previousSymbol != undefined && previousSymbol != symbol)
                break

            length++
            previousSymbol = symbol
        }

        if (length < 3)
            return 0
        
        return SYMBOL_DATA[previousSymbol].score * SEQUENCE_LENGTH_MULTIPLIER[length]
    }
}

class SlotMachineReel {
    element: HTMLDivElement
    reelListing: ReelListing
    symbolCounts = new Proxy(structuredClone(DEFAULT_SYMBOL_COUNTS), {
        set: this.setSymbolCount.bind(this)
    })
    currentSymbols: SlotMachineSymbols[]

    constructor(slotMachine: HTMLDivElement, index: number) {
        this.element = this.createReelElement(slotMachine)
        this.reelListing = new ReelListing(this, index)
        
        for (const symbol in STARTING_SYMBOL_COUNTS) {
            this.symbolCounts[symbol] = STARTING_SYMBOL_COUNTS[symbol]
        }

        this.currentSymbols = this.fillReel(4).slice(1, 3)
        this.element.scroll({top: CELL_SIZE, behavior: "instant"})
    }

    async spin(): Promise<SlotMachineSymbols[]> {
        this.fillReel(SPIN_LENGTH)
        let result = this.fillReel(3)

        await smoothScrollBy(this.element, {top: -CELL_SIZE / 2})
        await acceleratingScrollTo(this.element, {top: CELL_SIZE * (SPIN_LENGTH + 4)}, 50, 4)
        
        this.cleanReel()
        return result
    }

    fillReel(symbolAmount: number): SlotMachineSymbols[] {
        let reelCells: HTMLImageElement[] = []
        let resultSymbols = this.getRandomSymbols(symbolAmount)

        for (const symbol of resultSymbols) {
            let newCell = slotCell(SYMBOL_DATA[symbol].imageSrc)
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

        for (const symbol of Object.keys(this.symbolCounts)) {
            let amount = this.symbolCounts[symbol]
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
        let templateClone = reelTemplate.content.cloneNode(true) as HTMLDivElement
        let newReel = templateClone.querySelector(".reel") as HTMLDivElement

        newReel.setAttribute("test", `1`)
        
        slotMachine.appendChild(newReel)
        return newReel
    }

    setSymbolCount(symbolSpread: SymbolCounts, symbol: SlotMachineSymbols, newAmount: number): boolean {
        newAmount = Math.max(0, newAmount)
        let difference = newAmount - symbolSpread[symbol]

        if (difference > 0) {
            this.reelListing.addToContents(symbol, difference)
        }
        else if (difference < 0) {
            this.reelListing.removeFromContents(symbol, -difference)
        }

        return Reflect.set(symbolSpread, symbol, newAmount)
    }
}

class ReelListing {
    reel: SlotMachineReel
    element: HTMLDivElement
    reelContentDisplay: HTMLDivElement

    static listingContainer: HTMLDivElement
    static selectedListing: ReelListing

    static selectListing(listing: ReelListing) {
        if (this.selectedListing) {
            this.selectedListing.element.classList.remove('selected-reel')
        }

        listing.element.classList.add('selected-reel')
        this.selectedListing = listing
    }

    constructor(reel: SlotMachineReel, index: number) {
        this.reel = reel
        this.element = this.createListingElement(index)
        this.reelContentDisplay = this.element.querySelector(".reel-contents")

        this.element.addEventListener("mousedown", this.selectListing.bind(this))
    }

    addToContents(symbol: SlotMachineSymbols, count: number) {
        let newElements: HTMLImageElement[] = []
        for (let i = 0; i < count; i++) {
            let newImage = createImage(SYMBOL_DATA[symbol].imageSrc)
            newImage.setAttribute("symbol", symbol)
            newElements.push(newImage)
        }

        this.reelContentDisplay.append(...newElements)
    }

    removeFromContents(symbol: SlotMachineSymbols, count: number) {
        let symbolImages = this.reelContentDisplay.querySelectorAll(`img[symbol=${symbol}]`)
        count = Math.min(count, symbolImages.length)

        for (let i = 0; i < count; i++) {
            symbolImages[i].remove()
        }
    }

    createListingElement(index: number): HTMLDivElement {
        if (!ReelListing.listingContainer)
            throw new Error("Listing container has not been set")

        let reelListingTemplate = document.querySelector("#reel-listing-template") as HTMLTemplateElement
        let templateContent = reelListingTemplate.content.cloneNode(true) as HTMLDivElement
        let reelListing = templateContent.querySelector(".reel-listing") as HTMLDivElement

        templateContent.querySelector(".reel-name").textContent = `Reel ${index + 1}`
        
        ReelListing.listingContainer.appendChild(reelListing)
        return reelListing
    }

    selectListing() {
        ReelListing.selectListing(this)
    }
}

function slotCell(symbolPath: string): HTMLImageElement {
    let cellImage = createImage(symbolPath)
    cellImage.classList.add("slot-cell")
    return cellImage
}

let score = 0
function updateScore(points: number) {
    score += points
    document.querySelector("#points-display").textContent = `Points: ${score}`
    console.log("current score", score)

    if (score <= 0) {
        gameOver()
    }
}

let spins: number = 0
function updateSpins(difference: number) {
    spins += difference
    document.querySelector("#spins-display").textContent = `Spins: ${spins}`

    if (spins <= 0) {
        gameOver()
    }
}

ReelListing.listingContainer = REEL_SELECTOR
updateScore(100);

let slotMachine : SlotMachine

// delay(40)
// .then(() => { startSlotMachine() })

function startSlotMachine() {
    slotMachine = new SlotMachine()
    slotMachine.element.onscroll = () => {console.log("is scrolling")}
    document.querySelector("#spin").addEventListener("click", () => { slotMachine.spin() })
}