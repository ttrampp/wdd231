console.log("index.js is running!");

import { setupFooterAndNavbar, openModal, closeModal, setupEventListeners, setupModalDragging, loadRandomTrainingImages, makeFooterEmailClickable } from './dojang.js';



//ensure functions run after the page loads
document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOMContentLoaded event fired in index.js");

    //hide the modal immediately when the page loads
    const modal = document.getElementById("event-modal");
    if (modal) {
        modal.style.display = "none";
        console.log("Modal hidden on page load");
    }

    setupFooterAndNavbar();

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            console.log("Hamburger menu toggled!");
        });
    }

    console.log("Calling loadRandomTrainingImages...")
    await loadRandomTrainingImages(); // Loads images dynamically

    console.log("Calling setupEventListeners...")
    setupEventListeners();  // Loads event list dynamically

    setupModalDragging();

    makeFooterEmailClickable(),

        console.log("All event listeners are images should now be loaded")
});