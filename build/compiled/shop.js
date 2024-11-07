let selectedReel = document.querySelector(".selected-reel");
for (const listing of document.querySelectorAll(".reel-listing")) {
    listing.addEventListener("mousedown", () => { selectReel(listing); });
}
function selectReel(reel) {
    if (selectedReel == reel || reel.getAttribute("locked"))
        return;
    if (selectedReel) {
        selectedReel.classList.remove("selected-reel");
    }
    selectedReel = reel;
    reel.classList.add("selected-reel");
}
// let reelContents: HTMLImageElement[] = []
// for (const symbol in DEFAULT_SYMBOL_SPREAD) {
//     let symbolImage = createImage(SYMBOL_DATA[symbol as SlotMachineSymbols].imagePath)
//     let symbolCount = DEFAULT_SYMBOL_SPREAD[symbol]
//     for (let i = 0; i < symbolCount; i++) {
//         reelContents.push(symbolImage.cloneNode() as HTMLImageElement)
//     }
// }
// console.log(reelContents)
// selectedReel.querySelector(".reel-contents").replaceChildren(...reelContents)
//# sourceMappingURL=shop.js.map