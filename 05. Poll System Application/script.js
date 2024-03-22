// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all the div elements within the fieldset
    const divElements = document.querySelectorAll('fieldset > div');

    // Loop through each div element and add click event listener
    divElements.forEach(div => {
        div.addEventListener('click', () => {
            // Get the input element within the clicked div
            const inputElement = div.querySelector('input[type="radio"]');
            // Toggle the checked attribute of the input element
            inputElement.checked = true;
        });
    });

    // Get the form element
    const pollForm = document.getElementById('pollForm');

    // Add submit event listener to the form
    pollForm.addEventListener('submit', (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Adjust the width of empty divs based on percentage
        divElements.forEach(div => {
            let percent = div.querySelector('span').innerText;
            let emptyDiv = div.querySelector('div');
            emptyDiv.style.width = percent;
        });

        // You can optionally display a confirmation message or perform other actions here
    });
});
