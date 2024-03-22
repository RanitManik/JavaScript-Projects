// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all the div elements
    const divElements = document.querySelectorAll('div');

    // Loop through each div element and add click event listener
    divElements.forEach(div => {
        div.addEventListener('click', () => {
            // Get the input element within the clicked div
            const inputElement = div.querySelector('input[type="radio"]');
            // Toggle the checked attribute of the input element
            inputElement.checked = true;
        });
    });

    // Adjust the width of empty divs based on percentage
    divElements.forEach(div => {
        let percent = div.querySelector('span').innerText;
        let emptyDiv = div.querySelector('div');
        emptyDiv.style.width = percent;
    });
});
