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

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("join.html")) {
        setTimestampBeforeSubmission();
        populateMembershipDropdown();
    }
    else if (window.location.pathname.includes("thankyou.html")) {
        displayConfirmation();
    }
});

const joinLevels = [
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


function populateMembershipDropdown() {
    const selectElement = document.querySelector('#membership-level');

    if (!selectElement) {
        console.error("Membership dropdown not found.");
        return;
    }

    console.log("Found #membership-level dropdown.");

    selectElement.innerHTML = '<option value="" disabled selected>Choose your membership level</option>';

    joinLevels.forEach(level => {
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


//document.addEventListener("DOMContentLoaded", populateMembershipDropdown);

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    //const value = urlParams.get(param);
    return urlParams.get(param);
}


function displayConfirmation() {
    /*const confirmationMessage = document.getElementById("confirmationMessage");

    const levelID = getQueryParam("membership-level");
    if (!levelID) return;

    const levelDetails = joinLevels.find(c => c.id === levelID);

    confirmationMessage.textContent = levelDetails
        ? `You signed up for: ${levelDetails.name}. Cost: ${levelDetails.cost}`
        : "Membership details could not be found. Please try again.";*/

    const confirmationContainer = document.querySelector(".confirmationContainer");
    if (!confirmationContainer) {
        console.error("⚠ Confirmation container not found.");
        return;
    }

    // Retrieve all form fields from the URL
    const firstName = getQueryParam("firstName");
    const lastName = getQueryParam("lastName");
    const title = getQueryParam("organization-title");
    const email = getQueryParam("email");
    const phone = getQueryParam("phoneNumber");
    const organization = getQueryParam("organization");
    const membershipID = getQueryParam("membership-level");
    const timestamp = getQueryParam("timestamp");

    // Find membership level details
    const levelDetails = joinLevels.find(level => level.id === membershipID);

    // Build the confirmation message
    let confirmationHTML = `
        <h2>Thank you for signing up!</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Membership Level:</strong> ${levelDetails ? levelDetails.name : "Unknown"}</p>
        <p><strong>Cost:</strong> ${levelDetails ? levelDetails.cost : "N/A"}</p>
        <p><strong>Signup Date:</strong> ${timestamp}</p>
    `;

    // Insert into the confirmation container
    confirmationContainer.innerHTML = confirmationHTML;
    console.log("Confirmation page updated with form data.");
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("thankyou.html")) {
        displayConfirmation();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const modalButtons = document.querySelectorAll(".modal-button");


    /*test*/
    if (modalButtons.length === 0) {
        console.error("No modal buttons found");
        return;
    }
    console.log(`Found ${modalButtons.length} modal buttons`);
    /*end test*/

    const membershipInfo = {
        "modal-bronze": {
            title: "Bronze Membership Benefits",
            benefits: [
                "Access to networking events",
                "Discounts on select services",
                "Basic directory listing"
            ]
        },
        "modal-silver": {
            title: "Silver Membership Benefits",
            benefits: [
                "Everything in Bronze Membership",
                "Spotlight position on homepage",
                "Priority event seating"
            ]
        },
        "modal-gold": {
            title: "Gold Membership Benefits",
            benefits: [
                "Everything in Silver Membership",
                "Featured advertisements",
                "VIP access to events"
            ]
        },
        "modal-np": {
            title: "Non-Profit Membership Benefits",
            benefits: [
                "Free directory listing",
                "Access to educational workshops"
            ]
        }
    };

    modalButtons.forEach(button => {
        button.addEventListener("click", function () {
            const membershipType = this.getAttribute("data-modal");
            /*test*/
            console.log(`Button clicked: ${membershipType}`);

            if (!membershipInfo[membershipType]) {

                /*test */
                console.error(`No membership data found for ${membershipType}`);
                return;
            }
            console.log(`Opening modal for: ${membershipType}`);
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
                    <span class="close">&times;</span>
                    <h3>${membershipInfo[membershipType].title}</h3>
                    <ul>${membershipInfo[membershipType].benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>
                </div>
            `;

            document.body.appendChild(modal);
            modal.style.display = "flex";

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

            /*modal.querySelector(".close").addEventListener("click", function () {
                modal.style.display = "none";
            });*/

            modal.addEventListener("click", function (event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                    console.log("Modal closed by clicking outside"); /*test*/
                }
            });
        })
    });
});
;