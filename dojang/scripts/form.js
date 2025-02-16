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
        name: "NP Membership is for non profit organizations and there is no fee",
        cost: "Free"
    },
    {
        id: "BM",
        name: "Bronze Membership",
        cost: "$50"
    },
    {
        id: "SM",
        name: "Silver Membership",
        cost: "$100"
    },
    {
        id: "GM",
        name: "Gold Membership",
        cost: "$200"
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
    return urlParams.get(param);
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
    const title = getQueryParam("organization-title");
    const email = getQueryParam("email");
    const phone = getQueryParam("phoneNumber");
    const organization = getQueryParam("organization");
    const classID = getQueryParam("class-level");
    const timestamp = getQueryParam("timestamp");

    // Find class level details
    const levelDetails = classLevels.find(level => level.id === classID);

    // Build the confirmation message
    let confirmationHTML = `
        <h2>Thank you for signing up!</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Organization:</strong> ${organization}</p>
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
            title: "Bronze Membership Benefits",
            benefits: [
                "Access to networking events",
                "Discounts on select services",
                "Basic directory listing"
            ]
        },
        "modal-lower": {
            title: "Silver Membership Benefits",
            benefits: [
                "Everything in Bronze Membership",
                "Spotlight position on homepage",
                "Priority event seating"
            ]
        },
        "modal-upper": {
            title: "Gold Membership Benefits",
            benefits: [
                "Everything in Silver Membership",
                "Featured advertisements",
                "VIP access to events"
            ]
        },
        "modal-grappling": {
            title: "Non-Profit Membership Benefits",
            benefits: [
                "Free directory listing",
                "Access to educational workshops"
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
                    <ul>${ClassInfo[classType].benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>
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