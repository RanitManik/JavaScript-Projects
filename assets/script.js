document.addEventListener("DOMContentLoaded", () => {
    fetch('./assets/projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectList = document.getElementById("project-list");

            projects.forEach(project => {
                const li = document.createElement("li");
                li.className = "box";

                const iconsDiv = document.createElement("div");
                iconsDiv.className = "icons";

                const leftIconsSpan = document.createElement("span");
                leftIconsSpan.className = "left-icons";
                leftIconsSpan.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                        class="folder-icon high-color">
                        <title>Folder</title>
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>`;

                const rightIconsSpan = document.createElement("span");
                rightIconsSpan.className = "right-icons";
                rightIconsSpan.innerHTML = `
                    <a href="${project.links.live}" aria-label="External Link" class="external" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="high-color-hover link-icon second-link-icon">
                            <title>External Link</title>
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </a>
                    <a href="${project.links.github}" aria-label="GitHub Link" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="high-color-hover link-icon">
                            <title>GitHub</title>
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>`;

                iconsDiv.appendChild(leftIconsSpan);
                iconsDiv.appendChild(rightIconsSpan);

                const textDiv = document.createElement("div");
                textDiv.className = "text";

                const mainTextDiv = document.createElement("div");
                mainTextDiv.className = "main-text";
                mainTextDiv.innerHTML = `
                    <h1>${project.title}</h1>
                    <p>${project.description}</p>`;

                const langTextDiv = document.createElement("div");
                langTextDiv.className = "lang-text";
                project.languages.forEach(lang => {
                    const h3 = document.createElement("h3");
                    h3.textContent = lang;
                    langTextDiv.appendChild(h3);
                });

                textDiv.appendChild(mainTextDiv);
                textDiv.appendChild(langTextDiv);

                li.appendChild(iconsDiv);
                li.appendChild(textDiv);

                projectList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching the projects.json:', error));
});
