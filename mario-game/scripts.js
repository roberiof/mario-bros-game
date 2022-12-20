// SCORE 
const score_game_over = document.querySelector('.score-game-over')
const score_up = document.querySelector('.score-up')

var cont = 0 
var scoreAllowed = false

const counter = setInterval( () => {
    if(scoreAllowed){
        cont ++
        score_up.innerHTML = cont
    }
} , 200)

const showScore = (cont) =>{
    cont = '' + cont 
    if(cont.length < 30){
        score_game_over.innerHTML = cont 
    } else{
        score_game_over.innerHTML = "IMPRESSIVE, YOU BROKE THE GAME!!!"
    }
}

// CORE OF THE GAME 
const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')
const game_over =  document.querySelector('.game-over')

const jump = () =>{
    mario.classList.add('jump')
    setTimeout( () =>{
        mario.classList.remove('jump')
    }, 800)
}

// the guy below checks with every 10 milliseconds if you lost the game 
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px' , '')
    // the mario's position is gotten differently because there's no "offsetBottom" propriety 

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
        gameOver(pipePosition, marioPosition)
    }
} , 10)

document.addEventListener('keydown' , (e) =>{
    if(e.key === ' '){
        jump()
    }
})

// START OF THE GAME 
const start_btn = document.querySelector('.start-btn')

const start = () => {
    scoreAllowed = true 
    pipe.style.animation = 'pipe_animation 1.5s infinite linear'
    clouds.style.animation = 'clouds-animation 8s infinite linear'
}

start_btn.addEventListener('click' , start)
document.addEventListener('keydown' , (e) =>{
    if(e.key == 'Tab'){
        start()
    }
})

// GAME OVER 
const best_score = document.querySelector('.best-score')
const gameOver = (pipePosition , marioPosition) =>{
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`

    mario.src = 'externos/game-over.png'
    mario.style.zIndex = 1
    mario.style.width = '80px'
    mario.style.left = '60px'
    mario.style.animation = 'none'
    mario.style.bottom = `${marioPosition}px`

    game_over.style.display = 'flex'

    scoreAllowed = false
    addScore(cont)
    showBestScore()
    showScore(cont)
    clearInterval(loop)
}

// RESTART THE GAME 
const try_again_btn = document.querySelector('.try-again-btn')
try_again_btn.addEventListener('click' , () =>{
    location.reload()
})
document.addEventListener('keydown' , (e)=>{
    if(e.key == 'Enter'){
        location.reload()
    }
})

// LOCALSTORAGE --- BEST SCORE CODING
const addScore = (score) =>{
    const arrayScores = JSON.parse(localStorage.getItem('scores')) ?? []
    arrayScores.push(score)
    localStorage.setItem('scores' , JSON.stringify(arrayScores))
}

const showBestScore = () =>{
    const arrayScores = JSON.parse(localStorage.getItem('scores')) 
    var max = arrayScores.reduce(function(a,b) {
        return Math.max(a,b);
    } , -Infinity)
    best_score.innerHTML = max 
}