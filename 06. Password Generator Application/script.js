const copyButton = document.getElementById("copyBtn");
copyButton.addEventListener("click", () => {
    copyButton.innerHTML = '<img id="copyIcon" src="assets/checked-icon.svg" alt="copied">';

    // Revert icon after 2 seconds
    setTimeout(() => {
        copyButton.innerHTML = '<img id="copyIcon" src="assets/copy-icon.svg" alt="copy">';
    }, 2000);
});

const sliderValue = document.getElementById("sliderValue");
const getSliderValue = document.getElementById("inputSlider");

getSliderValue.addEventListener("input", () => {
    const value = getSliderValue.value;
    sliderValue.innerText = value;
    const classAdd = calculateStrength(value);
    const passIndicator = document.querySelector(".pass-indicator");
    passIndicator.classList.remove("strong", "medium", "weak");
    passIndicator.classList.add(calculateStrength(value));
    generatePassword();
});

function calculateStrength(value) {
    if (value < 10) {
        return "weak";
    } else if (value >= 10 && value < 20) {
        return "medium";
    } else return "strong";
}

lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+']

const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");

const checkedArray = [lowercase, uppercase, numbers];

lowercaseEl.addEventListener("change", updateCheckedArray);
uppercaseEl.addEventListener("change", updateCheckedArray);
numbersEl.addEventListener("change", updateCheckedArray);
symbolsEl.addEventListener("change", updateCheckedArray);

function updateCheckedArray() {
    // Clear checkedArray
    checkedArray.length = 0;

    // Populate checkedArray based on checkbox status
    if (lowercaseEl.checked) {
        checkedArray.push(lowercase);
    }
    if (uppercaseEl.checked) {
        checkedArray.push(uppercase);
    }
    if (numbersEl.checked) {
        checkedArray.push(numbers);
    }
    if (symbolsEl.checked) {
        checkedArray.push(symbols);
    }

    // Generate password with updated checkedArray
    generatePassword();
}

let password = "";

function generatePassword() {
    const value = getSliderValue.value;
    password = "";
    for (let i = 0; i < value; i++) {
        let selectedEl = checkedArray[Math.floor(Math.random() * checkedArray.length)];

        let passwordEl = selectedEl[Math.floor(Math.random() * selectedEl.length)];
        password += passwordEl;
    }
    document.getElementById("passBox").value = password;
}

const genBtn = document.getElementById("genBtn");
genBtn.addEventListener("click", () => {
    generatePassword();
})

const copyBtn = document.getElementById("copyBtn");
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(password);
})