// ==========================================
// הגדרות ונכסים
// ==========================================

const kangarooSprite = new Image();
kangarooSprite.src = 'kangaroo.png'; 

const jumpSound = new Audio('jump.mp3'); 

// רשימת השאלות המתורגמת
const questions = [
    { text: "מהם 50% מ-12?", answer: "blue" }, // כחול יהיה 6
    { text: "האם 2 + 2 שווה ל-5?", answer: "red" }, // אדום יהיה "לא"
    { text: "האם HTML היא שפת תכנות?", answer: "red" },
    { text: "האם הקנגורו הוא חיית כיס?", answer: "blue" },
    { text: "האם מים קופאים ב-100 מעלות?", answer: "red" },
    { text: "האם השמיים בדרך כלל כחולים?", answer: "blue" },
    { text: "האם חתולים נובחים?", answer: "red" },
    { text: "האם JS זה קיצור של JavaScript?", answer: "blue" },
    { text: "האם כדור הארץ שטוח?", answer: "red" },
    { text: "סיימנו את כל השאלות?", answer: "blue" }
];

// ==========================================
// מנוע המשחק
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

// ------------------------------------------
// מחלקות (Classes)
// ------------------------------------------

class Kangaroo {
    constructor() {
        this.x = 50;
        this.y = 480;
        this.width = 60;
        this.height = 60;
        this.dy = 0;
        this.dx = 0;
        this.grounded = false;
        this.facingRight = true;
    }

    update() {
        if (keys.right) { this.dx = SPEED; this.facingRight = true; }
        else if (keys.left) { this.dx = -SPEED; this.facingRight = false; }
        else { this.dx = 0; }

        this.x += this.dx;

        if (keys.up && this.grounded) {
            this.dy = JUMP_STRENGTH;
            this.grounded = false;
            jumpSound.currentTime = 0;
            jumpSound.play().catch(() => {});
        }

        this.dy += GRAVITY;
        this.y += this.dy;

        if (this.y > 580) {
            triggerGameOver("צנחת לאגם! נסה שנית, רק הפעם תביא שנורקל!");
        }
    }

    draw() {
        if (kangarooSprite.complete && kangarooSprite.naturalHeight !== 0) {
            ctx.save();
            if (!this.facingRight) {
                ctx.translate(this.x - cameraOffsetX + this.width, this.y);
                ctx.scale(-1, 1);
                ctx.drawImage(kangarooSprite, 0, 0, this.width, this.height);
            } else {
                ctx.drawImage(kangarooSprite, this.x - cameraOffsetX, this.y, this.width, this.height);
            }
            ctx.restore();
        } else {
            ctx.fillStyle = "#8B4513";
            ctx.fillRect(this.x - cameraOffsetX, this.y, this.width, this.height);
        }
    }
}

class Platform {
    constructor(x, y, width, type, questionIndex) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 25;
        this.type = type; 
        this.questionIndex = questionIndex;
        this.visible = true;
    }

    draw() {
        if (!this.visible) return;

        let color = '#2ecc71'; 
        if (this.type === 'red') color = '#e74c3c';
        if (this.type === 'blue') color = '#3498db';
        if (this.type === 'start') color = '#27ae60'; 
        if (this.type === 'end') color = '#ffd700'; 

        ctx.fillStyle = color;
        ctx.fillRect(this.x - cameraOffsetX, this.y, this.width, this.height);
        
        // כיתוב על הפלטפורמות
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        if(this.type === 'red') ctx.fillText("אדום", this.x - cameraOffsetX + (this.width/2), this.y + 18);
        if(this.type === 'blue') ctx.fillText("כחול", this.x - cameraOffsetX + (this.width/2), this.y + 18);
    }
}

// ------------------------------------------
// יצירת השלב
// ------------------------------------------

const platforms = [];

function initLevel() {
    let currentX = 0;
    
    // התחלה: דשא
    platforms.push(new Platform(currentX, 530, 300, 'start', -1));
    currentX += 450; 

    for (let i = 0; i < questions.length; i++) {
        // אי ירוק בטוח
        platforms.push(new Platform(currentX, 400, 120, 'green', i));
        
        currentX += 250; 

        // בחירה אנכית (אחת למעלה, אחת למטה)
        let topColor = (i % 2 === 0) ? 'blue' : 'red';
        let bottomColor = (i % 2 === 0) ? 'red' : 'blue';

        platforms.push(new Platform(currentX, 220, 120, topColor, i));    // גבוהה
        platforms.push(new Platform(currentX, 480, 120, bottomColor, i)); // נמוכה
        
        currentX += 350; 
    }

    // סיום: חוף אוסטרליה
    platforms.push(new Platform(currentX, 530, 600, 'end', 99));
}

// ------------------------------------------
// לוגיקה
// ------------------------------------------

const player = new Kangaroo();
initLevel();
updateUI();

function checkCollisions() {
    player.grounded = false;
    platforms.forEach(p => {
        if (!p.visible) return;
        if (player.x < p.x + p.width &&
            player.x + player.width > p.x &&
            player.y + player.height > p.y &&
            player.y + player.height < p.y + p.height + 25 && 
            player.dy >= 0) { 
            
            player.grounded = true;
            player.dy = 0;
            player.y = p.y - player.height;
            handleLanding(p);
        }
    });
}

function handleLanding(platform) {
    if (platform.type === 'start') return;
    if (platform.type === 'end') { triggerWin(); return; }
    if (platform.type === 'green') {
        currentQuestionIndex = platform.questionIndex;
        updateUI();
        return;
    }

    const currentQ = questions[platform.questionIndex];
    if (platform.type === currentQ.answer) {
        // צדקת! נשארים על הפלטפורמה
    } else {
        // טעות! שתי הפלטפורמות נעלמות כדי למנוע "רמאות"
        platforms.forEach(p => {
            if (p.questionIndex === platform.questionIndex && (p.type === 'red' || p.type === 'blue')) {
                p.visible = false; 
            }
        });
    }
}

function updateUI() {
    const qText = document.getElementById('question-text');
    const levelText = document.getElementById('current-level');
    if(currentQuestionIndex < questions.length) {
        qText.innerText = questions[currentQuestionIndex].text;
        levelText.innerText = currentQuestionIndex + 1;
    }
}

function triggerGameOver(msg) {
    if (gameOver) return;
    gameOver = true;
    document.getElementById('overlay-title').innerText = "אופס! נפסלת";
    document.getElementById('overlay-message').innerText = msg;
    document.getElementById('game-overlay').classList.remove('hidden');
}

function triggerWin() {
    if (gameWon) return;
    gameWon = true;
    document.getElementById('overlay-title').innerText = "כל הכבוד!";
    document.getElementById('overlay-message').innerText = "עברת את האגם והגעת לחוף המבטחים באוסטרליה!";
    document.getElementById('game-overlay').classList.remove('hidden');
}

function animate() {
    if (gameOver || gameWon) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (player.x > 250) { cameraOffsetX = player.x - 250; }

    // מים
    ctx.fillStyle = "#0000CD"; 
    ctx.fillRect(0, 580, canvas.width, 20);

    player.update();
    player.draw();
    platforms.forEach(p => p.draw());
    checkCollisions();

    requestAnimationFrame(animate);
}

animate();