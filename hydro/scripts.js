async function generateSuggestions() {
    const ph = document.getElementById('ph').value;
    const tds = document.getElementById('tds').value;
    const temp = document.getElementById('temp').value;
    const contaminants = document.getElementById('contaminants').value;
    const plantType = document.getElementById('plantType').value;
    const nutrientConcentration = document.getElementById('nutrientConcentration').value;

    const inputData = {
        ph: parseFloat(ph),
        tds: parseInt(tds),
        temp: parseFloat(temp),
        contaminants: parseInt(contaminants),
        plantType: plantType,
        nutrientConcentration: parseInt(nutrientConcentration)
    };

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `Analyze these hydroponic and water quality inputs: pH: ${inputData.ph}, TDS: ${inputData.tds}, Temperature: ${inputData.temp}°C, Contaminants: ${inputData.contaminants} ppm, Plant Type: ${inputData.plantType}, Nutrient Concentration: ${inputData.nutrientConcentration} ppm. Provide actionable suggestions.`,
                max_tokens: 200
            })
        });

        const data = await response.json();
        const suggestionText = data.choices[0].text.trim();

        document.getElementById('output').innerHTML = suggestionText;

    } catch (error) {
        console.error('API error:', error);
        document.getElementById('output').innerHTML = 'An error occurred while fetching suggestions. Please try again later.';
    }
}
