
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createFirework(x, y) {

    const colors = [
        "red", "yellow", "orange",
        "cyan", "pink", "lime", "white"
    ];

    for (let i = 0; i < 100; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: colors[
                Math.floor(Math.random() * colors.length)
            ]
        });
    }
}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {

        p.x += p.vx;
        p.y += p.vy;

        p.vy += 0.03;
        p.alpha -= 0.012;

        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();

        if (p.alpha <= 0) {
            particles.splice(index, 1);
        }

    });

    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);
}

function celebrate() {

    for (let i = 0; i < 6; i++) {

        setTimeout(() => {

            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.7;

            createFirework(x, y);

        }, i * 300);
    }
}

// Click anywhere for fireworks
canvas.addEventListener("click", (event) => {
    createFirework(event.clientX, event.clientY);
});

// Automatic fireworks
setInterval(() => {

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.6;

    createFirework(x, y);

}, 1200);

animate();

// Adjust canvas when window size changes
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
