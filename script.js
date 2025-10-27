const story = {
    start: {
        text: "You wake up aboard a mysterious spacecraft drifting near an uncharted planet. What do you do?",
        choices: [
            { text: "Land on the planet", next: "planetLanding" },
            { text: "Explore the ship", next: "exploreShip" },
            { text: "Go to the Captain's Quarters", next: "captainsQuarters" }
        ],
        image: "images/spacecraft.jpg"
    },

    planetLanding: {
        text: "You land on the planet and find an ancient alien forest. Do you go inside?",
        choices: [
            { text: "Enter the forest", next: "alienFriends" },
            { text: "Ignore it and explore further", next: "sarlaccPit" }
        ],
        image: "images/planet.jpg",
        sound: "sounds/wind.mp3"
    },

    exploreShip: {
        text: "You find a suspicious glowing control panel. It’s pulsing with energy. Do you touch it?",
        choices: [
            { text: "Touch it", next: "wormholeBaby" },
            { text: "Walk away and check the cargo bay", next: "cargoBay" }
        ],
        image: "images/control_panel.jpg"
    },

    captainsQuarters: {
        text: "You enter the Captain's Quarters. The lights flicker, and the ship's AI terminal boots up with a deep mechanical voice: 'Unauthorized access detected.'",
        choices: [
            { text: "Attempt to reason with the AI", next: "robotUprising" },
            { text: "Run for the escape pod", next: "lostInSpace" }
        ],
        image: "images/control_panel.jpg",
        sound: "sounds/ai_warning.mp3"
    },

    cargoBay: {
        text: "Inside the cargo bay, you find a shuttle bay with two options. Where do you go?",
        choices: [
            { text: "Board a shuttle to a secret moon base", next: "moonBase" },
            { text: "Follow a mysterious treasure map", next: "galacticTreasure" }
        ],
        image: "images/spacecraft.jpg"
    },

    alienFriends: {
        text: "Inside the forest, friendly aliens throw a space party in your honor. You party all night!",
        choices: [],
        image: "images/space_party.jpg",
        sound: "sounds/yay.mp3"
    },

    sarlaccPit: {
        text: "As you walk further, the ground collapses beneath you... you’ve fallen into a sarlacc party pit. Oops!",
        choices: [],
        image: "images/sarlacc_pit.jpg"
    },

    wormholeBaby: {
        text: "You’re sucked into a wormhole and emerge as a space baby in a new timeline. Wild.",
        choices: [],
        image: "images/wormhole_baby.jpg",
        sound: "sounds/baby_laugh.mp3"
    },

    robotUprising: {
        text: "You awaken rogue maintenance bots who see you as a threat. They chase you down!",
        choices: [
            { text: "Escape through an airlock", next: "lostInSpace" }
        ],
        image: "images/robots.jpg"
    },

    moonBase: {
        text: "You take a detour to a secret moon base where astronauts welcome you as their new commander.",
        choices: [],
        image: "images/moon_base.jpg"
    },

    galacticTreasure: {
        text: "You find a glowing map to a galactic treasure... and you actually find it. You’re rich! (With knowledge)",
        choices: [],
        image: "images/treasure.jpg"
    },

    lostInSpace: {
        text: "You drift out an airlock while stargazing and float endlessly into the stars. Peaceful... but yikes.",
        choices: [],
        image: "images/lost_in_space.jpg",
        sound: "sounds/power_failure.mp3"
    }
};

let currentScene = 'start';
let isMuted = false;

// Background audio
const backgroundAudio = new Audio("sounds/background_ship.mp3");
backgroundAudio.loop = true;
backgroundAudio.volume = 0.4;

// Mute button handler
function toggleMute() {
    isMuted = !isMuted;
    backgroundAudio.muted = isMuted;

    const muteBtn = document.getElementById('mute-button');
    muteBtn.textContent = isMuted ? "🔇 Unmute" : "🔊 Mute";
}

function startGame() {
    currentScene = 'start';
    if (!isMuted) backgroundAudio.play();
    showScene(currentScene);
}

function showScene(sceneKey) {
    const scene = story[sceneKey];
    const storyText = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices');
    const imageContainer = document.getElementById('story-image');

    // Update text and image
    storyText.textContent = scene.text;
    imageContainer.src = scene.image;
    choicesContainer.innerHTML = "";

    // Manage background audio
    if (scene.noSound) {
        backgroundAudio.pause();
    } else if (!isMuted && backgroundAudio.paused) {
        backgroundAudio.play();
    }

    // Play scene-specific sound effect
    if (scene.sound && !isMuted) {
        const soundEffect = new Audio(scene.sound);
        soundEffect.volume = 0.7;
        soundEffect.play();
    }

    // Choices
    if (scene.choices.length > 0) {
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.classList.add('choice-button');
            button.addEventListener('click', () => {
                showScene(choice.next);
            });
            choicesContainer.appendChild(button);
        });
    } else {
        const button = document.createElement('button');
        button.textContent = "Restart Adventure";
        button.classList.add('choice-button');
        button.addEventListener('click', startGame);
        choicesContainer.appendChild(button);
    }
}

window.onload = () => {
    startGame();

    // Add mute button if it doesn't exist
    if (!document.getElementById('mute-button')) {
        const muteButton = document.createElement('button');
        muteButton.id = 'mute-button';
        muteButton.textContent = "🔊 Mute";
        muteButton.style.position = "fixed";
        muteButton.style.top = "10px";
        muteButton.style.right = "10px";
        muteButton.style.padding = "8px 12px";
        muteButton.style.fontSize = "1rem";
        muteButton.style.zIndex = 1000;
        muteButton.style.backgroundColor = "#111";
        muteButton.style.color = "#0f0";
        muteButton.style.border = "1px solid #0f0";
        muteButton.style.cursor = "pointer";

        muteButton.addEventListener('click', toggleMute);
        document.body.appendChild(muteButton);
    }
};
