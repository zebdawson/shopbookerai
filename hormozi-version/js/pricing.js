// Pricing Page ROI Calculator for ShopBooker AI
// Calculates lost revenue and ROI in real-time

document.addEventListener('DOMContentLoaded', function() {
    initPricingCalculator();
});

function initPricingCalculator() {
    const missedCallsSlider = document.getElementById('missedCallsSlider');
    const avgTicketSlider = document.getElementById('avgTicketSlider');
    const missedCallsValue = document.getElementById('missedCallsValue');
    const avgTicketValue = document.getElementById('avgTicketValue');
    const monthlyLost = document.getElementById('monthlyLost');
    const monthlySavings = document.getElementById('monthlySavings');
    const roiPercentage = document.getElementById('roiPercentage');
    const roiMultiplier = document.getElementById('roiMultiplier');
    const yearlySaved = document.getElementById('yearlySaved');
    const yearlyProfit = document.getElementById('yearlyProfit');

    if (!missedCallsSlider || !avgTicketSlider) {
        console.log('Pricing calculator elements not found on this page');
        return;
    }

    const shopBookerCost = 797;
    const yearlyShopBookerCost = shopBookerCost * 12; // $9,564

    function calculateROI() {
        const missedCalls = parseInt(missedCallsSlider.value);
        const avgTicket = parseInt(avgTicketSlider.value);

        // Update slider value displays
        if (missedCallsValue) {
            missedCallsValue.textContent = missedCalls;
        }

        if (avgTicketValue) {
            avgTicketValue.textContent = '$' + avgTicket.toLocaleString();
        }

        // Calculate lost revenue
        const weeklyLost = missedCalls * avgTicket;
        const monthlyLostValue = weeklyLost * 4;
        const yearlyLostValue = monthlyLostValue * 12;

        // Calculate savings (what you recover by using ShopBooker AI)
        const monthlySavingsValue = monthlyLostValue - shopBookerCost;
        const yearlySavingsValue = yearlyLostValue;
        const yearlyProfitValue = yearlyLostValue - yearlyShopBookerCost;

        // Calculate ROI percentage
        const roiValue = Math.floor((monthlySavingsValue / shopBookerCost) * 100);
        const roiMultiplierValue = Math.floor(roiValue / 100);

        // Update DOM with animations
        if (monthlyLost) {
            animateNumber(monthlyLost, 0, monthlyLostValue, 500);
        }

        if (monthlySavings) {
            animateNumber(monthlySavings, 0, monthlySavingsValue, 500);
        }

        if (roiPercentage) {
            animateNumber(roiPercentage, 0, roiValue, 500);
        }

        if (roiMultiplier) {
            roiMultiplier.textContent = roiMultiplierValue;
        }

        if (yearlySaved) {
            animateNumber(yearlySaved, 0, yearlyLostValue, 500);
        }

        if (yearlyProfit) {
            animateNumber(yearlyProfit, 0, yearlyProfitValue, 500);
        }
    }

    function animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(function() {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Event listeners
    missedCallsSlider.addEventListener('input', calculateROI);
    avgTicketSlider.addEventListener('input', calculateROI);

    // Initial calculation
    calculateROI();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initPricingCalculator };
}
