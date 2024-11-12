var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let titleScreen = document.querySelector("#title-screen");
let gameScreen = document.querySelector("#game");
let gameOverScreen = document.querySelector("#game-over-screen");
let slotPage = document.querySelector("#slot-page");
let shopPage = document.querySelector("#shop-page");
document.querySelector("#shop").addEventListener('click', switchToShop);
document.querySelector("#close-shop").addEventListener('mousedown', switchToSlot);
goToTitleScreen();
// switchToShop()
switchToSlot();
function goToTitleScreen() {
    titleScreen.style.display = null;
    gameScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
}
function startGame(selectedSpins) {
    updateSpins(selectedSpins);
    titleScreen.style.display = 'none';
    gameScreen.style.display = null;
    startSlotMachine();
}
function gameOver() {
    return __awaiter(this, void 0, void 0, function* () {
        yield delay(500);
        titleScreen.style.display = 'none';
        gameScreen.style.display = 'none';
        gameOverScreen.style.display = null;
        document.querySelector('#final-score').textContent = `Final Score: ${score}`;
    });
}
function switchToShop() {
    if (slotMachine && slotMachine.isSpinning)
        return;
    slotPage.style.display = 'none';
    shopPage.style.display = null;
}
function switchToSlot() {
    slotPage.style.display = null;
    shopPage.style.display = 'none';
}
function endGame() {
    window.location.reload();
}
//# sourceMappingURL=flow_control.js.map