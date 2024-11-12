let titleScreen = document.querySelector("#title-screen") as HTMLDivElement
let gameScreen = document.querySelector("#game") as HTMLDivElement
let gameOverScreen = document.querySelector("#game-over-screen") as HTMLDivElement
let slotPage = document.querySelector("#slot-page") as HTMLDivElement
let shopPage = document.querySelector("#shop-page") as HTMLDivElement
document.querySelector("#shop").addEventListener('click', switchToShop)
document.querySelector("#close-shop").addEventListener('mousedown', switchToSlot)

goToTitleScreen()

// switchToShop()
switchToSlot()

function goToTitleScreen() {
    titleScreen.style.display = null
    gameScreen.style.display = 'none'
    gameOverScreen.style.display = 'none'
}

function startGame(selectedSpins: number) {
    updateSpins(selectedSpins)
    titleScreen.style.display = 'none'
    gameScreen.style.display = null
    startSlotMachine()
}

async function gameOver() {
    await delay(500)

    titleScreen.style.display = 'none'
    gameScreen.style.display = 'none'
    gameOverScreen.style.display = null

    document.querySelector('#final-score').textContent = `Final Score: ${score}`
}

function switchToShop() {
    if (slotMachine && slotMachine.isSpinning)
        return

    slotPage.style.display = 'none'
    shopPage.style.display = null
}

function switchToSlot() {
    slotPage.style.display = null
    shopPage.style.display = 'none'
}

function endGame() {
    window.location.reload()
}