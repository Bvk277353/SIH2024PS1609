document.addEventListener("DOMContentLoaded", () => {
    const techData = {
        desalination: {
            title: "Desalination",
            description: "Converts seawater into potable water using advanced technologies.",
            countries: "Israel, Saudi Arabia, Australia, UAE, Spain",
            success: "85%"
        },
        "drip-irrigation": {
            title: "Drip Irrigation",
            description: "Efficient irrigation system delivering water directly to plant roots.",
            countries: "India, Israel, USA, Mexico",
            success: "90%"
        },
        "fog-harvesting": {
            title: "Fog Harvesting",
            description: "Captures water from fog in arid regions using specialized nets.",
            countries: "Chile, Morocco, Peru, Ethiopia",
            success: "75%"
        },
        recycling: {
            title: "Water Recycling",
            description: "Treats wastewater to make it reusable for agriculture and drinking.",
            countries: "Singapore, USA, Namibia, China",
            success: "95%"
        }
    };

    const techTiles = document.querySelectorAll(".tech-tile");
    const modal = document.getElementById("tech-modal");
    const modalTitle = document.getElementById("tech-title");
    const modalDescription = document.getElementById("tech-description");
    const modalCountries = document.getElementById("tech-countries");
    const modalSuccess = document.getElementById("tech-success");
    const closeModal = document.querySelector(".close-btn");

    techTiles.forEach(tile => {
        tile.addEventListener("click", () => {
            const tech = tile.dataset.tech;
            const data = techData[tech];

            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            modalCountries.textContent = data.countries;
            modalSuccess.textContent = data.success;

            modal.style.display = "flex";
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", e => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
