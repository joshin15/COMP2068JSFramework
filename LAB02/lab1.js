const prompt = require('prompt');

// Function to get user selection
function getUserSelection() {
  return new Promise((resolve, reject) => {
    prompt.get(['userSelection'], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.userSelection.toUpperCase());
      }
    });
  });
}

// Function to generate computer selection
function getComputerSelection() {
  const randomValue = Math.random();
  if (randomValue <= 0.34) {
    return 'PAPER';
  } else if (randomValue <= 0.67) {
    return 'SCISSORS';
  } else {
    return 'ROCK';
  }
}

// Function to determine the winner
function determineWinner(userSelection, computerSelection) {
  if (userSelection === computerSelection) {
    return "It's a tie";
  } else if (
    (userSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
    (userSelection === 'PAPER' && computerSelection === 'ROCK') ||
    (userSelection === 'SCISSORS' && computerSelection === 'PAPER')
  ) {
    return 'User Wins';
  } else {
    return 'Computer Wins';
  }
}

// Main function
async function playGame() {
  try {
    // Get user selection
    const userSelection = await getUserSelection();
    console.log(`User Selection: ${userSelection}`);

    // Get computer selection
    const computerSelection = getComputerSelection();
    console.log(`Computer Selection: ${computerSelection}`);

    // Determine the winner
    const result = determineWinner(userSelection, computerSelection);
    console.log(`Result: ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Start the game
playGame();
