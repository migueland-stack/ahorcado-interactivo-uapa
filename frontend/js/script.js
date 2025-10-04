// Configuración de la API - CAMBIA ESTA URL POR LA DE TU BACKEND
const API_URL = 'http://localhost:3000/api';

// Referencias del sistema de autenticación
const authScreen = document.getElementById("auth-screen");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const welcomeScreen = document.getElementById("welcome-screen");
const leaderboardDiv = document.getElementById("leaderboard");
const userName = document.getElementById("user-name");
const gamesWon = document.getElementById("games-won");
const bestScore = document.getElementById("best-score");
const currentUser = document.getElementById("current-user");
const currentScore = document.getElementById("current-score");
const scoreEarned = document.getElementById("score-earned");
const scoresList = document.getElementById("scores-list");

// Referencias originales del juego
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const gameContainer = document.querySelector(".container");

// Variables globales
let userData = null;
let currentGameScore = 0;
let winCount = 0;
let count = 0;
let chosenWord = "";

// Options values for buttons
let options = {
  frutas: [
    "Manzana", "Arandano", "Mandarina", "Piña", "Granada", "Sandia",
    "Platano", "Mango", "Fresa", "Kiwi", "Papaya", "Cereza"
  ],
  animales: [
    "Erizo", "Rinoceronte", "Ardilla", "Pantera", "Morsa", "Cebra",
    "Elefante", "Jirafa", "Tigre", "Oso", "Lobo", "Delfin"
  ],
  Paises: [
    "India", "Hungria", "Kirguistan", "Suiza", "Zimbabue", "Dominica",
    "España", "Mexico", "Argentina", "Japon", "Australia", "Canada"
  ]
};

// ==================== SISTEMA DE AUTENTICACIÓN ====================

// Mostrar/ocultar formularios
document.getElementById("show-register").addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hide");
  registerForm.classList.remove("hide");
});

document.getElementById("show-login").addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.add("hide");
  loginForm.classList.remove("hide");
});

// Registro
document.getElementById("register-button").addEventListener("click", async () => {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const username = document.getElementById("register-username").value;

  try {
    const data = await registerUser(email, password, username);
    await loadUserData(data.user);
  } catch (error) {
    alert("Error al registrar: " + error.message);
  }
});

// Login
document.getElementById("login-button").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const data = await loginUser(email, password);
    await loadUserData(data.user);
  } catch (error) {
    alert("Error al iniciar sesión: " + error.message);
  }
});

// Cerrar sesión
document.getElementById("logout-button").addEventListener("click", () => {
  logout();
});

// ==================== FUNCIONES DE LA API ====================

async function registerUser(email, password, username) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, username }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data;
}

async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data;
}

async function updateUserScore(score) {
  if (!userData) return null;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/scores/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId: userData.id, score }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error actualizando puntuación:', error);
    return null;
  }
}

async function getLeaderboard() {
  try {
    const response = await fetch(`${API_URL}/scores/leaderboard`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error obteniendo leaderboard:', error);
    return [];
  }
}

// ==================== FUNCIONES DE USUARIO ====================

async function loadUserData(user) {
  userData = user;

  userName.textContent = userData.username;
  gamesWon.textContent = userData.gamesWon || 0;
  bestScore.textContent = userData.bestScore || 0;
  currentUser.textContent = userData.username;

  authScreen.classList.add("hide");
  welcomeScreen.classList.remove("hide");
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  userData = null;
  window.location.reload();
}

function checkAuth() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
    userData = JSON.parse(user);
    loadUserData(userData);
    return true;
  }
  return false;
}

// ==================== SISTEMA DE PUNTUACIONES ====================

function calculateScore(isWin, attemptsLeft, wordLength) {
  if (!isWin) return 0;

  let score = 100; // Puntos base por ganar
  score += attemptsLeft * 20; // Puntos por intentos restantes
  score += wordLength * 10; // Puntos por longitud de palabra
  return score;
}

// Leaderboard
document.getElementById("leaderboard-button").addEventListener("click", async () => {
  await showLeaderboard();
  document.querySelector(".welcome-buttons").classList.add("hide");
  leaderboardDiv.classList.remove("hide");
});

document.getElementById("back-button").addEventListener("click", () => {
  leaderboardDiv.classList.add("hide");
  document.querySelector(".welcome-buttons").classList.remove("hide");
});

async function showLeaderboard() {
  const scores = await getLeaderboard();
  scoresList.innerHTML = "";

  scores.forEach((score, index) => {
    const scoreItem = document.createElement("div");
    scoreItem.className = `score-item ${score.username === userData?.username ? 'current-user' : ''}`;
    scoreItem.innerHTML = `
      <span>${index + 1}. ${score.username}</span>
      <span>${score.best_score || 0} pts</span>
    `;
    scoresList.appendChild(scoreItem);
  });
}

// ==================== JUEGO ORIGINAL (MODIFICADO) ====================

// Al hacer clic en el botón de inicio, ocultar la ventana de bienvenida y mostrar el juego
document.getElementById("start-button").addEventListener("click", () => {
  welcomeScreen.classList.add("hide");
  gameContainer.classList.remove("hide");
  initializer();
});

//Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Selecciona una Opción:</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue.toLowerCase()) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;
  currentGameScore = 0;
  currentScore.textContent = "0";

  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //Array with letters A-Z + Ñ
  const lettersArray = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];

  lettersArray.forEach((letter) => {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = letter;

    button.addEventListener("click", async () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");

      if (charArray.includes(button.innerText)) {
        charArray.forEach(async (char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              currentGameScore = calculateScore(true, 6 - count, chosenWord.length);
              scoreEarned.innerHTML = `¡Ganaste ${currentGameScore} puntos!`;
              resultText.innerHTML = `<h2 class='win-msg'>¡Ganaste!</h2><p>La palabra era <span>${chosenWord}</span></p>`;

              // Actualizar puntuación en el backend
              if (userData) {
                const updatedStats = await updateUserScore(currentGameScore);
                if (updatedStats) {
                  gamesWon.textContent = updatedStats.gamesWon;
                  bestScore.textContent = updatedStats.bestScore;
                }
              }

              blocker();
            }
          }
        });
      } else {
        count += 1;
        drawMan(count);
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>¡Perdiste!</h2><p>La palabra era <span>${chosenWord}</span></p>`;
          blocker();
        }
      }

      button.disabled = true;
    });

    letterContainer.append(button);
  });

  displayOptions();
  let { initialDrawing } = canvasCreator();
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => drawLine(70, 40, 70, 80);
  const leftArm = () => drawLine(70, 50, 50, 70);
  const rightArm = () => drawLine(70, 50, 90, 70);
  const leftLeg = () => drawLine(70, 80, 50, 110);
  const rightLeg = () => drawLine(70, 80, 90, 110);

  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawLine(10, 130, 130, 130);
    drawLine(10, 10, 10, 131);
    drawLine(10, 10, 70, 10);
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1: head(); break;
    case 2: body(); break;
    case 3: leftArm(); break;
    case 4: rightArm(); break;
    case 5: leftLeg(); break;
    case 6: rightLeg(); break;
    default: break;
  }
};

// Nuevo juego - volver a la pantalla de bienvenida
newGameButton.addEventListener("click", () => {
  gameContainer.classList.add("hide");
  welcomeScreen.classList.remove("hide");
  initializer();
});

// Inicializar verificando autenticación
window.onload = () => {
  if (!checkAuth()) {
    authScreen.classList.remove("hide");
  }
};