const inputs = document.querySelectorAll('.money-input input');

const inputValues = {};

function createObject() {
    inputs.forEach(input => {
        const id = input.id;
        const value = parseInt(input.value) || 0;

        inputValues[id] = value;
    });
}

const calculateBtn = document.getElementById('btnCalculate');
const resetBtn = document.getElementById('btnReset');
const finalCash = document.getElementById('finalCash');
calculateBtn.addEventListener('click', () => {
    createObject();
    let totalAmount = 0;
    for (const id in inputValues) {
        totalAmount += inputValues[id] * parseInt(id.substring(2));
    }
    finalCash.innerText = totalAmount.toString();
});

resetBtn.addEventListener('click', () => {
    finalCash.innerText = '0';
    inputs.forEach(input => {
        input.value = '';
    })
});