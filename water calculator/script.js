// script.js

function calculateWaterUsage(event) {
  event.preventDefault();

  const showers = parseInt(document.getElementById('showers').value) || 0;
  const toilet = parseInt(document.getElementById('toilet').value) || 0;
  const washing = parseInt(document.getElementById('washing').value) || 0;
  const dishwashing = parseInt(document.getElementById('dishwashing').value) || 0;

  const showerWater = showers * 10;
  const toiletWater = toilet * 6;
  const washingWater = washing * 50 / 7;
  const dishwashingWater = dishwashing * 8;

  const dailyUsage = showerWater + toiletWater + (washingWater / 7) + dishwashingWater;
  const weeklyUsage = dailyUsage * 7;

  document.getElementById('daily-usage').innerText = Math.round(dailyUsage);
  document.getElementById('weekly-usage').innerText = Math.round(weeklyUsage);
}
