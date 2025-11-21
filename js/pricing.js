// Pricing Page ROI Calculator

document.addEventListener('DOMContentLoaded', function() {
    const missedCallsSlider = document.getElementById('missed-calls-pricing');
    const ticketSizeSlider = document.getElementById('ticket-size-pricing');
    const missedCallsValue = document.getElementById('missed-calls-value-pricing');
    const ticketSizeValue = document.getElementById('ticket-size-value-pricing');
    const monthlyLost = document.getElementById('monthly-lost-pricing');
    const monthlySavings = document.getElementById('monthly-savings');
    const roiPercentage = document.getElementById('roi-percentage');

    if (!missedCallsSlider || !ticketSizeSlider) return;

    function calculateROI() {
        const missedCalls = parseInt(missedCallsSlider.value);
        const ticketSize = parseInt(ticketSizeSlider.value);
        const shopBookerCost = 797;

        // Update display values
        missedCallsValue.textContent = missedCalls;
        ticketSizeValue.textContent = ticketSize.toLocaleString();

        // Calculate lost revenue
        const weeklyLost = missedCalls * ticketSize;
        const monthlyLostValue = weeklyLost * 4;

        // Calculate savings and ROI
        const savingsValue = monthlyLostValue - shopBookerCost;
        const roiValue = Math.floor((savingsValue / shopBookerCost) * 100);

        // Update DOM
        if (monthlyLost) {
            monthlyLost.textContent = monthlyLostValue.toLocaleString();
        }
        if (monthlySavings) {
            monthlySavings.textContent = savingsValue.toLocaleString();
        }
        if (roiPercentage) {
            roiPercentage.textContent = roiValue.toLocaleString();
        }
    }

    // Event listeners
    missedCallsSlider.addEventListener('input', calculateROI);
    ticketSizeSlider.addEventListener('input', calculateROI);

    // Initial calculation
    calculateROI();
});
