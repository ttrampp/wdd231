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

//specific to discover page

document.addEventListener("DOMContentLoaded", async () => {
    const placeCardsContainer = document.getElementById("placeCards");

    //fetch attractions json data
    try {
        const response = await fetch("attractions.json");
        const data = await response.json();
        const attractions = data.attractions.slice(0, 8);  //select first 8 items

        //generate the cards dynamically
        attractions.forEach(place => {
            const theCard = document.createElement("div");
            theCard.classList.add("place-card");

            // Image
            const theFigure = document.createElement("figure");
            const thePhoto = document.createElement('img');
            thePhoto.src = place.photo.startsWith("http") ? place.photo : `images/${place.photo}`;
            thePhoto.alt = place.name;
            theFigure.appendChild(thePhoto);
            theCard.appendChild(theFigure);

            // Title
            const theTitle = document.createElement('h2');
            theTitle.innerContent = place.name;
            theCard.appendChild(theTitle);

            // Address
            const theAddress = document.createElement('address');
            theAddress.innerContent = place.address;
            theCard.appendChild(theAddress);

            // Description
            const theDescription = document.createElement('p');
            theDescription.classList.add("description");
            theDescription.textContent = place.description;
            theCard.appendChild(theDescription);

            // Learn More Button
            const learnMoreButton = document.createElement("button");
            learnMoreButton.textContent = "Learn More";
            learnMoreButton.classList.add("learn-more-button");
            learnMoreButton.addEventListener("click", () => {
                alert(`More info about ${place.name}`);
            });
            theCard.appendChild(learnMoreButton);

            placeCardsContainer.appendChild(theCard);
        });

    }
    catch {
        console.error("Error loading attractions:", error);
    }


    // Visitor Message
    const visitMessage = document.createElement("div");
    visitMessage.id = "visitMessage";
    document.body.insertBefore(visitMessage, document.body.firstChild);

    const lastVisit = localStorage.getItem("lastVisit");
    const currentTime = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    }
    else {
        const daysSinceLastVisit = Math.floor((currentTime - lastVisit) / (1000 * 60 * 60 * 24));

        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Fantastic!";
        }
        else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} day${daysSinceLastVisit > 1 ? 's' : ''} ago. `;
        }
    }
    localStorage.setItem("lastVisit", currentTime);
});