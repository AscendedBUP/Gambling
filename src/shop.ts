let selectedReel: HTMLDivElement = document.querySelector(".selected-reel")

for (const listing of document.querySelectorAll(".reel-listing")) {
    listing.addEventListener("mousedown", () => { selectReel(listing as HTMLDivElement) })
}

function selectReel(reel: HTMLDivElement) {
    if (selectedReel == reel || reel.getAttribute("locked"))
        return

    if (selectedReel) {
        selectedReel.classList.remove("selected-reel")
    }

    selectedReel = reel
    reel.classList.add("selected-reel")
}

let reelContents: HTMLImageElement[] = []
for (const symbol in testSymbolSpread) {
    let symbolImage = createImage(SYMBOL_DATA[symbol as SlotMachineSymbols].imagePath)
    let symbolCount = testSymbolSpread[symbol]

    for (let i = 0; i < symbolCount; i++) {
        reelContents.push(symbolImage.cloneNode() as HTMLImageElement)
    }
}

// console.log(reelContents)
selectedReel.querySelector(".reel-contents").replaceChildren(...reelContents)