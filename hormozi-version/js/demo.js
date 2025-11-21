// Interactive Demo Simulator for ShopBooker AI
// Handles scenario selection and conversation playback

document.addEventListener('DOMContentLoaded', function() {
    initDemo();
});

// Demo scenarios with full conversations
const scenarios = {
    booking: {
        title: 'New Appointment Booking',
        messages: [
            { type: 'customer', text: 'Hi, I need to get my brakes checked. They\'ve been making a squeaking sound.', delay: 0 },
            { type: 'ai', text: 'Hello! Thanks for calling. I can definitely help you with that brake inspection. Squeaking brakes should be looked at soon. What type of vehicle do you have?', delay: 1500 },
            { type: 'customer', text: 'It\'s a 2018 Honda Accord.', delay: 1200 },
            { type: 'ai', text: 'Perfect, 2018 Honda Accord. For a brake inspection and potential brake service, we typically allow 1-2 hours depending on what we find. When would work best for you?', delay: 1500 },
            { type: 'customer', text: 'Do you have anything available tomorrow afternoon?', delay: 1000 },
            { type: 'ai', text: 'Let me check our schedule... Yes! I have availability tomorrow at 2:00 PM or 3:30 PM. Which works better for you?', delay: 1800 },
            { type: 'customer', text: '2 PM works great.', delay: 800 },
            { type: 'ai', text: 'Excellent! I\'ve got you scheduled for tomorrow at 2:00 PM for a brake inspection on your 2018 Honda Accord. Can I get your name and phone number for our records?', delay: 1600 },
            { type: 'customer', text: 'Sure, it\'s John Smith, 555-123-4567.', delay: 1000 },
            { type: 'ai', text: 'Perfect, John. You\'re all set for tomorrow at 2:00 PM. I\'ll send you a text confirmation right now with our address and what to bring. Is there anything else I can help you with today?', delay: 2000 },
            { type: 'customer', text: 'No, that\'s it. Thank you!', delay: 800 },
            { type: 'ai', text: 'You\'re welcome, John! We look forward to seeing you tomorrow at 2:00 PM. Drive safely, and if your brakes get worse, please call us back immediately.', delay: 1500 },
            { type: 'system', text: '✓ Appointment booked • SMS confirmation sent • Customer added to calendar', delay: 1000 }
        ]
    },

    pricing: {
        title: 'Price Quote Request',
        messages: [
            { type: 'customer', text: 'Hi, how much do you charge for an oil change?', delay: 0 },
            { type: 'ai', text: 'Hello! Thanks for calling. Our oil change pricing depends on your vehicle type. What kind of vehicle do you have?', delay: 1200 },
            { type: 'customer', text: 'I have a 2020 Toyota Camry.', delay: 900 },
            { type: 'ai', text: 'Great! For a 2020 Toyota Camry, we offer two options: A conventional oil change is $49.95, or a full synthetic oil change is $79.95. Both include up to 5 quarts of oil, a new filter, and a complimentary multi-point inspection.', delay: 2200 },
            { type: 'customer', text: 'What\'s the difference between the two?', delay: 1000 },
            { type: 'ai', text: 'Excellent question! Synthetic oil lasts longer - about 7,500 miles compared to 3,000-5,000 for conventional. It also provides better engine protection, especially in extreme temperatures. For a 2020 Camry, we actually recommend synthetic since that\'s what Toyota specifies.', delay: 2500 },
            { type: 'customer', text: 'Okay, I\'ll go with the synthetic. When can I bring it in?', delay: 1200 },
            { type: 'ai', text: 'Perfect choice! Let me check our availability. We have openings today at 4:30 PM, tomorrow morning at 10:00 AM, or tomorrow afternoon at 2:00 PM. Which works best for you?', delay: 1800 },
            { type: 'customer', text: 'Tomorrow at 10 AM would be perfect.', delay: 900 },
            { type: 'ai', text: 'Excellent! I\'ve scheduled you for tomorrow at 10:00 AM for a full synthetic oil change on your 2020 Toyota Camry. The total will be $79.95. Can I get your name and phone number?', delay: 1800 },
            { type: 'customer', text: 'Sarah Johnson, 555-987-6543.', delay: 1000 },
            { type: 'ai', text: 'Perfect, Sarah. You\'re all set for tomorrow at 10:00 AM. You\'ll receive a text confirmation shortly. We\'ll have you in and out in about 45 minutes. Anything else I can help with?', delay: 2000 },
            { type: 'customer', text: 'Nope, that\'s all. Thanks!', delay: 700 },
            { type: 'ai', text: 'You\'re welcome, Sarah! See you tomorrow morning at 10:00 AM.', delay: 1200 },
            { type: 'system', text: '✓ Quote provided • Appointment booked • Customer educated on service options', delay: 1000 }
        ]
    },

    emergency: {
        title: 'Emergency Service Call',
        messages: [
            { type: 'customer', text: 'Help! My car won\'t start and I\'m stuck at work. What do I do?', delay: 0 },
            { type: 'ai', text: 'I can help you with that right away. First, let me get some quick information. When you turn the key, what happens? Do you hear clicking, nothing at all, or does the engine try to turn over?', delay: 1500 },
            { type: 'customer', text: 'It just clicks a few times but won\'t turn over.', delay: 1000 },
            { type: 'ai', text: 'That clicking sound usually indicates a battery or starter issue. Have you noticed any warning lights recently, or has it been slow to start lately?', delay: 1600 },
            { type: 'customer', text: 'Now that you mention it, it has been cranking slowly the past few mornings.', delay: 1100 },
            { type: 'ai', text: 'That definitely points to the battery. Here are your options: We can send our mobile service to jump-start you and test the battery on-site for $75, or if you have roadside assistance through your insurance, they can jump you and you can drive straight to us for a free battery test.', delay: 2500 },
            { type: 'customer', text: 'I think I have roadside assistance. Let me try that first.', delay: 1200 },
            { type: 'ai', text: 'Smart choice! Once they jump-start you, drive straight to our shop - it\'s important to keep the car running. We\'re at 123 Main Street, and I\'m keeping a bay open for you. We can test the battery and install a new one today if needed. What\'s your name?', delay: 2300 },
            { type: 'customer', text: 'Michael Rodriguez.', delay: 800 },
            { type: 'ai', text: 'Perfect, Michael. I\'ve flagged you as an emergency priority. Just head straight here after the jump, and we\'ll get you taken care of right away. If you have any issues getting the car started or it dies on the way, call us back immediately at this number.', delay: 2200 },
            { type: 'customer', text: 'Thank you so much! What\'s the address again?', delay: 900 },
            { type: 'ai', text: '123 Main Street, right off Highway 50. I\'m sending you a text with the address, our phone number, and a map link. We\'ll be ready for you!', delay: 1600 },
            { type: 'system', text: '✓ Emergency handled • Priority bay reserved • GPS directions sent via SMS', delay: 1200 }
        ]
    },

    reschedule: {
        title: 'Appointment Reschedule',
        messages: [
            { type: 'customer', text: 'Hi, I need to reschedule my appointment for tomorrow. Something came up at work.', delay: 0 },
            { type: 'ai', text: 'No problem at all, I can help you reschedule. Can I get your name or phone number to pull up your appointment?', delay: 1300 },
            { type: 'customer', text: 'It\'s under David Chen, 555-246-8101.', delay: 900 },
            { type: 'ai', text: 'Found it! I have you scheduled tomorrow at 3:00 PM for a brake service on your 2019 Ford F-150. When would you like to reschedule to?', delay: 1600 },
            { type: 'customer', text: 'Can we do sometime next week? Maybe Tuesday or Wednesday?', delay: 1000 },
            { type: 'ai', text: 'Absolutely. Let me check next week\'s availability... I have openings on Tuesday at 9:00 AM, 1:00 PM, or 4:00 PM. Wednesday I have 10:00 AM or 2:00 PM available. Any of those work for you?', delay: 2000 },
            { type: 'customer', text: 'Tuesday at 1:00 PM would be perfect.', delay: 900 },
            { type: 'ai', text: 'Perfect! I\'ve moved your brake service appointment from tomorrow to Tuesday at 1:00 PM. You\'ll receive a text confirmation with the new date and time. Is there anything else I can help you with?', delay: 1800 },
            { type: 'customer', text: 'That\'s it, thank you!', delay: 700 },
            { type: 'ai', text: 'You\'re welcome, David! See you Tuesday at 1:00 PM. Have a great rest of your day!', delay: 1200 },
            { type: 'system', text: '✓ Appointment rescheduled • Calendar updated • Confirmation sent', delay: 1000 }
        ]
    }
};

function initDemo() {
    const scenarioBtns = document.querySelectorAll('.scenario-btn');
    const playBtn = document.getElementById('playDemo');
    const pauseBtn = document.getElementById('pauseDemo');
    const resetBtn = document.getElementById('resetDemo');
    const chatMessages = document.getElementById('chatMessages');

    let currentScenario = 'booking';
    let isPlaying = false;
    let isPaused = false;
    let currentMessageIndex = 0;
    let timeouts = [];

    // Scenario selection
    scenarioBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            scenarioBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Set current scenario
            currentScenario = this.dataset.scenario;

            // Reset demo
            resetDemo();
        });
    });

    // Play button
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            if (!isPlaying) {
                playDemo();
            }
        });
    }

    // Pause button
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            pauseDemo();
        });
    }

    // Reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetDemo();
        });
    }

    function playDemo() {
        isPlaying = true;
        isPaused = false;
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');

        const scenario = scenarios[currentScenario];
        const messages = scenario.messages;

        function showNextMessage() {
            if (currentMessageIndex < messages.length && !isPaused) {
                const message = messages[currentMessageIndex];

                const timeout = setTimeout(() => {
                    addMessage(message.type, message.text);
                    currentMessageIndex++;

                    if (currentMessageIndex < messages.length) {
                        showNextMessage();
                    } else {
                        // Demo completed
                        isPlaying = false;
                        playBtn.classList.remove('hidden');
                        pauseBtn.classList.add('hidden');
                    }
                }, message.delay);

                timeouts.push(timeout);
            }
        }

        showNextMessage();
    }

    function pauseDemo() {
        isPaused = true;
        isPlaying = false;

        // Clear all pending timeouts
        timeouts.forEach(timeout => clearTimeout(timeout));
        timeouts = [];

        // Update buttons
        playBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');

        // Change play button text to "Continue"
        const playIcon = playBtn.querySelector('i');
        const playText = playBtn.childNodes[2];
        if (playText) {
            playBtn.innerHTML = '<i class="fas fa-play"></i> Continue';
        }
    }

    function resetDemo() {
        // Clear timeouts
        timeouts.forEach(timeout => clearTimeout(timeout));
        timeouts = [];

        // Reset state
        isPlaying = false;
        isPaused = false;
        currentMessageIndex = 0;

        // Clear messages
        chatMessages.innerHTML = '';

        // Reset buttons
        playBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
        playBtn.innerHTML = '<i class="fas fa-play"></i> Start Demo';

        // Add welcome message
        addMessage('system', `Ready to demonstrate: ${scenarios[currentScenario].title}`, false);
    }

    function addMessage(type, text, animate = true) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('demo-message', `demo-message-${type}`);

        if (animate) {
            messageDiv.classList.add('demo-message-entering');
        }

        let icon = '';
        let label = '';

        switch(type) {
            case 'customer':
                icon = '<i class="fas fa-user"></i>';
                label = 'Customer';
                break;
            case 'ai':
                icon = '<i class="fas fa-robot"></i>';
                label = 'ShopBooker AI';
                break;
            case 'system':
                icon = '<i class="fas fa-check-circle"></i>';
                label = 'System';
                break;
        }

        messageDiv.innerHTML = `
            <div class="demo-message-header">
                ${icon}
                <span>${label}</span>
            </div>
            <div class="demo-message-text">${text}</div>
        `;

        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Remove entering animation class after animation completes
        if (animate) {
            setTimeout(() => {
                messageDiv.classList.remove('demo-message-entering');
            }, 500);
        }
    }

    // Initialize with welcome message
    resetDemo();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initDemo };
}
