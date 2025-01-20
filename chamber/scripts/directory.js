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
});
