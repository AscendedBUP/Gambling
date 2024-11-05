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
//# sourceMappingURL=shop.js.map