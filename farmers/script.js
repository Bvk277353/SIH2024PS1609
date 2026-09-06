const cropData = {
  wheat: {
    name: "Wheat",
    water: "450-650 mm",
    season: "Rabi (Winter)",
    conditions: "Well-drained loamy soil, moderate temperature",
    technology: "Drip irrigation, Mulching",
  },
  millet: {
    name: "Millet",
    water: "200-400 mm",
    season: "Kharif (Monsoon)",
    conditions: "Arid and semi-arid regions",
    technology: "Rainwater harvesting, Drought-resistant seeds",
  },
  sorghum: {
    name: "Sorghum",
    water: "300-500 mm",
    season: "Kharif (Monsoon)",
    conditions: "Sandy soil, high temperature",
    technology: "Dryland farming techniques",
  },
};

function showDetails(crop) {
  const details = cropData[crop];
  if (details) {
    const content = `
      <h2>${details.name}</h2>
      <p><strong>Water Requirement:</strong> ${details.water}</p>
      <p><strong>Season:</strong> ${details.season}</p>
      <p><strong>Ideal Conditions:</strong> ${details.conditions}</p>
      <p><strong>Technology:</strong> ${details.technology}</p>
    `;
    document.getElementById("details-content").innerHTML = content;
    document.getElementById("crop-details").style.display = "block";
  }
}

function closeDetails() {
  document.getElementById("crop-details").style.display = "none";
}
