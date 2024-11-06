function delay(milliseconds) {
    return new Promise(resolve => { setTimeout(resolve, milliseconds); });
}
function acceleratingScrollTo(element, offset, targetSpeed = 8, acceleration = 2) {
    let scrollTargetX = (offset.left) ? offset.left : element.scrollLeft;
    let scrollTargetY = (offset.top) ? offset.top : element.scrollTop;
    let scrollDirectionX = Math.sign(scrollTargetX - element.scrollLeft);
    let scrollDirectionY = Math.sign(scrollTargetY - element.scrollTop);
    return new Promise((resolve, reject) => {
        const scrollXInterval = (scrollDirectionX != 0) ? setInterval(scrollX, 20) : 0;
        const scrollYInterval = (scrollDirectionY != 0) ? setInterval(scrollY, 20) : 0;
        let scrollXDone = (scrollDirectionX == 0);
        let scrollYDone = (scrollDirectionY == 0);
        let currentSpeedX = acceleration;
        let currentSpeedY = acceleration;
        function scrollX() {
            let elementPreviousScroll = element.scrollLeft;
            element.scrollBy({ left: currentSpeedX * scrollDirectionX, top: currentSpeedX * scrollDirectionY, behavior: "instant" });
            // console.log(elementPreviousScroll, element.scrollLeft)
            if (elementPreviousScroll == element.scrollLeft)
                failScroll();
            if (currentSpeedX < targetSpeed)
                currentSpeedX = Math.min(currentSpeedX + acceleration, targetSpeed);
            if (Math.sign(scrollTargetX - element.scrollLeft) == scrollDirectionX)
                return;
            element.scrollTo({ left: scrollTargetX, behavior: "instant" });
            clearTimeout(scrollXInterval);
            scrollXDone = true;
            if (scrollYDone)
                resolve();
        }
        function scrollY() {
            let elementPreviousScroll = element.scrollTop;
            element.scrollBy({ left: currentSpeedY * scrollDirectionX, top: currentSpeedY * scrollDirectionY, behavior: "instant" });
            // console.log(elementPreviousScroll, element.scrollTop, scrollTargetY, Math.sign(scrollTargetY - element.scrollTop))
            if (elementPreviousScroll == element.scrollTop)
                failScroll();
            if (currentSpeedY < targetSpeed)
                currentSpeedY = Math.min(currentSpeedY + acceleration, targetSpeed);
            if (Math.sign(scrollTargetY - element.scrollTop) == scrollDirectionY)
                return;
            element.scrollTo({ top: scrollTargetY, behavior: "instant" });
            clearTimeout(scrollYInterval);
            scrollYDone = true;
            if (scrollXDone)
                resolve();
        }
        function failScroll() {
            clearInterval(scrollXInterval);
            clearInterval(scrollYInterval);
            reject();
        }
    });
}
function linearScrollTo(element, offset, speed = 8) {
    return acceleratingScrollTo(element, offset, speed, speed);
}
function linearScrollBy(element, offset, speed = 8) {
    let scrollTargetX = (offset.left) ? element.scrollLeft + offset.left : element.scrollLeft;
    let scrollTargetY = (offset.top) ? element.scrollTop + offset.top : element.scrollTop;
    return linearScrollTo(element, { left: scrollTargetX, top: scrollTargetY }, speed);
}
function smoothScroll(element, offset, timeLimit = 3000) {
    let scrollTargetX = (offset.left) ? offset.left : element.scrollLeft;
    let scrollTargetY = (offset.top) ? offset.top : element.scrollTop;
    return new Promise((resolve, reject) => {
        const failureTimer = setTimeout(reject, timeLimit);
        element.addEventListener("scrollend", onScrollSuccessful, { once: true });
        element.scrollTo({ behavior: "smooth", left: scrollTargetX, top: scrollTargetY });
        function onScrollSuccessful() {
            clearTimeout(failureTimer);
            resolve();
        }
    });
}
function smoothScrollBy(element, offset, timeLimit = 3000) {
    let scrollTargetX = (offset.left) ? element.scrollLeft + offset.left : element.scrollLeft;
    let scrollTargetY = (offset.top) ? element.scrollTop + offset.top : element.scrollTop;
    return smoothScroll(element, { left: scrollTargetX, top: scrollTargetY }, timeLimit);
}
function sizedArray2D(size1, size2) {
    let newArray = [];
    for (let i = 0; i < size1; i++) {
        newArray.push(Array(size2));
    }
    return newArray;
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function createImage(src) {
    let newImage = new Image();
    newImage.src = src;
    return newImage;
}
//# sourceMappingURL=helper_functions.js.map