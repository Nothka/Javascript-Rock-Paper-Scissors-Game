
function computerPlay() {
  const options = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function playRound(playerSelection, computerSelection) {
  const player = playerSelection.toLowerCase();
  const computer = computerSelection.toLowerCase();

  if (player === computer) {
    return "It's a tie!";
  }

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return `You Win! ${capitalize(player)} beats ${capitalize(computer)}`;
  } else {
    return `You Lose! ${capitalize(computer)} beats ${capitalize(player)}`;
  }
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function game() {
  let playerScore = 0;
  let computerScore = 0;
  let roundsPlayed = 0;

  console.log("💀 The Evil AI challenges you to a game of Rock, Paper, Scissors!");
  console.log("First to win the majority of 5 rounds will control the future...");
  console.log("Type your choice each round: Rock, Paper, or Scissors.");
  console.log("Let the battle begin!");
  console.log("---------------------------------------");

  while (roundsPlayed < 5) {
    let playerInput = prompt("Choose Rock, Paper or Scissors:");

    if (!playerInput) {
      console.log("⚠️ No input provided. Try again.");
      continue;
    }

    playerInput = playerInput.trim().toLowerCase();
    if (!["rock", "paper", "scissors"].includes(playerInput)) {
      console.log("❌ Invalid input! Please type Rock, Paper or Scissors.");
      continue;
    }

    const computerInput = computerPlay();
    const result = playRound(playerInput, computerInput);

    console.log(`🎮 Round ${roundsPlayed + 1}`);
    console.log(`🧍 You chose: ${capitalize(playerInput)}`);
    console.log(`🤖 Evil AI chose: ${capitalize(computerInput)}`);
    console.log(`⚔️ ${result}`);
    console.log("---------------------------------------");

    if (result.startsWith("You Win")) {
      playerScore++;
    } else if (result.startsWith("You Lose")) {
      computerScore++;
    }
    
    roundsPlayed++;
  }

  console.log("🏁 Game Over!");
  console.log(`📊 Final Score => You: ${playerScore} | Evil AI: ${computerScore}`);

  if (playerScore > computerScore) {
    console.log("🎉 Victory! You defeated the Evil AI! Humanity is saved!");
  } else if (computerScore > playerScore) {
    console.log("💀 The Evil AI wins! The machines rise...");
  } else {
    console.log("🤝 It's a tie! A temporary peace settles in.");
  }
}

game();
