document.addEventListener("DOMContentLoaded", () => {
    const languageLinks = document.querySelectorAll('.dropdown-item[data-lang]');
    const elementsToTranslate = {
        navbar: {
            home: document.querySelector('a[href="index.html"]'),
            about: document.querySelector('a[href="about.html"]'),
            service: document.querySelector('a[href="service.html"]'),
            blog: document.querySelector('a[href="blogs/Water Blog.html"]'),
            quiz: document.querySelector('a[href="quiz/quiz.html"]'),
            chatbot: document.querySelector('a[href="quiz.html"]'),
            contact: document.querySelector('a[href="contact.html"]'),
        },
        hero: {
            title: document.querySelector('.carousel-caption-1 h4'),
            subtitle: document.querySelector('.carousel-caption-1 h1'),
            description: document.querySelector('.carousel-caption-1 p'),
            button1: document.querySelector('.carousel-caption-1-content-btn .btn-primary'),
            button2: document.querySelector('.carousel-caption-1-content-btn .btn-secondary'),
        },
    };

    // Function to update text based on the selected language
    const updateLanguage = (lang) => {
        const translation = translations[lang];
        if (translation) {
            // Update Navbar
            Object.keys(elementsToTranslate.navbar).forEach((key) => {
                elementsToTranslate.navbar[key].textContent = translation.navbar[key];
            });

            // Update Hero Section
            Object.keys(elementsToTranslate.hero).forEach((key) => {
                elementsToTranslate.hero[key].textContent = translation.hero[key];
            });
        }
    };

    // Event listener for language change
    languageLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedLang = event.target.getAttribute('data-lang');
            updateLanguage(selectedLang);
        });
    });

    // Set default language to English
    updateLanguage('en');
});
