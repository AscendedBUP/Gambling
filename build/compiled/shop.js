const SYMBOL_LISTING_CONTAINER = document.querySelector("#symbol-listings");
const SYMBOL_LISTING_TEMPLATE = document.querySelector("#symbol-listing-template");
for (const symbol in SlotMachineSymbols) {
    createSymbolListing(SlotMachineSymbols[symbol]);
}
function createSymbolListing(symbol) {
    let templateContent = SYMBOL_LISTING_TEMPLATE.content.cloneNode(true);
    let listingImage = templateContent.querySelector(".listing-image");
    let listingCost = templateContent.querySelector(".listing-cost");
    let buyButton = templateContent.querySelector(".buy-button");
    listingImage.src = SYMBOL_DATA[symbol].imageSrc;
    listingCost.textContent = `Cost: ${SYMBOL_DATA[symbol].cost}`;
    buyButton.addEventListener("click", () => { buySymbol(symbol); });
    SYMBOL_LISTING_CONTAINER.appendChild(templateContent);
}
function buySymbol(symbol) {
    let symbolCost = SYMBOL_DATA[symbol].cost;
    if (!ReelListing.selectedListing || score < symbolCost)
        return;
    let selectedReel = ReelListing.selectedListing.reel;
    selectedReel.symbolCounts[symbol] += 1;
    updateScore(-symbolCost);
}
//# sourceMappingURL=shop.js.map