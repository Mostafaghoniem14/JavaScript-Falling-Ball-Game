const game = document.querySelector(".game-container")
const char = document.querySelector(".character")
let interval;
let keyDown = false;
let score = 0;
const scoreBoard = document.getElementById("score");

const moveLeft = () => {
    let leftPos = parseInt(window.getComputedStyle(char).getPropertyValue("left"));
    if (leftPos > 0)
        char.style.left = leftPos - 2 + "px";
}
const moveRight = () => {
    let leftPos = parseInt(window.getComputedStyle(char).getPropertyValue("left"));
    if (leftPos < 370)
        char.style.left = leftPos + 2 + "px";
}

document.addEventListener("keydown", (event) => {
    if (!keyDown) {
        if (event.key == "ArrowLeft") {
            interval = setInterval(moveLeft, 1)
        }
        else if (event.key == "ArrowRight") {
            interval = setInterval(moveRight, 1)
        }
    }

    keyDown = true;
})

document.addEventListener("keyup", () => {
    clearInterval(interval);
    keyDown = false;
})

const generateObstacle = () => {
    let block = document.createElement("div")
    let hole = document.createElement("div")
    block.setAttribute("class", "block")
    hole.setAttribute("class", "hole")
    let randHolePos = Math.floor(Math.random() * 320)
    hole.style.left = randHolePos + "px";
    game.appendChild(block)
    game.appendChild(hole)
    $('.block').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function (e) { $(this).remove(); });
    $('.hole').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function (e) { $(this).remove(); });
}
setInterval(generateObstacle, 2000)

const checkAccident = () => {
    const allBlocks = document.querySelectorAll(".block")
    const allHoles = document.querySelectorAll(".hole")
    allBlocks.forEach(b => {
        let hitObstacle = false

        if (blockAccident(b, char)) {
            hitObstacle = true

            allHoles.forEach(h => {
                if (holeAccident(h, char)) {
                    hitObstacle = false
                }
            })
        }

        if (hitObstacle) {
            alert(`GAME OVER , Your score is : ${score}`);
            location.reload()
        }
        else{
            const bTop = parseInt(window.getComputedStyle(b).getPropertyValue("top"));
            if (bTop > 400) { 
            score+= 1;
            scoreBoard.textContent = "Score: " + score;
            }
        }
    })
}
setInterval(checkAccident, 1)

function blockAccident(a, b) {
    let a_top = parseInt(window.getComputedStyle(a).getPropertyValue("top"));

    let b_top = parseInt(window.getComputedStyle(b).getPropertyValue("top"));

    return (
        a_top + 20 > b_top && a_top < b_top + 20
    );
}
function holeAccident(h, b) {
    let h_left = parseInt(window.getComputedStyle(h).getPropertyValue("left"));
    let h_top = parseInt(window.getComputedStyle(h).getPropertyValue("top"));

    let b_left = parseInt(window.getComputedStyle(b).getPropertyValue("left"));
    let b_top = parseInt(window.getComputedStyle(b).getPropertyValue("top"));

    return (
        b_left > h_left && b_left < h_left + 50 &&
        h_top + 20 > b_top && h_top < b_top + 20
    );
}
