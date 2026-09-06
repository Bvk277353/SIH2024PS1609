// Function to translate text dynamically from the webpage
async function translatePage(targetLanguage) {
    // Select elements to translate
    const elements = document.querySelectorAll('h1, p, a, span, button');
    const textArray = Array.from(elements).map(el => el.innerText.trim());

    try {
        // Translate each text block
        const translations = await Promise.all(
            textArray.map(text => translateText(text, targetLanguage))
        );

        // Update the content of each element with the translated text
        elements.forEach((el, index) => {
            if (translations[index]) el.innerText = translations[index];
        });

        // Save selected language for consistent translations across pages
        localStorage.setItem('selectedLanguage', targetLanguage);
    } catch (error) {
        console.error('Translation error:', error);
    }
}

// Function to send a translation request to the API
async function translateText(inputText, targetLanguage) {
    // Headers as per the provided API details
    const myHeaders = new Headers();
    myHeaders.append("x-apihub-key", "N73ibHNrMDeqvO9Qf5BbhrdJvxwUZ8yKZJ6ONh6JJ-PmXPHWgS");
    myHeaders.append("x-apihub-host", "Translate.allthingsdev.co");
    myHeaders.append("x-apihub-endpoint", "3f4ee5f4-f67c-4c5a-9375-635d8b514026");
    myHeaders.append("Content-Type", "application/json");

    // Body of the request
    const raw = JSON.stringify({
        input: inputText // The text to translate
    });

    // Request options
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // API endpoint for translation
    const url = `https://Translate.proxy-production.allthingsdev.co/translate?translated_from=eng&translated_to=${targetLanguage}`;

    // Make the API call
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    return result.translation; // Assumes 'translation' is the response key
}

// Event listener for the language dropdown
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault(); // Prevent page navigation
        const targetLanguage = item.getAttribute('data-lang'); // Get selected language
        translatePage(targetLanguage); // Trigger translation
    });
});

// Apply saved language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        translatePage(savedLanguage);
    }
});
