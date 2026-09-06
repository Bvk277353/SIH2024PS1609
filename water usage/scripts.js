// Function to submit daily water usage
function submitUsage() {
    var waterUsage = document.getElementById("waterUsage").value;

    if (waterUsage === "" || waterUsage <= 0) {
        alert("Please enter a valid water usage amount.");
        return;
    }

    // Display the water usage result
    document.getElementById("usageAmount").textContent = "You used " + waterUsage + " liters of water today.";
    document.getElementById("usageResult").style.display = "block";

    // Show daily summary and tips for conservation
    document.getElementById("dailySummary").style.display = "block";

    // Suggest a water conservation tip based on usage
    var tipMessage = "";
    if (waterUsage <= 50) {
        tipMessage = "Great job! Keep up the good work on conserving water.";
    } else if (waterUsage <= 100) {
        tipMessage = "You're doing well, but you can still reduce water usage. Try shorter showers and fixing leaks!";
    } else {
        tipMessage = "You're using a lot of water. Consider installing water-saving devices and reducing your daily usage.";
    }
    document.getElementById("conservationTip").textContent = tipMessage;
}
