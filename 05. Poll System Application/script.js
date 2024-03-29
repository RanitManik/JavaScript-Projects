// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all the div elements within the fieldset
    const divElements = document.querySelectorAll('fieldset > div');
    // Get the form element
    const pollForm = document.getElementById('pollForm');

    // Loop through each div element and add click event listener
    divElements.forEach(div => {
        div.addEventListener('click', () => {
            // Remove the 'selected' class from all div elements
            divElements.forEach(d => {
                d.classList.remove('selected');
            });
            // Add the 'selected' class to the clicked div
            div.classList.add('selected');

            // Get the input element within the clicked div
            const inputElement = div.querySelector('input[type="radio"]');
            // Toggle the checked attribute of the input element
            inputElement.checked = true;
        });
    });

    // Calculate and update the width and percentage of votes
    pollForm.addEventListener('submit', (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Retrieve the current vote data from local storage
        let voteData = localStorage.getItem('voteData');
        voteData = voteData ? JSON.parse(voteData) : {
            "JavaScript": 0,
            "Java": 0,
            "Python": 0,
            "Cpp": 0
        };

        // Parse the language from the id
        const selectedId = document.querySelector('input[name="language"]:checked').id;
        voteData[selectedId]++;

        // Save the updated vote data to local storage
        localStorage.setItem('voteData', JSON.stringify(voteData));

        // Calculate total votes
        let totalVotes = 0;
        for (const language in voteData) {
            totalVotes += voteData[language];
        }

        // Update percentages and widths
        divElements.forEach(div => {
            const language = div.querySelector('input[type="radio"]').value;
            const votes = voteData[language];
            const percent = Math.ceil(votes / totalVotes * 100) + '%';
            const emptyDiv = div.querySelector('div');
            emptyDiv.style.width = percent;
            // Update the displayed percentage
            div.querySelector('span').textContent = percent;
        });
    });
});
