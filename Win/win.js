// .הג'אווה סקריפט של הזיקוקים מהרשת 
// .האנימציה על המילה "ניצחת" והטיפול בה ובחישובים על המסך - שלנו
const successSound = new Audio("../pm/applause.mp3");
document.addEventListener('click', function () {
    successSound.play();
});


const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// עדכון גודל הקנבס אם גודל החלון משתנה
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 };
        this.alpha = 1;
        this.friction = 0.99;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = { x: 0, y: Math.random() * -2.5 - 0.5 }; // ינוע כלפי מעלה
        this.particles = [];
        this.lifespan = 180; // משך חיים לפני פיצוץ (בפריימים)
        this.hasExploded = false;
    }

    draw() {
        // מצייר את הזיקוק העולה
        if (!this.hasExploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    explode() {
        for (let i = 0; i < 50; i++) {
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
    }

    update() {
        this.lifespan--;

        if (this.lifespan <= 0 && !this.hasExploded) {
            this.explode();
            this.velocity = { x: 0, y: 0 }; // עוצר את הזיקוק מלעלות לאחר פיצוץ
            this.hasExploded = true;
        } else if (this.lifespan > 0) {
            this.y += this.velocity.y; // ממשיך לעלות
        }

        // עדכון וציור חלקיקים לאחר פיצוץ
        for (let i = this.particles.length - 1; i >= 0; i--) { // לולאה הפוכה לבטחה הסרה
            this.particles[i].update();
            this.particles[i].draw();
            if (this.particles[i].alpha <= 0) {
                this.particles.splice(i, 1); // הסר חלקיקים שנעלמו
            }
        }
    }
}

let fireworks = [];

function animate() {
    requestAnimationFrame(animate);
    // מנקה את הקנבס עם אפקט גרירה עדין
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // עדכון וציור זיקוקים
    for (let i = fireworks.length - 1; i >= 0; i--) { // לולאה הפוכה לבטחה הסרה
        fireworks[i].update();
        fireworks[i].draw();

        // הסר זיקוקים שסיימו להתפוצץ וכל החלקיקים שלהם נעלמו
        if (fireworks[i].hasExploded && fireworks[i].particles.length === 0) {
            fireworks.splice(i, 1);
        }
    }

    // הוסף זיקוק חדש באופן אקראי
    if (Math.random() < 0.015) { // הסתברות נמוכה להוסיף זיקוק חדש בכל פריים
        const x = Math.random() * canvas.width;
        // החזרת הצבע לצבע המקורי
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        fireworks.push(new Firework(x, canvas.height, color));
    }
}

animate();