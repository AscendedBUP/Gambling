const SYMBOL_LISTING_CONTAINER = document.querySelector("#symbol-listings") as HTMLDivElement
const SYMBOL_LISTING_TEMPLATE = document.querySelector("#symbol-listing-template") as HTMLTemplateElement

for (const symbol in SlotMachineSymbols) {
    createSymbolListing(SlotMachineSymbols[symbol]) 
}

function createSymbolListing(symbol: SlotMachineSymbols) {
    let templateContent = SYMBOL_LISTING_TEMPLATE.content.cloneNode(true) as HTMLDivElement
    let listingImage = templateContent.querySelector(".listing-image") as HTMLImageElement
    let listingCost = templateContent.querySelector(".listing-cost") as HTMLHeadingElement
    let buyButton = templateContent.querySelector(".buy-button") as HTMLButtonElement

    listingImage.src = SYMBOL_DATA[symbol].imageSrc
    listingCost.textContent = `Cost: ${SYMBOL_DATA[symbol].cost}`
    buyButton.addEventListener("click", () => { buySymbol(symbol) })

    SYMBOL_LISTING_CONTAINER.appendChild(templateContent)
}

function buySymbol(symbol: SlotMachineSymbols): void {
    let symbolCost = SYMBOL_DATA[symbol].cost

    if (!ReelListing.selectedListing || score <= symbolCost)
        return

    let selectedReel = ReelListing.selectedListing.reel
    selectedReel.symbolCounts[symbol] += 1
    updateScore(-symbolCost)
}