// Sparkle Generation
function createSparkles() {
    const sparklesContainer = document.getElementById('sparkles');
    const sparkleCount = 50;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        sparklesContainer.appendChild(sparkle);
    }
}

// Floating Hearts Generation
function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts');
    const hearts = ['💖', '💝', '💗', '💕', '💓', '💞', '❤️', '🌹', '✨'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 500);
}

// Button Interactions
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hint = document.getElementById('hint');
const invitation = document.getElementById('invitation');
const successScreen = document.getElementById('successScreen');

let noClickCount = 0;
const hints = [
    "Come on... you know you want to say yes! 😊",
    "The 'No' button is getting shy... 🙈",
    "Why are you running away from love? 💔",
    "You're making this harder than it needs to be! 😅",
    "Okay, I see you like a challenge... 😏",
    "Just click YES already! I miss you! 🥺",
    "Fine, keep trying... but you know how this ends! 😘",
    "You really think you can say no to me? 💕"
];

// Yes Button - Success!
yesBtn.addEventListener('click', () => {
    // Create explosion of hearts
    createHeartExplosion();

    // Show success screen after short delay
    setTimeout(() => {
        successScreen.classList.add('active');
        createSuccessHearts();
    }, 500);
});

// No Button - Make it playful and impossible
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    noClickCount++;

    // Show hint
    if (noClickCount <= hints.length) {
        hint.textContent = hints[noClickCount - 1];
    }

    // Make Yes button bigger and more appealing
    const currentScale = 1 + (noClickCount * 0.15);
    yesBtn.style.transform = `scale(${Math.min(currentScale, 2)})`;

    // Move No button to random position
    const card = document.querySelector('.card');
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = cardRect.width - btnRect.width - 40;
    const maxY = cardRect.height - btnRect.height - 40;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Shrink No button progressively
    const newSize = Math.max(0.5, 1 - (noClickCount * 0.1));
    noBtn.style.transform = `scale(${newSize})`;

    // After 8 clicks, make No button disappear
    if (noClickCount >= 8) {
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';
        hint.textContent = "The universe has spoken! There's only one answer now... 💖";

        // Make Yes button pulse
        yesBtn.style.animation = 'pulse 0.5s ease-in-out infinite';
    }
});

// No Button Hover - Run away!
noBtn.addEventListener('mouseenter', () => {
    if (noClickCount >= 3) {
        // Make it run away on hover
        const card = document.querySelector('.card');
        const cardRect = card.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        const maxX = cardRect.width - btnRect.width - 40;
        const maxY = cardRect.height - btnRect.height - 40;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.position = 'absolute';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.transition = 'all 0.3s ease';
    }
});

// Heart Explosion Effect
function createHeartExplosion() {
    const hearts = ['💖', '💝', '💗', '💕', '💓'];
    const yesRect = yesBtn.getBoundingClientRect();
    const centerX = yesRect.left + yesRect.width / 2;
    const centerY = yesRect.top + yesRect.height / 2;

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        document.body.appendChild(heart);

        const angle = (Math.PI * 2 * i) / 30;
        const velocity = Math.random() * 200 + 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        heart.animate([
            {
                transform: 'translate(0, 0) scale(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translate(${tx}px, ${ty}px) scale(1) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
        });

        setTimeout(() => heart.remove(), 1000);
    }
}

// Success Screen Hearts
function createSuccessHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = ['💖', '💝', '💗', '✨', '🎉'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        successScreen.appendChild(heart);

        setTimeout(() => heart.remove(), 7000);
    }, 300);
}

// Initialize
createSparkles();
createFloatingHearts();

// Add position relative to card for absolute positioning
document.querySelector('.card').style.position = 'relative';
