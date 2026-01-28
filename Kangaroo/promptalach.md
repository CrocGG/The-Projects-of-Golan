index.html

<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>קנגורו - מאת גולן גלנט</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</head>
<body>

    <div class="game-container">
        <div id="sideboard">
            <h2>קנגורו - מאת גולן גלנט</h2>
            <div id="score-box">שאלה: <span id="current-level">1</span>/10</div>
            <div class="question-box">
                <p id="question-text">טוען שאלה...</p>
            </div>
            <div class="instructions">
                <p>קפצו על <span style="color:#ff4d4d">אדום</span> או <span style="color:#4d4dff">כחול</span>!</p>
                <p class="controls">מקשים: חצים לתזוזה, רווח לקפיצה</p>
            </div>
        </div>

        <canvas id="gameCanvas"></canvas>
        
        <div id="game-overlay" class="hidden">
            <h1 id="overlay-title">הפסדת!</h1>
            <p id="overlay-message">הקנגורו נפל לאגם.</p>
            <button onclick="location.reload()">שחק שוב</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>

questions.csv

Number,Questions,Blue,Red,Correct
1,מהו צבע השמש?,צהוב,סגול,Blue
2,חצי מ-30?,15,20,Blue
3,מה צפוני יותר?,צפת,אילת,Blue
4,5:3?,1.333,1.6666,Red
5,מה יותר כבד?,קילו נוצות,חצי קילו נפט,Blue
6,איפה נמצאת ירושלים?,במערב,במזרח,Red
7,90*3?,270,300,Blue
8,מי המציא את הנורה?,גלילאו,אדיסון,Red
9,"השלם: ""שלום ___""",חייזר,חבר,Red
10,מה יותר שמן?,חזיר,פיל,Red

script.js

const kangarooSprite = new Image();
kangarooSprite.src = 'kangaroo.png';

let questions = [];
let gameStarted = false;
let particles = [];

// ==========================================
// SOUND MANAGER
// ==========================================
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const sounds = {
    jump: () => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    },
    splash: () => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    },
    wrong: () => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
    },
    win: () => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'square';
            osc.frequency.value = freq;
            const startTime = audioCtx.currentTime + (i * 0.1);
            gain.gain.setValueAtTime(0.05, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.4);
        });
    }
};

// ==========================================
// PARTICLE SYSTEM
// ==========================================
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = (Math.random() - 0.5) * 8;
        this.dy = Math.random() * -10 - 5;
        this.radius = Math.random() * 4 + 2;
        this.life = 1.0;
        this.decay = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.x += this.dx;
        this.dy += 0.4;
        this.y += this.dy;
        this.life -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = "#4FC3F7";
        ctx.beginPath();
        ctx.arc(this.x - cameraOffsetX, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function createSplash(x, y) {
    for (let i = 0; i < 25; i++) {
        particles.push(new Particle(x, y));
    }
}

// ==========================================
// GAME ENGINE
// ==========================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let currentQuestionIndex = 0;
let gameOver = false;
let gameWon = false;
let cameraOffsetX = 0;

const GRAVITY = 0.6;
const JUMP_STRENGTH = -14;
const SPEED = 5;

const keys = { right: false, left: false, up: false };

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') keys.right = true;
    if (e.code === 'ArrowLeft') keys.left = true;
    if (e.code === 'Space' || e.code === 'ArrowUp') keys.up = true;
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight') keys.right = false;
    if (e.code === 'ArrowLeft') keys.left = false;
    if (e.code === 'Space' || e.code === 'ArrowUp') keys.up = false;
});

async function loadQuestions() {
    try {
        const response = await fetch('questions.csv');
        const data = await response.text();
        parseCSV(data);
    } catch (error) {
        console.error("Error loading CSV:", error);
        questions = [{text: "שאלה לבדיקה", blueAnswer: "כחול", redAnswer: "אדום", correctType: "Blue"}];
        initLevel();
        updateUI();
        animate();
    }
}

function parseCSV(csvText) {
    questions = [];
    const lines = csvText.trim().split('\n');
    const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(regex);
        const cleanText = (text) => text ? text.replace(/^"|"$/g, '').replace(/""/g, '"') : "";
        if(row.length > 3) {
            questions.push({
                text: cleanText(row[1]),
                blueAnswer: cleanText(row[2]),
                redAnswer: cleanText(row[3]),
                correctType: cleanText(row[4]).trim()
            });
        }
    }
    initLevel();
    updateUI();
    animate();
}

class Kangaroo {
    constructor() {
        this.x = 50;
        this.y = 470;
        this.width = 60;
        this.height = 60;
        this.dy = 0;
        this.dx = 0;
        this.grounded = false;
        this.facingRight = true;
        this.isSinking = false;
        this.canMove = true; 
    }

    update() {
        if (this.isSinking) return;

        if (this.canMove) {
            if (keys.right) { this.dx = SPEED; this.facingRight = true; }
            else if (keys.left) { this.dx = -SPEED; this.facingRight = false; }
            else { this.dx = 0; }
        } else {
            this.dx = 0; 
        }

        this.x += this.dx;

        if (this.canMove && keys.up && this.grounded) {
            this.dy = JUMP_STRENGTH;
            this.grounded = false;
            sounds.jump();
        }

        this.dy += GRAVITY;
        this.y += this.dy;

        if (this.y > 580 && !this.isSinking) {
            this.isSinking = true;
            sounds.splash();
            createSplash(this.x + this.width / 2, 590);
            setTimeout(() => {
                triggerGameOver("צנחת לאגם! נסה שנית, רק הפעם תביא שנורקל!")
            }, 1000);
        }
    }

    draw() {
        if (this.isSinking) return;
        ctx.save();
        if (kangarooSprite.complete && kangarooSprite.naturalHeight !== 0) {
            if (!this.facingRight) {
                ctx.translate(this.x - cameraOffsetX + this.width, this.y);
                ctx.scale(-1, 1);
                ctx.drawImage(kangarooSprite, 0, 0, this.width, this.height);
            } else {
                ctx.drawImage(kangarooSprite, this.x - cameraOffsetX, this.y, this.width, this.height);
            }
        } else {
            ctx.fillStyle = "#8B4513";
            ctx.fillRect(this.x - cameraOffsetX, this.y, this.width, this.height);
        }
        ctx.restore();
    }
}

class Platform {
    constructor(x, y, width, type, questionIndex, textLabel = "") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 30;
        this.type = type;
        this.questionIndex = questionIndex;
        this.visible = true;
        this.textLabel = textLabel;
    }

    draw() {
        if (!this.visible) return;
        let color = '#2ecc71';
        if (this.type === 'Red') color = '#e74c3c';
        if (this.type === 'Blue') color = '#3498db';
        if (this.type === 'start') color = '#27ae60';
        if (this.type === 'end') color = '#ffd700';

        ctx.fillStyle = color;
        ctx.fillRect(this.x - cameraOffsetX, this.y, this.width, this.height);
        
        if (this.type === 'end') {
            ctx.fillStyle = "#DAA520";
            ctx.fillRect(this.x - cameraOffsetX, this.y + this.height, this.width, canvas.height - this.y);
        }

        if (this.textLabel) {
            ctx.fillStyle = "white";
            ctx.font = "bold 16px Arial";
            ctx.textAlign = "center";
            ctx.fillText(this.textLabel, this.x - cameraOffsetX + (this.width/2), this.y + 20);
        }
    }
}

let platforms = [];
const player = new Kangaroo();

function initLevel() {
    platforms = [];
    let currentX = 0;
    
    platforms.push(new Platform(currentX, 530, 300, 'start', -1));
    currentX += 400;

    for (let i = 0; i < questions.length; i++) {
        platforms.push(new Platform(currentX, 400, 120, 'green', i));
        currentX += 180;
        const q = questions[i];
        platforms.push(new Platform(currentX, 280, 150, 'Blue', i, q.blueAnswer));
        platforms.push(new Platform(currentX, 480, 150, 'Red', i, q.redAnswer));
        currentX += 280;
    }
    
    platforms.push(new Platform(currentX, 500, 800, 'end', 99));
}

function checkCollisions() {
    if (player.isSinking) return;
    
    player.grounded = false;
    
    platforms.forEach(p => {
        if (!p.visible) return;
        
        if (player.x < p.x + p.width &&
            player.x + player.width > p.x &&
            player.y + player.height >= p.y &&
            player.y + player.height <= p.y + p.height + 15 &&
            player.dy >= 0) {
            
            if (isTrap(p)) {
                // FAILURE LOGIC
                // 1. Vanish ALL choice platforms for this question (prevents landing on the other one)
                platforms.forEach(otherP => {
                    if (otherP.questionIndex === p.questionIndex) {
                        otherP.visible = false;
                    }
                });
                
                // 2. Lock controls and play sound
                player.canMove = false;
                sounds.wrong();
                
                // Do NOT set grounded, let gravity take over
            } else {
                // SAFE LANDING
                player.grounded = true;
                player.dy = 0;
                player.y = p.y - player.height;
                handleSafeLanding(p);
            }
        }
    });
}

function isTrap(platform) {
    if (platform.type === 'start' || platform.type === 'end' || platform.type === 'green') return false;
    const currentQ = questions[platform.questionIndex];
    return platform.type !== currentQ.correctType;
}

function handleSafeLanding(platform) {
    if (platform.type === 'end') { 
        triggerWin(); 
        return; 
    }
    
    if (platform.type === 'green') {
        gameStarted = true;
        currentQuestionIndex = platform.questionIndex;
        updateUI();
        return;
    }

    // Success: Vanish the other choice
    platforms.forEach(p => {
        if (p.questionIndex === platform.questionIndex && p !== platform && (p.type === 'Red' || p.type === 'Blue')) {
            p.visible = false;
        }
    });
}

function updateUI() {
    const qText = document.getElementById('question-text');
    const levelText = document.getElementById('current-level');
    
    if (!gameStarted) {
        qText.innerText = "התחל ללכת וקפוץ לפלטפורמה הירוקה הראשונה כדי להתחיל בחידון!";
        levelText.innerText = "0";
        return;
    }
    
    if(currentQuestionIndex < questions.length) {
        qText.innerText = questions[currentQuestionIndex].text;
        levelText.innerText = currentQuestionIndex + 1;
    }
}

function triggerGameOver(msg) {
    if (gameOver) return;
    gameOver = true;
    document.getElementById('overlay-title').innerText = "אופס!";
    document.getElementById('overlay-message').innerText = msg;
    document.getElementById('game-overlay').classList.remove('hidden');
}

function triggerWin() {
    if (gameWon) return;
    gameWon = true;
    sounds.win();
    document.getElementById('overlay-title').innerText = "הגעת לאוסטרליה!";
    document.getElementById('overlay-message').innerText = "כל הכבוד, עברת את כל השאלות בשלום!";
    document.getElementById('game-overlay').classList.remove('hidden');
}

function animate() {
    if (gameOver && !player.isSinking) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (player.x > 250) { cameraOffsetX = player.x - 250; }

    ctx.fillStyle = "#0000CD";
    ctx.fillRect(0, 580, canvas.width, 20);

    platforms.forEach(p => p.draw());

    player.update();
    player.draw();

    particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(index, 1);
    });

    checkCollisions();
    
    if (!gameOver || player.isSinking) {
        requestAnimationFrame(animate);
    }
}

loadQuestions();

style.css

body {
    margin: 0;
    background-color: #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* פונט קריא לעברית */
}

/* במידה ואתה רוצה להישאר עם סגנון הרטרו, השאר את Press Start 2P אבל שים לב שהוא לא תומך בעברית טוב */

.game-container {
    display: flex;
    flex-direction: row-reverse; /* הופך את סדר הלוח והקנבס לעברית */
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
    background-color: #000;
    border: 4px solid #fff;
}

#sideboard {
    width: 250px;
    background-color: #333;
    color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-left: 4px solid #fff;
    direction: rtl; /* יישור לימין */
}

#sideboard h2 {
    font-size: 22px;
    text-align: center;
    color: #ffd700;
}

.question-box {
    background-color: #444;
    padding: 15px;
    border: 2px solid #fff;
    min-height: 150px;
    font-size: 18px;
    line-height: 1.4;
}

canvas {
    background: linear-gradient(to bottom, #87CEEB, #E0F7FA);
    display: block;
}

#game-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 40px;
    text-align: center;
    border: 4px solid white;
    z-index: 10;
}

.hidden { display: none; }

button {
    background: #ffd700;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
}


I have this JS game of 2D platformer. I want you to covert the game to GUI of tkinter python as best and as identical as you can. I have pasted all the necessasry files. Do your best in it.