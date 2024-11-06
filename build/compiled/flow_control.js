let slotPage = document.querySelector("#slot-page");
let shopPage = document.querySelector("#shop-page");
document.querySelector("#shop").addEventListener('click', switchToShop);
document.querySelector("#close-shop").addEventListener('mousedown', switchToSlot);
// switchToShop()
shopPage.style.display = 'none';
function switchToShop() {
    slotPage.style.display = 'none';
    shopPage.style.display = null;
}
function switchToSlot() {
    slotPage.style.display = null;
    shopPage.style.display = 'none';
}
//# sourceMappingURL=flow_control.js.map