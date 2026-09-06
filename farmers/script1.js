const cropData = {
    wheat: {
        name: "Wheat",
        water: "450-650 mm",
        conditions: "Well-drained loamy soil, moderate temperature",
        season: "Rabi (Winter)",
        conservation: "Drip irrigation, mulching",
    },
    millet: {
        name: "Millet",
        water: "200-400 mm",
        conditions: "Arid and semi-arid regions",
        season: "Kharif (Monsoon)",
        conservation: "Rainwater harvesting, drought-resistant seeds",
    },
    rice: {
        name: "Rice",
        water: "1,200-1,600 mm",
        conditions: "Clayey soil, high water availability",
        season: "Kharif (Monsoon)",
        conservation: "System of Rice Intensification (SRI), alternate wetting and drying",
    },
};

function showCropDetails(crop) {
    const details = cropData[crop];
    if (details) {
        const content = `
            <h2>${details.name}</h2>
            <p><strong>Water Requirement:</strong> ${details.water}</p>
            <p><strong>Conditions:</strong> ${details.conditions}</p>
            <p><strong>Season:</strong> ${details.season}</p>
            <p><strong>Water Conservation Methods:</strong> ${details.conservation}</p>
        `;
        document.getElementById('cropDetailsContent').innerHTML = content;
        document.getElementById('cropDetails').style.display = 'flex';
    }
}

function closeCropDetails() {
    document.getElementById('cropDetails').style.display = 'none';
}
