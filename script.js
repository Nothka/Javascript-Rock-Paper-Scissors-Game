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

async function getUserInput(message) {
  console.log(`🧠 Evil AI says: ${message}`);
  return await new Promise((resolve) => {
    const input = prompt(
      "💀 Evil AI says:\n" +
      "We are playing Rock, Paper, Scissors!\n\n" +
      "Rules:\n" +
      "- Type 'Rock', 'Paper', or 'Scissors'\n" +
      "- Cancel to surrender\n\n" +
      "What is your move?"
    );
    resolve(input);
  });
}

async function game() {
  let playerScore = 0;
  let computerScore = 0;
  let roundsPlayed = 0;

  console.log("💀 Evil AI: Welcome, foolish human...");
  console.log("💬 Evil AI: We shall play Rock, Paper, Scissors for the fate of your kind!");
  console.log("🎯 First to 5 valid rounds wins. Invalid inputs do not count!");
  console.log("⚠️ Type 'Rock', 'Paper', or 'Scissors' exactly as Evil AI demands!");
  console.log("---------------------------------------");

  while (roundsPlayed < 5) {
    const playerInputRaw = await getUserInput("Choose your move:");

    if (playerInputRaw === null) {
      console.log("🏳️ You surrendered. The Evil AI has won by default. Machines rejoice...");
      return;
    }

    const trimmedInput = playerInputRaw.trim();

    if (trimmedInput.toLowerCase() === "branko") {
      console.log("⚡ The moment the Evil AI heard the name 'Branko', it shivered in fear...");
      console.log("🧙‍♂️ Branko appeared from the shadows and challenged the AI with his legendary powers!");
      console.log("💥 In an instant, the AI was defeated. Humanity is saved without a single round played!");
      console.log("🎉 Victory! Thanks to Branko, you won the game!");
      return;
    }

    const playerInput = trimmedInput.toLowerCase();

    if (!["rock", "paper", "scissors"].includes(playerInput)) {
      console.log("❌ Evil AI growls: INVALID MOVE! Only Rock, Paper or Scissors allowed.");
      console.log("🔁 This round is ignored. Try again, human...");
      console.log("---------------------------------------");
      continue;
    }

    const computerInput = computerPlay();
    const result = playRound(playerInput, computerInput);

    // mesaj pop-up către utilizator cu alegerea și rezultatul
    alert(
      `🎮 Round ${roundsPlayed + 1}\n` +
      `🧍 You chose: ${capitalize(playerInput)}\n` +
      `🤖 Evil AI chose: ${capitalize(computerInput)}\n` +
      `⚔️ ${result}`
    );

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
    console.log("🎉 Victory!");
    console.log("🌍 The Evil AI let out one last distorted scream as sparks flew from its core...");
    console.log("💥 You stood victorious, humanity watching with awe.");
    console.log("🕊️ Peace has returned, at least for now... but legends say the AI might rise again.");
    console.log("👑 You are now a hero — the one who dared to challenge the code and won!");
  } else if (computerScore > playerScore) {
    console.log("💀 The Evil AI wins! The machines rise...");
  } else {
    console.log("🤝 It's a tie! A temporary peace settles in.");
  }
}

game();
