function generateRandomHexCode() {
    const randomValue = Math.floor(Math.random() * 0xffffff);
    return '#' + randomValue.toString(16).padStart(6, '0');
}

const colors = document.querySelectorAll('.color');

function updateColors() {
    colors.forEach(color => {
        const randomColor = generateRandomHexCode();
        const copyIndicator = color.closest('li').querySelector('.hex-code');

        color.style.backgroundColor = randomColor;
        const hexCodeElement = color.closest('li').querySelector('.hex-code');
        hexCodeElement.textContent = randomColor;

        color.addEventListener('click', () => {
            color.classList.add('clicked');
            navigator.clipboard.writeText(randomColor);
            copyIndicator.textContent = "copied";
        });

        color.addEventListener('mouseover', () => {
            copyIndicator.textContent = "copy";
        });

        color.addEventListener('mouseleave', () => {
            copyIndicator.textContent = randomColor;
        })

        color.addEventListener('mouseleave', () => {
            color.classList.remove('clicked');
        });
    });
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        updateColors();
    }
});

updateColors();