<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Do Not Click</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            background-color: #0a0a0a;
            color: #c9c9c9;
            font-family: 'Courier New', monospace;
            line-height: 1.6;
            overflow: hidden;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: default;
            position: relative;
        }
        
        .container {
            text-align: center;
            z-index: 10;
            padding: 2rem;
            background-color: rgba(10, 10, 10, 0.7);
            border-radius: 10px;
            max-width: 600px;
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #8a0303;
            text-shadow: 0 0 5px #ff0000;
            letter-spacing: 2px;
        }
        
        p {
            margin-bottom: 2rem;
            font-size: 1.2rem;
        }
        
        .warning {
            color: #8a0303;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { opacity: 0.7; }
            50% { opacity: 1; }
            100% { opacity: 0.7; }
        }
        
        #horror-button {
            background-color: #1a0000;
            color: #8a0303;
            border: 2px solid #8a0303;
            padding: 15px 30px;
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
            border-radius: 5px;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
        }
        
        #horror-button:hover {
            background-color: #2a0000;
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
        }
        
        #click-count {
            margin-top: 20px;
            font-size: 1.2rem;
        }
        
        /* Horror elements */
        .blood-drop {
            position: absolute;
            background-color: #8a0303;
            width: 5px;
            height: 10px;
            opacity: 0;
            z-index: 5;
        }
        
        .face {
            position: absolute;
            width: 150px;
            height: 150px;
            background-size: cover;
            opacity: 0;
            z-index: 8;
            pointer-events: none;
        }
        
        .message {
            position: absolute;
            color: #8a0303;
            font-size: 1.5rem;
            opacity: 0;
            z-index: 9;
            text-align: center;
            pointer-events: none;
            text-shadow: 0 0 5px black;
        }
        
        .veins {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
            opacity: 0;
        }
        
        .vein {
            position: absolute;
            background: linear-gradient(to right, transparent, #8a0303, transparent);
            width: 2px;
            height: 100px;
            transform-origin: bottom center;
        }
        
        .flicker {
            animation: flicker 0.5s infinite;
        }
        
        @keyframes flicker {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>DO NOT PRESS THE BUTTON</h1>
        <p>Seriously. Nothing good will come of this.</p>
        <p class="warning">You've been warned.</p>
        <button id="horror-button">I DARE YOU</button>
        <div id="click-count">Times clicked: 0</div>
    </div>

    <div class="veins"></div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const button = document.getElementById('horror-button');
            const clickCountElement = document.getElementById('click-count');
            const body = document.body;
            const veinsContainer = document.querySelector('.veins');
            
            let clickCount = 0;
            let messageCount = 0;
            
            // Create veins for background effect
            function createVeins() {
                for (let i = 0; i < 30; i++) {
                    const vein = document.createElement('div');
                    vein.classList.add('vein');
                    
                    const left = Math.random() * 100;
                    const rotation = Math.random() * 360;
                    const height = 50 + Math.random() * 150;
                    
                    vein.style.left = `${left}%`;
                    vein.style.transform = `rotate(${rotation}deg)`;
                    vein.style.height = `${height}px`;
                    vein.style.opacity = Math.random() * 0.5;
                    
                    veinsContainer.appendChild(vein);
                }
            }
            
            createVeins();
            
            // Show blood drops
            function showBloodDrops() {
                for (let i = 0; i < clickCount * 2; i++) {
                    setTimeout(() => {
                        const bloodDrop = document.createElement('div');
                        bloodDrop.classList.add('blood-drop');
                        
                        const left = Math.random() * 100;
                        const top = Math.random() * 100;
                        
                        bloodDrop.style.left = `${left}%`;
                        bloodDrop.style.top = `${top}%`;
                        
                        document.body.appendChild(bloodDrop);
                        
                        // Animate blood drop
                        setTimeout(() => {
                            bloodDrop.style.opacity = '0.8';
                            bloodDrop.style.transition = 'all 2s';
                            bloodDrop.style.transform = 'translateY(300px)';
                            
                            // Remove after animation
                            setTimeout(() => {
                                bloodDrop.remove();
                            }, 2000);
                        }, 100);
                    }, i * 200);
                }
            }
            
            // Show creepy face
            function showFace() {
                const face = document.createElement('div');
                face.classList.add('face');
                
                // Random position
                const left = 10 + Math.random() * 80;
                const top = 10 + Math.random() * 80;
                
                face.style.left = `${left}%`;
                face.style.top = `${top}%`;
                
                // Random face type (using CSS gradients as placeholders)
                const faceType = Math.floor(Math.random() * 3);
                switch(faceType) {
                    case 0:
                        face.style.backgroundImage = 'radial-gradient(circle, #000000 20%, transparent 20%), radial-gradient(circle, #000000 20%, transparent 20%), linear-gradient(to bottom, #000000, #000000)';
                        break;
                    case 1:
                        face.style.backgroundImage = 'radial-gradient(ellipse at 30% 30%, #000000 10%, transparent 10%), radial-gradient(ellipse at 70% 30%, #000000 10%, transparent 10%), linear-gradient(to bottom, #000000, #000000)';
                        break;
                    case 2:
                        face.style.backgroundColor = '#000000';
                        face.style.borderRadius = '50%';
                        face.style.boxShadow = '0 0 30px #8a0303';
                        break;
                }
                
                document.body.appendChild(face);
                
                // Show face
                setTimeout(() => {
                    face.style.opacity = '0.8';
                    face.style.transition = 'opacity 1s';
                }, 100);
                
                // Hide face after a moment
                setTimeout(() => {
                    face.style.opacity = '0';
                    
                    // Remove after fade out
                    setTimeout(() => {
                        face.remove();
                    }, 1000);
                }, 1500);
            }
            
            // Show creepy message
            function showMessage() {
                const messages = [
                    "STOP CLICKING",
                    "HE'S WATCHING",
                    "THEY'RE COMING",
                    "BEHIND YOU",
                    "TOO LATE",
                    "IT'S INSIDE NOW",
                    "RUN WHILE YOU CAN",
                    "DON'T TURN AROUND",
                    "I SEE YOU",
                    "WE'RE ALL HERE"
                ];
                
                const message = document.createElement('div');
                message.classList.add('message');
                
                message.textContent = messages[messageCount % messages.length];
                messageCount++;
                
                // Random position
                const left = 10 + Math.random() * 60;
                const top = 10 + Math.random() * 60;
                
                message.style.left = `${left}%`;
                message.style.top = `${top}%`;
                
                document.body.appendChild(message);
                
                // Show message
                setTimeout(() => {
                    message.style.opacity = '1';
                    message.style.transition = 'opacity 0.5s';
                }, 100);
                
                // Hide message after a moment
                setTimeout(() => {
                    message.style.opacity = '0';
                    
                    // Remove after fade out
                    setTimeout(() => {
                        message.remove();
                    }, 1000);
                }, 2000);
            }
            
            // Flicker lights
            function flickerLights() {
                body.classList.add('flicker');
                
                setTimeout(() => {
                    body.classList.remove('flicker');
                }, 500);
            }
            
            // Show veins effect
            function showVeins() {
                veinsContainer.style.opacity = '0.3';
                veinsContainer.style.transition = 'opacity 2s';
                
                setTimeout(() => {
                    veinsContainer.style.opacity = '0';
                }, 2000);
            }
            
            // Handle button click
            button.addEventListener('click', function() {
                clickCount++;
                clickCountElement.textContent = `Times clicked: ${clickCount}`;
                
                // Change button text occasionally
                if (clickCount % 5 === 0) {
                    const buttonTexts = [
                        "WHY ARE YOU STILL CLICKING?",
                        "PLEASE STOP",
                        "YOU'RE MAKING IT WORSE",
                        "IT'S GETTING ANGRY",
                        "LAST WARNING",
                        "TOO LATE NOW",
                        "IT'S TOO LATE",
                        "JUST RUN"
                    ];
                    
                    button.textContent = buttonTexts[Math.floor(Math.random() * buttonTexts.length)];
                }
                
                // Gradually increase horror elements based on click count
                if (clickCount > 3) {
                    showBloodDrops();
                }
                
                if (clickCount > 5) {
                    flickerLights();
                }
                
                if (clickCount > 7 && clickCount % 2 === 0) {
                    showFace();
                }
                
                if (clickCount > 10) {
                    showVeins();
                }
                
                if (clickCount > 12 && clickCount % 3 === 0) {
                    showMessage();
                }
                
                // After many clicks
                if (clickCount > 20) {
                    button.textContent = "IT'S TOO LATE TO STOP";
                    button.style.backgroundColor = "#3a0000";
                    button.style.boxShadow = "0 0 20px #ff0000";
                }
            });
        });
    </script>
</body>
</html>