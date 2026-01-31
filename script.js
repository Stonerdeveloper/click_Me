const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const mainContainer = document.getElementById('mainContainer');
const questionSection = document.getElementById('questionSection');
const celebrationSection = document.getElementById('celebrationSection');
const heartsContainer = document.getElementById('hearts-container');

// Move No Button
const moveButton = () => {
    const margin = 50;
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    const rect = noBtn.getBoundingClientRect();
    const btnWidth = rect.width || 100;
    const btnHeight = rect.height || 40;

    const maxX = vw - btnWidth - margin;
    const maxY = vh - btnHeight - margin;

    if (maxX < margin || maxY < margin) return;

    let x = Math.random() * (maxX - margin) + margin;
    let y = Math.random() * (maxY - margin) + margin;

    // Aggressive clamping
    x = Math.max(margin, Math.min(x, maxX));
    y = Math.max(margin, Math.min(y, maxY));

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
};

// Initial position
window.addEventListener('load', () => {
    moveButton();
});

// Proximity Avoidance
document.addEventListener('mousemove', (e) => {
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

    // If cursor is within 100px, move the button
    if (distance < 120) {
        moveButton();
    }
});

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

// Yes Button Action
yesBtn.addEventListener('click', () => {
    questionSection.style.display = 'none';
    celebrationSection.style.display = 'block';
    createConfetti();
});

// Create Floating Hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createHeart, 300);

// Simple Confetti Effect on Yes
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.position = 'fixed';
        heart.style.fontSize = Math.random() * 30 + 15 + 'px';
        heart.style.animation = `float ${Math.random() * 2 + 1}s ease-out forwards`;
        document.body.appendChild(heart);
    }
}
