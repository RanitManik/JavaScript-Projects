const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function encryptData() {
    const inputText = document.getElementById('inputText').value.toLowerCase();
    const shiftAmount = parseInt(document.getElementById('inputShift').value);
    let outputText = '';

    for (let i = 0; i < inputText.length; i++) {
        if (alphabetArray.includes(inputText[i])) {
            const currentIndex = alphabetArray.indexOf(inputText[i]);
            const newIndex = (currentIndex + shiftAmount) % alphabetArray.length;
            outputText += alphabetArray[newIndex];
        } else {
            outputText += inputText[i];
        }
    }
    document.getElementById('outputText').innerHTML = outputText;
}

function decryptData() {
    const inputText = document.getElementById('inputText').value.toLowerCase();
    const shiftAmount = parseInt(document.getElementById('inputShift').value);
    let outputText = '';

    for (let i = 0; i < inputText.length; i++) {
        if (alphabetArray.includes(inputText[i])) {
            const currentIndex = alphabetArray.indexOf(inputText[i]);
            let newIndex = (currentIndex - shiftAmount) % alphabetArray.length;
            if (newIndex < 0) {
                newIndex += alphabetArray.length;
            }
            outputText += alphabetArray[newIndex];
        } else {
            outputText += inputText[i];
        }
    }
    document.getElementById('outputText').innerHTML = outputText;
}

