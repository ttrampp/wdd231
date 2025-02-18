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

//Form page specifically

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("form.html")) {
        setTimestampBeforeSubmission();
        populateClassDropdown();
    }
    else if (window.location.pathname.includes("confirmation.html")) {
        displayConfirmation();
    }
});

const classLevels = [
    {
        id: "NPM",
        name: "Questions about: Little Ninjas Class",
        cost: "Free"
    },
    {
        id: "BM",
        name: "Questions about: Low Ranking Class",
        cost: "$50"
    },
    {
        id: "SM",
        name: "Questions about: High Ranking Class",
        cost: "$100"
    },
    {
        id: "GM",
        name: "Questions about: Grappling",
        cost: "$200"
    },
    {
        id: "Other",
        name: "Other",
        cost: "free"
    }
];


function populateClassDropdown() {
    const selectElement = document.querySelector('#class-level');

    if (!selectElement) {
        console.error("Class dropdown not found.");
        return;
    }

    console.log("Found #class-level dropdown.");

    selectElement.innerHTML = '<option value="" disabled selected>Choose your class level</option>';

    classLevels.forEach(level => {
        const option = document.createElement("option");
        option.value = level.id;
        option.textContent = `${level.name} - ${level.cost}`;
        selectElement.appendChild(option);
    });

}

function setTimestampBeforeSubmission() {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        const currentDate = new Date().toLocaleString();
        timestampField.value = currentDate;
        console.log(`Timestamp set: ${currentDate}`);
    }
    else {
        console.warn("Timestamp not found");
    }
}


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) ? decodeURIComponent(urlParams.get(param)) : "";    //makes sure to retrieve user input
}


function displayConfirmation() {


    const confirmationContainer = document.querySelector(".confirmationContainer");
    if (!confirmationContainer) {
        console.error("Confirmation container not found.");
        return;
    }

    // Retrieve all form fields from the URL
    const firstName = getQueryParam("firstName");
    const lastName = getQueryParam("lastName");

    const email = getQueryParam("email");
    const phone = getQueryParam("phoneNumber");

    const userMessage = getQueryParam("what-to-discuss");

    const classID = getQueryParam("class-level");
    const timestamp = getQueryParam("timestamp");

    // Find class level details
    const levelDetails = classLevels.find(level => level.id === classID);

    // Build the confirmation message
    let confirmationHTML = `
        <h2>Thank you for reaching out to us!<br> 📞 We will get back to you soon. 📧<br><br>This is the info you gave us:</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>

        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Your message:</strong> ${userMessage ? userMessage : "No additional comments provided."}</p>
 
        <p><strong>Class Level:</strong> ${levelDetails ? levelDetails.name : "Unknown"}</p>
        <p><strong>Cost:</strong> ${levelDetails ? levelDetails.cost : "N/A"}</p>
        <p><strong>Signup Date:</strong> ${timestamp}</p>
    `;

    // Insert into the confirmation container
    confirmationContainer.innerHTML = confirmationHTML;
    console.log("Confirmation page updated with form data.");
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("confirmation.html")) {
        displayConfirmation();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    if (!window.location.pathname.includes("form.html")) return;                //exit early if not on form

    const formModalButtons = document.querySelectorAll(".form-modal-button");


    /*test*/
    if (formModalButtons.length === 0) {
        console.error("No modal buttons found");
        return;
    }
    console.log(`Found ${formModalButtons.length} modal buttons`);
    /*end test*/

    const ClassInfo = {
        "modal-little": {
            title: "Little Ninja Class",
            benefits: [
                "3 - 5 year olds",
                "Learn basic stances and first form.",
                "Focus on disipline and control",
                "Mon & Wed: 4pm - 4:45pm"
            ]
        },
        "modal-lower": {
            title: "Lower Ranking Belts",
            benefits: [
                "White, Yellow, and Green Belts",
                "Focus on forms 1-4, stances, steps, and some sparring",
                "Combined Rank Class: ",
                "Mon-Thur: 5pm - 5:50pm & 6pm - 8:30pm"
            ]
        },
        "modal-upper": {
            title: "Upper Ranking Belts",
            benefits: [
                "Blue, Brown, and Black Belts",
                "Focus on forms 5-10",
                "Sparring, endurance, accuracy",
                "Combined Rank Class: ",
                "Mon-Thur: 5pm - 5:50pm & 6pm - 8:30pm",
                "Upper Rank ONLY:",
                "Fridays 6pm - 8:30pm"
            ]
        },
        "modal-grappling": {
            title: "MMA/Grappling",
            benefits: [
                "Mixed Martial Arts competition training",
                "Boxing, grappling, kicking, and physical conditioning"
            ]
        }
    };

    formModalButtons.forEach(button => {
        button.addEventListener("click", function () {
            const classType = this.getAttribute("data-modal");
            /*test*/
            console.log(`Button clicked: ${classType}`);

            if (!ClassInfo[classType]) {

                /*test */
                console.error(`No class data found for ${classType}`);
                return;
            }
            console.log(`Opening modal for: ${classType}`);
            /*end test*/

            let existingModal = document.getElementById("dynamic-modal");
            if (existingModal) {
                existingModal.remove();
            }

            let modal = document.createElement("div");

            modal.id = "dynamic-modal";
            modal.classList.add("modal");
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">❌</span>
                    <h3>${ClassInfo[classType].title}</h3>
                    <div class="class-details">
                        ${ClassInfo[classType].benefits.map(benefit => `<p>${benefit}</p>`).join('')}
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            modal.style.display = "flex";
            modal.style.position = "fixed";
            modal.style.top = "50%";
            modal.style.left = "50%";
            modal.style.transform = "translate(-50%, -50%)";

            setTimeout(() => {
                const closeButton = modal.querySelector(".close");
                if (closeButton) {
                    closeButton.addEventListener("click", function () {
                        modal.style.display = "none";
                        console.log("Modal closed");
                    });
                }
                else {
                    console.error("Close button not found");
                }
            }, 10);


            /*test*/
            const closeButton = modal.querySelector(".close");
            if (closeButton) {
                closeButton.addEventListener("click", function () {
                    modal.style.display = "none";
                    console.log("Modal closed");
                });
            }
            else {
                console.error("Close button not found");
            }
            /*end test*/

            modal.addEventListener("click", function (event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                    console.log("Modal closed by clicking outside"); /*test*/
                }
            });
        })
    });
});