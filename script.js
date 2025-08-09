alert(
  "💡 Open your browser console to play!\n\n" +
  "Windows/Linux: Ctrl + Shift + J\n" +
  "Mac: Command + Option + J"
);

const MOVES = ["rock", "paper", "scissors"];

function capFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function toLowerTrim(s) {
  if (typeof s !== "string") return "";
  return s.trim().toLowerCase();
}


function getComputerMove() {
  const r = Math.random();
  const index = Math.floor(r * MOVES.length);
  return MOVES[index];
}

function figureOutRound(playerMove, computerMove) {
  if (playerMove === computerMove) {
    return { status: "tie", text: "It's a tie!" };
  }

  const playerBeatsComputer =
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper");

  if (playerBeatsComputer) {
    return {
      status: "win",
      text: `You Win! ${capFirst(playerMove)} beats ${capFirst(computerMove)}`,
    };
  }

  return {
    status: "lose",
    text: `You Lose! ${capFirst(computerMove)} beats ${capFirst(playerMove)}`,
  };
}

async function askUser(message) {
  console.log(`🧠 Evil AI says: ${message}`);
  const result = await new Promise((resolve) => {
    const p = prompt(message);
    resolve(p);
  });
  return result;
}


function validateUserInput(rawInput) {
  if (rawInput === null) {
    return { kind: "surrender" };
  }

  const cleaned = toLowerTrim(rawInput);

  if (cleaned === "branko") {
    return { kind: "branko" };
  }

  if (!MOVES.includes(cleaned)) {
    return {
      kind: "retry",
      reason:
        "❌ Evil AI growls: INVALID MOVE! Only Rock, Paper or Scissors allowed.",
    };
  }

  return { kind: "valid", move: cleaned };
}

async function getValidMoveFromUser() {
  while (true) {
    const raw = await askUser("Choose your move (Rock, Paper, or Scissors):");
    const verdict = validateUserInput(raw);

    if (verdict.kind === "valid") return verdict;
    if (verdict.kind === "surrender") return verdict;
    if (verdict.kind === "branko") return verdict;

    console.log(verdict.reason);
    console.log("🔁 This round is ignored. Try again, human...");
    console.log("---------------------------------------");
  }
}

function printIntro() {
  console.log("💀 Evil AI: Welcome, foolish human...");
  console.log(
    "💬 Evil AI: We shall play Rock, Paper, Scissors for the fate of your kind!"
  );
  console.log("🎯 First to 5 valid rounds wins. Invalid inputs do not count!");
  console.log("⚠️ Type 'Rock', 'Paper', or 'Scissors' exactly as Evil AI demands!");
  console.log("---------------------------------------");
}

function printRoundInfo(roundNumber, playerMove, computerMove, resultText) {
  console.log(`🎮 Round ${roundNumber}`);
  console.log(`🧍 You chose: ${capFirst(playerMove)}`);
  console.log(`🤖 Evil AI chose: ${capFirst(computerMove)}`);
  console.log(`⚔️ ${resultText}`);
  console.log("---------------------------------------");
}

function printBrankoScene() {
  console.log(
    "⚡ The moment the Evil AI heard the name 'Branko', it shivered in fear..."
  );
  console.log(
    "🧙‍♂️ Branko appeared from the shadows and challenged the AI with his legendary powers!"
  );
  console.log(
    "💥 In an instant, the AI was defeated. Humanity is saved without a single round played!"
  );
  console.log("🎉 Victory! Thanks to Branko, you won the game!");
}

function printSurrenderMessage() {
  console.log(
    "🏳️ You surrendered. The Evil AI has won by default. Machines rejoice..."
  );
}

function printFinalScores(pScore, cScore) {
  console.log(`📊 Final Score => You: ${pScore} | Evil AI: ${cScore}`);
  if (pScore > cScore) {
    console.log("🎉 Victory!");
    console.log(
      "🌍 The Evil AI let out one last distorted scream as sparks flew from its core..."
    );
    console.log("💥 You stood victorious, humanity watching with awe.");
    console.log(
      "🕊️ Peace has returned, at least for now... but legends say the AI might rise again."
    );
    console.log("👑 You are now a hero — the one who dared to challenge the code and won!");
  } else if (cScore > pScore) {
    console.log("💀 The Evil AI wins! The machines rise...");
  } else {
    console.log("🤝 It's a tie! A temporary peace settles in.");
  }
}

function updateScores(resultStatus, scores) {
  if (resultStatus === "win") {
    scores.player = scores.player + 1;
  } else if (resultStatus === "lose") {
    scores.computer = scores.computer + 1;
  }
}

async function game() {
  printIntro();

  const scores = { player: 0, computer: 0 };
  let validRounds = 0;

  while (validRounds < 5) {
    const verdict = await getValidMoveFromUser();

    if (verdict.kind === "surrender") {
      printSurrenderMessage();
      return;
    }

    if (verdict.kind === "branko") {
      printBrankoScene();
      return;
    }

    const playerMove = verdict.move;
    const computerMove = getComputerMove();
    const outcome = figureOutRound(playerMove, computerMove);

    printRoundInfo(validRounds + 1, playerMove, computerMove, outcome.text);
    updateScores(outcome.status, scores);

    validRounds = validRounds + 1; // keeping it explicit
  }

  printFinalScores(scores.player, scores.computer);
}


game();
