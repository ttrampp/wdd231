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

    // Ensure footer date updates correctly
    const dateModifiedElement = document.getElementById("date-modified");
    if (dateModifiedElement) {
        dateModifiedElement.textContent = document.lastModified;
    }

    // MODAL FIX: Ensure modal elements exist before trying to use them
    const modal = document.getElementById('event-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalDescription = document.getElementById('modal-description');
    const closeModalButton = document.getElementById('close-modal');

    if (!modal || !modalTitle || !modalDate || !modalDescription || !closeModalButton) {
        console.error("Modal elements missing! Check index.html.");
        return;
    }

    // ensure modal is HIDDEN when page loads
    modal.style.display = 'none';

    // EVENT LIST: Add event details dynamically
    const events = [
        { name: "Regional Tournament", date: "March 10, 2025", time: "10:00 AM", description: "Compete with the best in the region!" },
        { name: "Kids Class", date: "March 15, 2025", time: "4:00 PM", description: "A fun introduction to Taekwondo for kids." },
        { name: "Low Ranking Class", date: "March 20, 2025", time: "6:00 PM", description: "A class tailored for white to green belts." },
        { name: "High Ranking Class", date: "March 25, 2025", time: "7:30 PM", description: "Training for advanced students." },
        { name: "Combined Class", date: "March 30, 2025", time: "5:00 PM", description: "All students train together for unity and growth." }
    ];

    const eventList = document.getElementById('event-list');

    events.forEach(event => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" class="event-link">${event.name}</a>`;
        
        // only opens modal when an event is clicked
        li.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Opening modal for: ${event.name}`);

            modalTitle.textContent = event.name;
            modalDate.textContent = `Date: ${event.date} | Time: ${event.time}`;
            modalDescription.textContent = event.description;

            modal.style.display = 'flex'; //opens modal properly
        });

        eventList.appendChild(li);
    });

    //CLOSE MODAL FUNCTIONALITY
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
        console.log("Modal closed.");
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            console.log("Modal closed by clicking outside.");
        }
    });

    // ensure modal is hidden on first page load
    modal.style.display = 'none';
});


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

