let reelCosts = [100, 500, 1000]
let buyableReels: {[index: number]: {reel: HTMLDivElement, cost: number}} = {}

for (const listing of document.querySelectorAll(".reel-listing[locked=true]")) {
    let buyReelButton = listing.querySelector(".buy-reel")
    buyReelButton.addEventListener("click", () => { buyReel(listing as HTMLDivElement) })
}

function buyReel(reel: HTMLDivElement) {
    if (!reel.getAttribute("locked"))
        return

    reel.removeAttribute("locked")
}