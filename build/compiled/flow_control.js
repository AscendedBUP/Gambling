let slotPage = document.querySelector("#slot-page");
let shopPage = document.querySelector("#shop-page");
let shopButton = document.querySelector("#shop");
shopButton.onclick = switchToShop;
switchToShop();
function switchToShop() {
    slotPage.style.display = 'none';
    shopPage.style.display = null;
}
function switchToSlot() {
    slotPage.style.display = null;
    shopPage.style.display = 'none';
}
//# sourceMappingURL=flow_control.js.map