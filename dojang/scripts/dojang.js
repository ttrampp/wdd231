// Set the current year in the footer
export function setupFooterAndNavbar() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    document.addEventListener('DOMContentLoaded', () => {
        const lastModifiedElement = document.getElementById("date-modified");
        if (lastModifiedElement) {
            lastModifiedElement.textContent = document.lastModified;
        }

        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('open');
            });
        }
    });
}


//makes email in footer to be a clickable link
export function makeFooterEmailClickable() {
    console.log("makeFooterEmailClickable() function is running...");

    const emailElement = document.querySelector(".footer-email");
    if (emailElement) {
        console.log("Footer email element found:", emailElement.textContent);

        // Check if it's already wrapped in a link to avoid duplication
        if (!emailElement.querySelector("a")) {
            const email = emailElement.textContent.trim();
            emailElement.innerHTML = `<a href="mailto:${email}">${email}</a>`;
            console.log("Footer email updated successfully:", email);
        } else {
            console.log("Footer email is already a link.");
        }
    } else {
        console.error("Footer email element not found!");
    }
}

// Run function after DOM loads
document.addEventListener("DOMContentLoaded", makeFooterEmailClickable);






// Open modal and insert event details
export function openModal(event) {
    const modal = document.getElementById('event-modal');

    if (!modal) {
        console.error("Modal not found!");
        return;
    }

    if (!event) {
        console.warn("No event provided to openModal. Ignoring...");
        return;
    }

    modal.style.display = 'flex';
    document.getElementById('modal-title').textContent = event.name || "Event Details";
    document.getElementById('modal-date').textContent = event.date ? `Date: ${event.date}` : "";        //****usage of template****/
    document.getElementById('modal-time').textContent = event.time ? `Time: ${event.time}` : "";        //****when building strings****/
    document.getElementById('modal-description').textContent = event.description || "";

    console.log("Modal opened with event:", event);
}


//Close modal function
export function closeModal() {
    const modal = document.getElementById('event-modal');

    if (modal) {
        modal.style.display = 'none';
        console.log("Modal close.");
    }
}

//Event listeners for modals
export function setupEventListeners() {


    console.log("setupEventListeners() is running... (confirmed call from index.js)");

    const eventList = document.getElementById('event-list');

    if (!eventList) {
        console.error("Event list container not found.");
        return;
    }

    eventList.style.opacity = "0"; //hide events initially

    console.log("Found event list container. Adding events...");

    //clear existing events
    eventList.innerHTML = "";

    // event data
    const events = [
        { name: "Kim's Tournament Prep", date: "March 11, 2025", time: "4:00 PM", description: "Tournament preparation kick-off meeting. All Black Belts & Helpers should attend." },
        { name: "Regional Tournament", date: "March 15, 2025", time: "10:00 AM", description: "Compete with the best in the region! Volunteer sign-up sheets are up on the bulletin board. Please consider competing and helping with the tournament." },
        { name: "Testing", date: "March 22, 2025", time: "10:00 AM", description: "Full uniform required. We will start with lower ranks and move up. Bring a folding chair as there isn't much seating. Practice hard beforehand. You've got this! Master Kim will be attending." },
        { name: "Weapons Class", date: "March 28, 2025", time: "7:00 PM", description: "Training for advanced students." }
    ];

    console.log("Upcoming Events:", events);

    events.forEach(event => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><a href="#" class="event-link">${event.name}</a></td>`;
        tr.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(event);
        });
        eventList.appendChild(tr);
    });

    console.log("Events added successfully!");

    //Fade-in effect after content loads
    setTimeout(() => {
        eventList.style.opacity = "1";
        eventList.style.transition = "opacity 0.5s ease-in-out";
    }, 100);

    const closeXButton = document.getElementById('modal-close-x');
    if (closeXButton) {
        closeXButton.addEventListener('click', closeModal);
    }
};


//Dragging functionality
export function setupModalDragging() {
    let isDragging = false;
    let startX, startY;
    const modal = document.getElementById('event-modal');

    if (!modal) {
        console.error("Modal not found.");
        return;
    }

    modal.addEventListener("mousedown", function (e) {
        isDragging = true;
        startX = e.clientX - modal.getBoundingClientRect().left;
        startY = e.clientY - modal.getBoundingClientRect().top;
        modal.style.position = "absolute";
        modal.style.zIndex = "1000";
        modal.style.cursor = "grabbing";
        e.preventDefault();
    });

    document.addEventListener("mousemove", function (e) {
        if (!isDragging) return;
        modal.style.left = `${e.clientX - startX}px`;
        modal.style.top = `${e.clientY - startY}px`;
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
        modal.style.cursor = "grab";
    });
}

console.log("dojang.js is running")
export async function loadRandomTrainingImages() {
    console.log("1-Attempting to fetch dojang.json")
    try {
        const response = await fetch('./dojang.json');
        console.log("2-Fetch request made")

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log("3- Response received successfully");

        const data = await response.json();
        console.log("4-JSON data parse:", data);

        let images = [...data.trainings];
        let selectedImages = getRandomImages(images, 6);
        insertImages('left-images', selectedImages.slice(0, 3));
        insertImages('right-images', selectedImages.slice(3, 6));

        console.log("5- Images inserted successfully");

    } catch (error) {
        console.error("Error loading images:", error);
    }
}


function getRandomImages(array, num) {
    let shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function insertImages(containerId, images) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    images.forEach((imgSrc, index) => {
        let img = document.createElement('img');
        img.src = `${imgSrc}`;
        img.alt = `Taekwondo Training ${index + 1}`;
        img.loading = "lazy";
        img.classList.add("hover-effect");
        container.appendChild(img);

    });
}

