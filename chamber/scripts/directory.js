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

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.menu-links li a');
    const currentPath = window.location.pathname.replace(/\/$/, '');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;

        if (linkPath === currentPath) {
            link.classList.add('active')
        }
        else {
            link.classList.remove('active')
        }
    });

    const url = 'members.json';

    const cards = document.querySelector('#cards');

    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');

    gridViewButton.addEventListener('click', () => {
        cards.classList.add('grid-view');
        cards.classList.remove('list-view');
    });

    listViewButton.addEventListener('click', () => {
        cards.classList.add('list-view');
        cards.classList.remove('grid-view');
    })




    async function getBusinessData() {
        try {
            cards.innerHTML = '<p>Loading data...</p>';
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to load JSON data. Status: ${response.status}');
            const data = await response.json();
            displayBusinesses(data.businesses);
        }
        catch (error) {
            cards.innerHTML = '<p>Failed to load data. Please try again later.</p>';
            console.error("Error! Failed to fetch data:", error);
        }
    }


    const displayBusinesses = (businesses) => {
        cards.innerHTML = '';
        businesses.forEach((business) => {
            let card = document.createElement('section');

            let topContent = document.createElement('div');
            topContent.classList.add('top-content');
            let businessName = document.createElement('h2');


            let businessAddress = document.createElement('p');
            let businessPhone = document.createElement('p');
            let businessMembershipLevel = document.createElement('p');
            let businessLink = document.createElement('a');
            let portrait = document.createElement('img');


            businessName.textContent = business.name;
            topContent.appendChild(businessName);

            businessAddress.textContent = business.address;
            businessPhone.textContent = business.phone;

            const levelMap = { 1: 'Member', 2: 'Silver', 3: 'Gold' };
            businessMembershipLevel.textContent = `Membership Level: ${levelMap[business.membership_level] || 'Unknown'}`;

            businessLink.href = business.URLs;
            businessLink.textContent = "Visit Website";
            businessLink.title = business.URLs;
            businessLink.target = '_blank';
            businessLink.style.display = 'block';

            portrait.setAttribute('src', business.image);
            portrait.setAttribute('alt', `Portrait of ${business.name}`);
            /*portrait.setAttribute('loading', 'lazy');*/
            portrait.setAttribute('width', 80);
            portrait.setAttribute('height', 50);

            card.appendChild(topContent);
            card.appendChild(businessAddress);
            card.appendChild(businessPhone);
            card.appendChild(businessMembershipLevel);
            card.appendChild(portrait);
            card.appendChild(businessLink);

            cards.appendChild(card);
        });
    };
    getBusinessData();
});

//index joining button
document.addEventListener("DOMContentLoaded", function () {
    const joiningButton = document.getElementById("joining-link");

    joiningButton.addEventListener("click", function () {
        window.location.href = "join.html";
    });
});

// index weather api
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=36.75082&lon=-108.36565&units=imperial&appid=f63f3c9b0e500e13346f9e9a881a061a';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        }
        else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}

apiFetch();

// Load events dynamically
const events = [
    { date: 'March 12, 2025 : 6pm - 7:30pm', place: '47 Road 6500', name: 'Business Networking Event', info: 'Join us for an evening of networking with local businesses.' },
    { date: 'April 5, 2025 : 9am - Noon', place: '47 Road 6500', name: 'Community Cleanup Day', info: 'Help keep Kirtland clean and green!' },
    { date: 'May 17, 2025 : 8am - Noon', place: '47 Road 6500', name: 'Local Farmers Market', info: 'Support local farmers and enjoy fresh produce.' },
    { date: 'June 6, 2025 : 6pm - 8pm', place: '47 Road 6500', name: 'Tech Innovations Expo', info: 'Discover the latest tech trends and innovations.' },
    { date: 'July 19, 2025 : 8am - 2pm', place: '47 Road 6500', name: 'Music in the Park', info: 'Live music from local artists. Fun for the whole family!' },
    { date: 'August 22, 2025 : 6pm - 7:30pm', place: '47 Road 6500', name: 'Small Business Workshop', info: 'Learn how to grow and market your small business.' }
];

const eventsContainer = document.getElementById('events-container');
eventsContainer.innerHTML = events.map(event => `
    <div class="event-card">
        <h3>${event.name}</h3>
        <h5>${event.date}</h5>
        <p>${event.info}</p>
        <p>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</p>
    </div>
`).join('');

// Fetch and display spotlight members
fetch('members.json')
    .then(response => response.json())
    .then(data => {
        const members = data.businesses.filter(member => member.membership_level === 2 || member.membership_level === 3);
        const spotlightContainer = document.getElementById('spotlight-container');

        // Get 3 random gold or silver members
        const shuffledMembers = members.sort(() => 0.5 - Math.random()).slice(0, 3);
        const levelMap = { 1: 'Member', 2: 'Silver', 3: 'Gold' };
        spotlightContainer.innerHTML = shuffledMembers.map(member => `
                <div class="spotlight-card">
                    <h3>${member.name}</h3>
                    <img src="${member.image}" alt="${member.name}" style="width: 150px; height: 150px; object-fit: contain; border-radius: 8px;">
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <p><strong>Membership Level:</strong> ${levelMap[member.membership_level]}</p>
                    <a href="${member.URLs}" target="_blank">Visit Website</a>
                </div>
        `).join('');
    })
    .catch(error => console.error('Error loading members:', error));
