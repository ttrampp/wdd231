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
            portrait.setAttribute('width', 100);
            portrait.setAttribute('height', 70);

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
