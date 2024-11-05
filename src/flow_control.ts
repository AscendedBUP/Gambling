let slotPage = document.querySelector("#slot-page") as HTMLDivElement
let shopPage = document.querySelector("#shop-page") as HTMLDivElement
let shopButton = document.querySelector("#shop") as HTMLButtonElement

shopButton.onclick = switchToShop

switchToShop()

function switchToShop() {
    slotPage.style.display = 'none'
    shopPage.style.display = null
}

function switchToSlot() {
    slotPage.style.display = null
    shopPage.style.display = 'none'
}