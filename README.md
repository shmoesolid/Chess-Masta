# Chess-Masta

## Description

This is UTSA Coding Bootcamp's final project.  It is an interactive multiplayer chess game powered by the CheSSk library (written by Shane Koehler) and runs the game logic.  Chess games are server authoritative and can be password-locked so you can limit who is allowed to join your game. It utilizes JSON Web Token for user authentication and bcrypt for password hashing.

To play, simply make an account or login to get started.  Head over to the games page and you can either create a new game to challenge someone or view a list of games below.  Join a game while another player is actively playing and watch their moves update dynamically utilizing node package socket.io.  You can also chat live with them as you play.  Don't forget to check out the user profile to customize your chess board to your liking.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- Deployed at: 
    * https://chess-masta-test.herokuapp.com/ (pre-release test deployments)
    * https://chess-masta.herokuapp.com/

- Screenshots:
    * https://shmoesolid.github.io/chess-masta/media/ss1.png
    * https://shmoesolid.github.io/chess-masta/media/ss2.png
    * https://shmoesolid.github.io/chess-masta/media/ss3.png
    * https://shmoesolid.github.io/chess-masta/media/ss4.png
    * https://shmoesolid.github.io/chess-masta/media/ss5.png
    * https://shmoesolid.github.io/chess-masta/media/ss6.png

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## Installation

- Install Node.js
- Extract this project to a folder
- Navigate to this project's folder (with server.js)
- Run command "npm install" (without quotes)

## Usage

- Run command "npm start" (without quotes)
- Visit localhost port 3000 (default)
- If hosting server run "node server.js" (without quotes)

## Credits

Journey Cruz and Shane Koehler

## License

NONE
