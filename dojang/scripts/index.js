import { setupFooterAndNavbar, openModal, closeModal, setupEventListeners, setupModalDragging, loadRandomTrainingImages } from './dojang.js';

console.log("index.js is running!");

//ensure functions run after the page loads
document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOMContentLoaded event fired");

    //hide the modal immediately when the page loads
    const modal = document.getElementById("event-modal");
    if (modal) {
        modal.style.display = "none";
        console.log("Modal hidden on page load");
    }

    setupFooterAndNavbar();
    await loadRandomTrainingImages(); // Loads images dynamically

    console.log("Calling setupEventListeners...")
    setupEventListeners();  // Loads event list dynamically

    setupModalDragging();

    //makes email in footer to be a clickable link
    const emailElement = document.querySelector(".footer-email");
    if (emailElement) {
        const email = emailElement.textContent.trim();
        emailElement.innerHTML = `<a href="mailto:${email}">${email}</a>`;
    }
});