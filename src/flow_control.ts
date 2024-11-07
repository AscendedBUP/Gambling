let slotPage = document.querySelector("#slot-page") as HTMLDivElement
let shopPage = document.querySelector("#shop-page") as HTMLDivElement
document.querySelector("#shop").addEventListener('click', switchToShop)
document.querySelector("#close-shop").addEventListener('mousedown', switchToSlot)

// switchToShop()
switchToSlot()

function switchToShop() {
    slotPage.style.display = 'none'
    shopPage.style.display = null
}

function switchToSlot() {
    slotPage.style.display = null
    shopPage.style.display = 'none'
}