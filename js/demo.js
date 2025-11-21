// Demo Page Interactive Functionality

// Demo scenarios with conversation scripts
const demoScenarios = {
    appointment: {
        title: "Booking New Appointment",
        messages: [
            { type: "ai", text: "Good afternoon! Thanks for calling Mike's Auto Repair. This is Sarah. How can I help you today?" },
            { type: "customer", text: "Hi, my check engine light came on this morning. Can I get it looked at?" },
            { type: "ai", text: "Of course! I'd be happy to help you with that. We can run a full diagnostic to see what's triggering that light. When would work best for you?" },
            { type: "customer", text: "How about tomorrow?" },
            { type: "ai", text: "Let me check our availability for tomorrow... I have openings at 10:00 AM, 2:00 PM, or 4:30 PM. Which time works better for you?" },
            { type: "customer", text: "10 AM would be perfect." },
            { type: "ai", text: "Perfect! I've got you scheduled for tomorrow at 10:00 AM for a diagnostic. Can I get your name and phone number?" },
            { type: "customer", text: "It's John Martinez, 555-1234." },
            { type: "ai", text: "Great, John! You're all set for tomorrow at 10:00 AM. I'm sending you a confirmation text right now with all the details. Is there anything else I can help you with?" },
            { type: "customer", text: "That's all, thanks!" },
            { type: "ai", text: "Wonderful! We'll see you tomorrow at 10. Have a great day!" },
            { type: "system", text: "✅ Appointment booked and added to calendar\n📱 Confirmation SMS sent to customer\n📧 Email confirmation sent" }
        ]
    },
    reschedule: {
        title: "Rescheduling Appointment",
        messages: [
            { type: "ai", text: "Good morning! Thanks for calling Mike's Auto Repair. This is Sarah speaking. How can I help you?" },
            { type: "customer", text: "Hi, I have an appointment scheduled for today at 2 PM, but something came up. Can I reschedule?" },
            { type: "ai", text: "No problem at all! Let me pull up your appointment... I see you're scheduled for an oil change today at 2:00 PM. When would work better for you?" },
            { type: "customer", text: "Could I come in next week instead?" },
            { type: "ai", text: "Absolutely! Let me check next week's availability... I have Monday at 9:00 AM, Tuesday at 3:00 PM, or Thursday at 11:00 AM. What works best?" },
            { type: "customer", text: "Tuesday at 3 works great." },
            { type: "ai", text: "Perfect! I've moved your appointment to next Tuesday at 3:00 PM. You'll receive an updated confirmation text and email shortly. Anything else I can help with?" },
            { type: "customer", text: "No, that's it. Thanks!" },
            { type: "ai", text: "You're welcome! See you next Tuesday!" },
            { type: "system", text: "✅ Appointment rescheduled in calendar\n📱 Updated confirmation sent\n🔔 Reminder set for Tuesday" }
        ]
    },
    inquiry: {
        title: "General Service Inquiry",
        messages: [
            { type: "ai", text: "Thanks for calling Mike's Auto Repair! This is Sarah. How can I help you today?" },
            { type: "customer", text: "Hey, do you guys do brake work?" },
            { type: "ai", text: "Yes, we absolutely do brake work! We handle everything from brake pad replacement to full brake system overhauls. What's going on with your brakes?" },
            { type: "customer", text: "They've been squeaking lately. How much would it cost to fix?" },
            { type: "ai", text: "Brake squeaking is usually worn brake pads. A standard brake pad replacement typically runs between $150 to $300 per axle, depending on your vehicle. We'd need to inspect them to give you an exact quote. Would you like to schedule an inspection?" },
            { type: "customer", text: "Yeah, let's do that. When are you available?" },
            { type: "ai", text: "I can get you in this Thursday at 1:00 PM or Friday morning at 10:00 AM. Which works better?" },
            { type: "customer", text: "Friday at 10 works for me." },
            { type: "ai", text: "Perfect! I have you down for Friday at 10:00 AM for a brake inspection. Can I get your name and phone number?" },
            { type: "customer", text: "Sure, it's David Chen, 555-9876." },
            { type: "ai", text: "Excellent, David! You're all set for Friday at 10 AM. We'll inspect your brakes and give you an accurate quote. Confirmation is on its way to your phone!" },
            { type: "system", text: "✅ Inspection appointment booked\n📱 Confirmation sent\n💰 Service inquiry tracked for follow-up" }
        ]
    },
    'after-hours': {
        title: "After Hours Emergency",
        messages: [
            { type: "ai", text: "Thanks for calling Mike's Auto Repair! This is Sarah. How can I help you?" },
            { type: "customer", text: "Hi, I know you're closed, but I was hoping to schedule something for tomorrow. My car won't start." },
            { type: "ai", text: "I'm here 24/7 to help! I'm sorry to hear about your car. A no-start issue could be the battery, starter, or alternator. Let's get you scheduled for first thing tomorrow morning. Does 8:00 AM work?" },
            { type: "customer", text: "That would be perfect, actually." },
            { type: "ai", text: "Great! Will you be able to get the car to our shop, or do you need a tow?" },
            { type: "customer", text: "I'll probably need a tow." },
            { type: "ai", text: "No problem! We work with reliable towing services. I can have them pick up your car in the morning and bring it straight to us. Can I get your name, address, and phone number?" },
            { type: "customer", text: "It's Maria Lopez, 123 Oak Street, 555-4567." },
            { type: "ai", text: "Perfect, Maria! You're scheduled for 8:00 AM tomorrow. I'll coordinate with the towing company and they'll call you 30 minutes before arrival. You'll get a confirmation text with all the details. Is your car at that Oak Street address?" },
            { type: "customer", text: "Yes, it is." },
            { type: "ai", text: "Excellent! We'll take care of everything. You'll hear from the tow company in the morning, and we'll diagnose your car as soon as it arrives. Anything else I can help with?" },
            { type: "customer", text: "No, that's great. Thank you!" },
            { type: "ai", text: "You're very welcome, Maria! We'll get your car fixed up tomorrow!" },
            { type: "system", text: "✅ Appointment booked for 8:00 AM\n🚗 Towing service coordinated\n📱 Confirmation and tow details sent\n🕐 Created after-hours call log" }
        ]
    }
};

let currentScenario = 'appointment';
let messageIndex = 0;
let demoInterval = null;

// Initialize demo functionality
document.addEventListener('DOMContentLoaded', function() {
    const scenarioBtns = document.querySelectorAll('.demo-scenario-btn');
    const startBtn = document.getElementById('start-demo-btn');
    const resetBtn = document.getElementById('reset-demo-btn');

    // Scenario button clicks
    scenarioBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            scenarioBtns.forEach(b => {
                b.classList.remove('active', 'bg-secondary-orange', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-700');
            });
            this.classList.remove('bg-gray-200', 'text-gray-700');
            this.classList.add('active', 'bg-secondary-orange', 'text-white');

            // Set scenario and reset
            currentScenario = this.getAttribute('data-scenario');
            resetDemo();
        });
    });

    // Start demo button
    if (startBtn) {
        startBtn.addEventListener('click', startDemo);
    }

    // Reset demo button
    if (resetBtn) {
        resetBtn.addEventListener('click', resetDemo);
    }

    // Initialize first scenario
    resetDemo();
});

function startDemo() {
    const startBtn = document.getElementById('start-demo-btn');
    const resetBtn = document.getElementById('reset-demo-btn');

    // Hide start button, show reset
    startBtn.classList.add('hidden');
    resetBtn.classList.remove('hidden');

    // Start playing messages
    playNextMessage();
}

function playNextMessage() {
    const scenario = demoScenarios[currentScenario];
    const conversationDisplay = document.getElementById('conversation-display');

    if (messageIndex < scenario.messages.length) {
        const message = scenario.messages[messageIndex];
        addMessageToDisplay(message);
        messageIndex++;

        // Schedule next message
        const delay = message.type === 'system' ? 1500 : 2000;
        demoInterval = setTimeout(playNextMessage, delay);
    } else {
        // Demo complete
        demoInterval = null;
    }
}

function addMessageToDisplay(message) {
    const conversationDisplay = document.getElementById('conversation-display');
    const messageDiv = document.createElement('div');

    if (message.type === 'ai') {
        messageDiv.className = 'mb-4 flex items-start';
        messageDiv.innerHTML = `
            <div class="bg-primary-blue text-white w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <i class="fas fa-robot"></i>
            </div>
            <div class="bg-blue-100 rounded-lg rounded-tl-none p-4 max-w-md">
                <div class="text-xs text-primary-blue font-semibold mb-1">ShopBooker AI</div>
                <div class="text-gray-800">${message.text}</div>
            </div>
        `;
    } else if (message.type === 'customer') {
        messageDiv.className = 'mb-4 flex items-start justify-end';
        messageDiv.innerHTML = `
            <div class="bg-gray-200 rounded-lg rounded-tr-none p-4 max-w-md">
                <div class="text-xs text-gray-600 font-semibold mb-1 text-right">Customer</div>
                <div class="text-gray-800">${message.text}</div>
            </div>
            <div class="bg-gray-400 text-white w-10 h-10 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                <i class="fas fa-user"></i>
            </div>
        `;
    } else if (message.type === 'system') {
        messageDiv.className = 'mb-4';
        messageDiv.innerHTML = `
            <div class="bg-green-50 border-2 border-green-300 rounded-lg p-4 text-center">
                <div class="text-green-700 font-semibold mb-2">
                    <i class="fas fa-check-circle mr-2"></i>Call Complete
                </div>
                <div class="text-gray-700 text-sm whitespace-pre-line">${message.text}</div>
            </div>
        `;
    }

    conversationDisplay.appendChild(messageDiv);

    // Scroll to bottom
    conversationDisplay.scrollTop = conversationDisplay.scrollHeight;
}

function resetDemo() {
    // Clear any running interval
    if (demoInterval) {
        clearTimeout(demoInterval);
        demoInterval = null;
    }

    // Reset message index
    messageIndex = 0;

    // Clear conversation display
    const conversationDisplay = document.getElementById('conversation-display');
    conversationDisplay.innerHTML = `
        <div class="text-center text-gray-500 py-12">
            <i class="fas fa-phone-volume text-6xl text-gray-300 mb-4"></i>
            <p class="text-lg">Click "Start Demo" to begin the conversation</p>
        </div>
    `;

    // Update scenario title
    const scenarioTitle = document.getElementById('demo-scenario-title');
    scenarioTitle.textContent = demoScenarios[currentScenario].title;

    // Show start button, hide reset
    const startBtn = document.getElementById('start-demo-btn');
    const resetBtn = document.getElementById('reset-demo-btn');
    startBtn.classList.remove('hidden');
    resetBtn.classList.add('hidden');
}
