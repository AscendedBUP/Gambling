let reelCosts = [100, 500, 1000];
let buyableReels = {};
for (const listing of document.querySelectorAll(".reel-listing[locked=true]")) {
    let buyReelButton = listing.querySelector(".buy-reel");
    buyReelButton.addEventListener("click", () => { buyReel(listing); });
}
function buyReel(reel) {
    if (!reel.getAttribute("locked"))
        return;
    reel.removeAttribute("locked");
}
//# sourceMappingURL=reel_shop.js.map