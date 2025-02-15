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

//upcoming events on index.hmtl page
//why cant i get this!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 DOM fully loaded. Running scripts...");

    // Select Modal Elements
    const modal = document.getElementById('event-modal');
    const modalContent = document.querySelector('.modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalTime = document.getElementById('modal-time');
    const modalDescription = document.getElementById('modal-description');
    const closeXButton = document.getElementById('modal-close-x');

    if (!modal || !modalTitle || !modalDate || !modalTime || !modalDescription || !closeXButton) {
        console.error("Modal elements missing! Check index.html.");
        return;
    }

    // Ensure modal is hidden when the page loads
    modal.style.display = 'none';

    // Modal Events Data
    const events = [
        { name: "Regional Tournament", date: "March 10, 2025", time: "10:00 AM", description: "Compete with the best in the region!" },
        { name: "Kids Class", date: "March 15, 2025", time: "4:00 PM", description: "A fun introduction to Taekwondo for kids." },
        { name: "Low Ranking Class", date: "March 20, 2025", time: "6:00 PM", description: "A class tailored for white to green belts." },
        { name: "High Ranking Class", date: "March 25, 2025", time: "7:30 PM", description: "Training for advanced students." },
        { name: "Combined Class", date: "March 30, 2025", time: "5:00 PM", description: "All students train together for unity and growth." }
    ];

    const eventList = document.getElementById('event-list');

    // Function to Open Modal & Update Content Without Closing
    function openModal(event) {
        modal.style.display = 'flex'; // Keep modal visible
        modalTitle.textContent = event.name;
        modalDate.textContent = `Date: ${event.date}`;
        modalTime.textContent = `Time: ${event.time}`;
        modalDescription.textContent = event.description;

        // If the modal has not been moved, center it
        if (!modalContent.dataset.moved) {
            centerModal();
        }
    }

    // Function to Close Modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Function to Center Modal When First Opened
    function centerModal() {
        modalContent.style.position = "absolute";
        modalContent.style.left = `${(window.innerWidth - modalContent.offsetWidth) / 2}px`;
        modalContent.style.top = `${(window.innerHeight - modalContent.offsetHeight) / 2}px`;
        modalContent.dataset.moved = "false"; // track if modal was moved
    }

    // Populate Event List with Clickable Links
    events.forEach(event => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" class="event-link">${event.name}</a>`;

        li.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(event); // updates  content instead of closing modal
        });

        eventList.appendChild(li);
    });

    // Attach Event Listener for Closing Modal
    if (closeXButton) {
        closeXButton.addEventListener('click', closeModal);
    }

    // Prevent modal from closing when clicking inside it
    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Allow modal to close when clicking outside modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Ensure modal stays centered when window resizes
    window.addEventListener("resize", () => {
        if (modal.style.display === 'flex' && modalContent.dataset.moved !== "true") {
            centerModal();
        }
    });

    // DRAGGING FUNCTIONALITY
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    // Start Dragging
    modalContent.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - modalContent.getBoundingClientRect().left;
        offsetY = e.clientY - modalContent.getBoundingClientRect().top;
        modalContent.style.cursor = 'grabbing';
    });

    // Move Modal Without Resetting on Click
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Ensure modal stays within viewport bounds
        let maxX = window.innerWidth - modalContent.clientWidth;
        let maxY = window.innerHeight - modalContent.clientHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        modalContent.style.left = `${newX}px`;
        modalContent.style.top = `${newY}px`;

        // Mark modal as moved to prevent re-centering on new clicks
        modalContent.dataset.moved = "true";
    });

    // Stop Dragging
    document.addEventListener('mouseup', () => {
        isDragging = false;
        modalContent.style.cursor = 'grab';
    });
});
//end the dragging process

//***************************************************************************************** */
//Random training photos on index.html page

const url = 'dojang.json';

const cards = document.querySelector('#cards');



document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('date-modified').textContent = document.lastModified;

    const dateModified = document.getElementById('date-modified');
    if (dateModified) {
        dateModified.textContent = document.lastModified;
    }

    fetch('./dojang.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {

            let images = [...data.trainings];

            console.log("All Available Images:", images);

            let selectedImages = getRandomImages(images, 6);

            console.log("Selected Random Images:", selectedImages);

            let leftImages = selectedImages.slice(0, 3);
            let rightImages = selectedImages.slice(3, 6);

            if (document.getElementById('left-images') && document.getElementById('right-images')) {
                insertImages('left-images', leftImages);
                insertImages('right-images', rightImages);
            }
            else {
                console.error("Image containers not found!");
            }
        })
        .catch(error => console.error("Error loading images:", error));


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
            img.style.width = "100%";
            img.style.height = "auto";

            console.log(`Adding image ${index + 1} to ${containerId}: ${imgSrc}`);
            container.appendChild(img);
        });

        console.log(`Images added to ${containerId}:`, container.innerHTML);
    }
});

