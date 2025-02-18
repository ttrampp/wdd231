//header nav links and footer date modified for all html pages

const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

document.addEventListener('DOMContentLoaded', () => {
    const lastModifiedText = document.lastModified;
    const lastModifiedElement = document.getElementById("date-modified");
    lastModifiedElement.textContent = lastModifiedText;
});


document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });
});

//Study page specifically
document.addEventListener("DOMContentLoaded", async function () {
    const studyModal = document.getElementById("study-modal");

    studyModal.style.display = "none";

    const studyModalBelt = document.getElementById("study-modal-belt");
    const studyModalForm = document.getElementById("study-modal-form");
    const studyModalName = document.getElementById("study-modal-name");
    const studyModalMeaning = document.getElementById("study-modal-meaning");
    const studyModalSteps = document.getElementById("study-modal-steps");
    const studyModalClose = document.getElementById("study-modal-close");

    if (!studyModalBelt || !studyModalForm || !studyModalName || !studyModalMeaning || !studyModalSteps) {
        console.error("One or more modal content elements are missing in the DOM.");
    }

    // Hide modal on page load
    studyModal.style.display = "none";

    // Close modal when close button is clicked
    studyModalClose.addEventListener("click", () => {
        studyModal.style.display = "none";
    });

    // Close modal when clicking outside the content
    studyModal.addEventListener("click", (event) => {
        if (event.target === studyModal) {
            studyModal.style.display = "none";
        }
    });

    //fetch data from json file
    let studyData = [];
    try {
        const response = await fetch("study.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        studyData = await response.json();
    }
    catch (error) {
        console.error("Error loading study data:", error);
    }

    //add event listeners for belt images and form number boxes
    document.querySelectorAll(".belt-boxes img, .form-number-boxes p").forEach(item => {
        item.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            if (studyData.belts[index]) {
                showModal(studyData.belts[index]);
            }
        });
    });

    //function to show modal with data
    function showModal(beltInfo) {

        if (!studyModalBelt || !studyModalForm || !studyModalName || !studyModalMeaning || !studyModalSteps) {
            console.error("One or more modal elements are missing in the DOM.");
            return;
        }

        /*studyModalTitle.textContent = beltInfo.name;*/
        studyModalBelt.textContent = beltInfo.color;
        studyModalForm.textContent = beltInfo.form;
        studyModalName.textContent = beltInfo.name;
        studyModalMeaning.textContent = beltInfo.meaning;
        studyModalSteps.textContent = beltInfo.Steps;

        studyModal.style.display = "flex";
    }

    //close when button clicked
    if (studyModalClose) {
        studyModalClose.addEventListener("click", () => {
            studyModal.style.display = "none";
        });
    }
    else {
        console.warn("studyModalClose button not found in the DOM");
    }


    //close when clicked on other part of page
    studyModal.addEventListener("click", (event) => {
        if (event.target === studyModal) {
            studyModal.style.display = "none";
        }
    });


    //makes email in footer to be a clickable link
    const emailElement = document.querySelector(".footer-email");
    if (emailElement) {
        const email = emailElement.textContent.trim();
        emailElement.innerHTML = `<a href="mailto:${email}">${email}</a>`;
    }
});