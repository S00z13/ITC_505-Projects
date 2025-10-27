const story = {
    start: {
        text: "You wake up aboard a mysterious spacecraft drifting near an uncharted planet. What do you do?",
        choices: [
            { text: "Land on the planet", next: "planetLanding" },
            { text: "Explore the ship", next: "exploreShip" }
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
        image: "images/planet.jpg"
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
        text: "You enter the Captain's Quartrs. The lights flicker, and the ship's AI terminal boots up with a deep machanical voice: 'Unauthorizede access detected.'",
        choices: [
            {text: "Attempt to reason with the AI", next: "robotUprising" },
            {txt: "Run for the escape pod", next: "lostInSpace"}
        ],
        image: "images/cotrol_panel.jpg"
    },
    
    }
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
        image: "images/space_party.jpg"
    },
    sarlaccPit: {
        text: "As you walk further, the ground collapses beneath you... you’ve fallen into a sarlacc party pit. Oops!",
        choices: [],
        image: "images/sarlacc_pit.jpg"
    },
    wormholeBaby: {
        text: "You’re sucked into a wormhole and emerge as a space baby in a new timeline. Wild.",
        choices: [],
        image: "images/wormhole_baby.jpg"
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
        image: "images/lost_in_space.jpg"
    }
};

let currentScene = 'start';

function startGame() {
    currentScene = 'start';
    showScene(currentScene);
}

function showScene(sceneKey) {
    const scene = story[sceneKey];
    const storyText = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices');
    const imageContainer = document.getElementById('story-image');

    // Update story text
    storyText.textContent = scene.text;

    // Clear previous choices
    choicesContainer.innerHTML = "";

    // Update image
    imageContainer.src = scene.image;

    // Create buttons for choices
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
        // End game scene
        const button = document.createElement('button');
        button.textContent = "Restart Adventure";
        button.classList.add('choice-button');
        button.addEventListener('click', startGame);
        choicesContainer.appendChild(button);
    }
}

window.onload = startGame;
