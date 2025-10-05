// Configuración de la API
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
const currentDifficulty = document.getElementById("current-difficulty");
const difficultyBonus = document.getElementById("difficulty-bonus");
const gameDifficulty = document.getElementById("game-difficulty");
const difficultyBonusInfo = document.getElementById("difficulty-bonus-info");

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
let currentDifficultyLevel = 'intermedio';
let isGameActive = false;

// Sistema de dificultad - Palabras organizadas por dificultad (EXPANDIDAS)
const optionsByDifficulty = {
  facil: {
    Frutas: [
      "Manzana", "Pera", "Uva", "Kiwi", "Fresa", "Mango", "Limon", "Melon",
      "Coco", "Ciruela", "Higo", "Dátil", "Guinda", "Cereza", "Níspero",
      "Grosella", "Membrillo", "Nectarina", "Albaricoque", "Mora", "Frambuesa",
      "Arándano", "Zarzamora", "Aguacate", "Chirimoya", "Granada", "Higo"
    ],
    Colores: [
      "Rojo", "Azul", "Verde", "Rosa", "Gris", "Negro", "Blanco", "Beige",
      "Oro", "Naranja", "Lila", "Cyan", "Marron", "Bordo", "Celeste",
      "Turquesa", "Magenta", "Violeta", "Carmesí", "Amarillo", "Índigo",
      "Esmeralda", "AzulMarino", "VerdeLima", "Salmón", "Caqui", "Lavanda"
    ],
    Animales: [
      "Gato", "Perro", "Pato", "Oso", "Lobo", "Zorro", "Pez", "Rana",
      "Loro", "Conejo", "Cabra", "Vaca", "Pollo", "Raton", "Tigre",
      "León", "Mono", "Elefante", "Jirafa", "Cebra", "Caballo", "Oveja",
      "Cerdo", "Gallina", "Pavo", "Pingüino", "Delfín", "Ballena", "Tiburón"
    ],
    Comidas: [
      "Pizza", "Taco", "Sopa", "Arroz", "Pasta", "Pan", "Queso", "Leche",
      "Huevo", "Carne", "Pescado", "Fruta", "Verdura", "Jugo", "Agua",
      "Yogur", "Miel", "Mantequilla", "Galleta", "Pastel", "Helado", "Chocolate",
      "Café", "Té", "Panqueque", "Waffle", "Ensalada", "Sándwich", "Hamburguesa"
    ],
    Familia: [
      "Padre", "Madre", "Hijo", "Hija", "Abuelo", "Abuela", "Tío", "Tía",
      "Primo", "Prima", "Hermano", "Hermana", "Sobrino", "Sobrina", "Nieto",
      "Nieta", "Esposo", "Esposa", "Novio", "Novia", "Amigo", "Amiga"
    ]
  },
  intermedio: {
    Frutas: [
      "Manzana", "Arandano", "Mandarina", "Piña", "Granada", "Sandia",
      "Platano", "Mango", "Fresa", "Kiwi", "Papaya", "Cereza",
      "Melocoton", "Uva", "Melon", "Pera", "Guayaba", "Tamarindo",
      "Naranja", "Limon", "Frambuesa", "Coco", "Maracuya", "Higo",
      "Guayaba", "Litchi", "Rambután", "Carambola", "Durian", "Mangostán",
      "Pitahaya", "Kumquat", "Pomelo", "Lima", "Caimito", "Zapote"
    ],
    Animales: [
      "Erizo", "Rinoceronte", "Ardilla", "Pantera", "Morsa", "Cebra",
      "Elefante", "Jirafa", "Tigre", "Oso", "Lobo", "Delfin",
      "Gato", "Perro", "Caballo", "Camello", "Pinguino", "Gorila",
      "Zorro", "Ballena", "Koala", "Leopardo", "Canguro", "Buho",
      "Hipopótamo", "Cocodrilo", "Serpiente", "Lagarto", "Tortuga", "Camaleón",
      "Águila", "Halcón", "Búho", "Colibrí", "Flamenco", "PavoReal",
      "Pulpo", "Calamar", "Medusa", "Estrella", "Erizo", "Cangrejo"
    ],
    Colores: [
      "Rojo", "Azul", "Verde", "Amarillo", "Rosa", "Negro",
      "Blanco", "Gris", "Marron", "Naranja", "Violeta", "Turquesa",
      "Beige", "Celeste", "Dorado", "Plateado", "Magenta", "Cian",
      "Carmesí", "Escarlata", "Granate", "Púrpura", "Lavanda", "Malva",
      "Ocre", "Canela", "Chocolate", "Ébano", "Marfil", "Perla"
    ],
    Comidas: [
      "Pizza", "Hamburguesa", "Sushi", "Taco", "Empanada", "Arepa",
      "Paella", "Pasta", "Ensalada", "Ceviche", "Burrito", "Hotdog",
      "Lasaña", "Croqueta", "Sopa", "Tortilla", "Tamales", "Gazpacho",
      "Risotto", "Falafel", "Hummus", "Guacamole", "Ratatouille", "Borscht",
      "Goulash", "Curry", "Biryani", "Pho", "Ramen", "Tagine"
    ],
    Profesiones: [
      "Doctor", "Ingeniero", "Maestro", "Policia", "Bombero", "Carpintero",
      "Panadero", "Electricista", "Mecanico", "Arquitecto", "Abogado", "Enfermero",
      "Científico", "Investigador", "Programador", "Diseñador", "Artista", "Músico",
      "Escritor", "Periodista", "Fotógrafo", "Cocinero", "Agricultor", "Pescador",
      "Piloto", "Conductor", "Vendedor", "Gerente", "Contador", "Economista"
    ],
    Deportes: [
      "Fútbol", "Baloncesto", "Tenis", "Natación", "Ciclismo", "Atletismo",
      "Boxeo", "Judo", "Karate", "Esgrima", "Gimnasia", "Voleibol",
      "Rugby", "Hockey", "Golf", "Béisbol", "Críquet", "Bádminton",
      "Pádel", "Squash", "Surf", "Snowboard", "Esquí", "Escalada"
    ]
  },
  dificil: {
    Paises: [
      "Kirguistan", "Zimbabue", "Dominica", "Argentina", "Australia",
      "Mozambique", "Turkmenistan", "Madagascar", "Guatemala", "Venezuela",
      "Kazajistan", "Azerbaiyan", "Bangladesh", "Turkmenistan", "Uzbekistan",
      "Tayikistan", "Kuwait", "Qatar", "Baréin", "EmiratosÁrabes", "Omán",
      "Bután", "Nepal", "SriLanka", "Maldivas", "TimorOriental", "PapúaNuevaGuinea",
      "Micronesia", "Palaos", "Vanuatu", "Tuvalu", "Kiribati", "Nauru", "Samoa"
    ],
    Ciudades: [
      "Barcelona", "Montevideo", "Estocolmo", "Yakarta", "Melbourne",
      "BuenosAires", "Johannesburgo", "Philadelphia", "SanPetersburgo",
      "Guadalajara", "Cartagena", "Valparaíso", "Mendoza", "Salvador",
      "Recife", "Fortaleza", "Manila", "Bangkok", "Seúl", "Osaka",
      "Yokohama", "Nagoya", "Sapporo", "Kioto", "Busán", "Incheon",
      "Calcuta", "Chennai", "Bangalore", "Hyderabad", "Ahmedabad"
    ],
    Profesiones: [
      "Arquitecto", "Ingeniero", "Programador", "Electricista", "Neurocirujano",
      "Astrofisico", "Bioquimico", "Psicologo", "Sociologo", "Antropologo",
      "Geologo", "Meteorologo", "Oceanografo", "Sismologo", "Volcanologo",
      "Paleontólogo", "Arqueólogo", "Lingüista", "Filósofo", "Teólogo",
      "Cardiólogo", "Neurólogo", "Oncólogo", "Pediatra", "Ginecólogo",
      "Traumatólogo", "Dermatólogo", "Oftalmólogo", "Otorrinolaringólogo"
    ],
    Animales: [
      "Ornitorrinco", "Armadillo", "Cangrejo", "Medusa", "Pulpo",
      "Calamar", "Estrella", "Erizo", "Anemonas", "Coral",
      "Almeja", "Mejillon", "Ostra", "Vieira", "Nautilo",
      "Ajolote", "Quimera", "Celacanto", "Tuatara", "Komodo",
      "Pangolín", "Okapi", "Narval", "Mantis", "Avestruz",
      "Cóndor", "Albatros", "Pelícano", "Fragata", "Cormorán"
    ],
    Ciencia: [
      "Telescopio", "Microscopio", "Termómetro", "Barómetro", "Hidrómetro",
      "Acelerador", "Colisionador", "Espectrómetro", "Cromatógrafo", "Centrífuga",
      "Autoclave", "Incubadora", "Pipeta", "Bureta", "Matraz", "Probeta",
      "Crisol", "Mortero", "Embudo", "VidrioReloj", "Portaobjetos", "Cubeta",
      "Electrodo", "Transistor", "Diodo", "Resistor", "Condensador", "Inductor"
    ],
    Literatura: [
      "Quijote", "MobyDick", "Ulises", "Orgullo", "Prejuicio", "Cumbres",
      "Borroscas", "Rayuela", "CienAños", "Soledad", "Niebla", "Plenilunio",
      "Alicia", "Wonderland", "Oz", "Neverland", "Narnia", "TierraMedia",
      "Westeros", "Poniente", "Hogwarts", "Howgarts", "Atlántida", "Avalon",
      "Camelot", "ShangriLa", "ElDorado", "Lemuria", "Hiperbórea"
    ]
  }
};

// Multiplicadores de puntuación por dificultad
const difficultyMultipliers = {
  facil: 1.0,      // 0% bonus
  intermedio: 1.5, // 50% bonus
  dificil: 2.0     // 100% bonus
};

// ==================== SISTEMA DE DIFICULTAD ====================

// Inicializar sistema de dificultad
function initializeDifficulty() {
  const difficultySelector = document.getElementById('difficulty-selector');

  // Cargar dificultad guardada
  const savedDifficulty = localStorage.getItem('selectedDifficulty') || 'intermedio';
  changeDifficulty(savedDifficulty);
  difficultySelector.value = savedDifficulty;

  // Event listener para cambiar dificultad
  difficultySelector.addEventListener('change', (e) => {
    if (!isGameActive) {
      changeDifficulty(e.target.value);
    }
  });
}

// Cambiar dificultad
function changeDifficulty(difficulty) {
  currentDifficultyLevel = difficulty;
  localStorage.setItem('selectedDifficulty', difficulty);

  // Actualizar interfaz
  updateDifficultyUI(difficulty);
}

// Actualizar interfaz de dificultad
function updateDifficultyUI(difficulty) {
  const difficultyNames = {
    facil: 'Fácil',
    intermedio: 'Intermedio',
    dificil: 'Difícil'
  };

  const bonusPercentages = {
    facil: '+0%',
    intermedio: '+50%',
    dificil: '+100%'
  };

  currentDifficulty.textContent = difficultyNames[difficulty];
  difficultyBonus.textContent = bonusPercentages[difficulty];
  gameDifficulty.textContent = difficultyNames[difficulty];
}

// Obtener opciones según la dificultad actual
function getOptionsForCurrentDifficulty() {
  return optionsByDifficulty[currentDifficultyLevel] || optionsByDifficulty.intermedio;
}

// Controlar estado del selector de dificultad
function setDifficultySelectorEnabled(enabled) {
  const difficultySelector = document.getElementById('difficulty-selector');
  difficultySelector.disabled = !enabled;

  if (!enabled) {
    difficultySelector.style.opacity = '0.6';
    difficultySelector.style.cursor = 'not-allowed';
  } else {
    difficultySelector.style.opacity = '1';
    difficultySelector.style.cursor = 'pointer';
  }
}

// ==================== SISTEMA DE TEMAS ====================

// Inicializar sistema de temas
function initializeThemes() {
  const themeSelector = document.getElementById('theme-selector');

  // Cargar tema guardado
  const savedTheme = localStorage.getItem('selectedTheme') || 'classic';
  changeTheme(savedTheme);
  themeSelector.value = savedTheme;

  // Event listener para cambiar tema
  themeSelector.addEventListener('change', (e) => {
    changeTheme(e.target.value);
  });
}

// Cambiar tema
function changeTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('selectedTheme', themeName);

  // Actualizar color del canvas según el tema
  updateCanvasColor(themeName);
}

// Actualizar color del canvas
function updateCanvasColor(themeName) {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  switch (themeName) {
    case 'dark':
      context.strokeStyle = '#ffffff';
      break;
    case 'retro':
      context.strokeStyle = '#00ff00';
      break;
    default: // classic
      context.strokeStyle = '#000000';
  }
}

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

async function updateUserScore(score, gameResult) {
  if (!userData) return null;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/scores/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId: userData.id, score, gameResult }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error actualizando estadísticas:', error);
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

  // Actualizar nuevos campos de estadísticas si existen
  if (document.getElementById('games-lost')) {
    document.getElementById('games-lost').textContent = userData.gamesLost || 0;
  }
  if (document.getElementById('current-streak')) {
    document.getElementById('current-streak').textContent = userData.currentStreak || 0;
  }
  if (document.getElementById('max-streak')) {
    document.getElementById('max-streak').textContent = userData.maxStreak || 0;
  }

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

function calculateScore(isWin, attemptsLeft, wordLength, difficulty) {
  if (!isWin) return 0;

  let score = 100; // Puntos base por ganar
  score += attemptsLeft * 20; // Puntos por intentos restantes
  score += wordLength * 10; // Puntos por longitud de palabra

  // Aplicar multiplicador de dificultad
  const multiplier = difficultyMultipliers[difficulty] || 1;
  score = Math.floor(score * multiplier);

  return score;
}

function getDifficultyBonusText(difficulty) {
  const bonuses = {
    facil: "",
    intermedio: " (+50% bonus dificultad)",
    dificil: " (+100% bonus dificultad)"
  };
  return bonuses[difficulty] || "";
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
      <div class="leaderboard-user">
        <strong>${index + 1}. ${score.username}</strong>
        <span>${score.best_score || 0} pts</span>
      </div>
      <div class="leaderboard-stats">
        <small>Victorias: ${score.games_won || 0} | Racha: ${score.max_streak || 0}</small>
      </div>
    `;
    scoresList.appendChild(scoreItem);
  });
}

// ==================== JUEGO ORIGINAL ====================

// Al hacer clic en el botón de inicio, ocultar la ventana de bienvenida y mostrar el juego
document.getElementById("start-button").addEventListener("click", () => {
  welcomeScreen.classList.add("hide");
  gameContainer.classList.remove("hide");
  initializer();
});

//Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML = `<h3>Selecciona una Categoría:</h3>`;
  let buttonCon = document.createElement("div");
  const currentOptions = getOptionsForCurrentDifficulty();

  for (let value in currentOptions) {
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

  // Habilitar selector de dificultad al terminar el juego
  isGameActive = false;
  setDifficultySelectorEnabled(true);
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

  const currentOptions = getOptionsForCurrentDifficulty();
  let optionArray = currentOptions[optionValue];
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  userInputSection.innerHTML = displayItem;
};

// Canvas Creator con soporte para temas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();

  // Usar el color del tema actual
  const currentTheme = localStorage.getItem('selectedTheme') || 'classic';
  switch (currentTheme) {
    case 'dark':
      context.strokeStyle = '#ffffff';
      break;
    case 'retro':
      context.strokeStyle = '#00ff00';
      break;
    default:
      context.strokeStyle = '#000000';
  }

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

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;
  currentGameScore = 0;
  currentScore.textContent = "0";
  isGameActive = true;

  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  // Deshabilitar selector de dificultad durante el juego
  setDifficultySelectorEnabled(false);

  //Array with letters A-Z + Ñ
  const lettersArray = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];

  lettersArray.forEach((letter) => {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = letter;

    button.addEventListener('click', async () => {

      // Reproducir sonido de click
      playSound(clickSound);

      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");

      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            // Animación para revelar letra
            revealLetterAnimation(index);
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              // Calcular puntuación con bonus de dificultad
              currentGameScore = calculateScore(true, 6 - count, chosenWord.length, currentDifficultyLevel);
              scoreEarned.innerHTML = `¡Ganaste ${currentGameScore} puntos!`;
              difficultyBonusInfo.innerHTML = `Bonus dificultad: ${getDifficultyBonusText(currentDifficultyLevel)}`;
              resultText.innerHTML = `<h2 class='win-msg'>¡Ganaste!</h2><p>La palabra era <span>${chosenWord}</span></p>`;

              // Reproducir sonido de victoria
              playSound(winSound);

              // Trigger animación de victoria
              triggerWinAnimation();

              // Actualizar estadísticas en el backend - VICTORIA
              if (userData) {
                updateUserScore(currentGameScore, 'win').then(updatedStats => {
                  if (updatedStats) {
                    gamesWon.textContent = updatedStats.gamesWon;
                    bestScore.textContent = updatedStats.bestScore;
                    document.getElementById('games-lost').textContent = updatedStats.gamesLost;
                    document.getElementById('current-streak').textContent = updatedStats.currentStreak;
                    document.getElementById('max-streak').textContent = updatedStats.maxStreak;
                  }
                });
              }

              blocker();
            }
          }
        });
      } else {
        count += 1;
        drawMan(count);
        // En la parte donde el usuario pierde (count == 6)
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>¡Perdiste!</h2><p>La palabra era <span>${chosenWord}</span></p>`;
          difficultyBonusInfo.innerHTML = "";

          // Reproducir sonido de derrota
          playSound(loseSound);

          // Trigger animación de derrota
          triggerLoseAnimation();

          // Actualizar estadísticas en el backend - DERROTA
          if (userData) {
            updateUserScore(0, 'lose').then(updatedStats => {
              if (updatedStats) {
                gamesWon.textContent = updatedStats.gamesWon;
                bestScore.textContent = updatedStats.bestScore;
                document.getElementById('games-lost').textContent = updatedStats.gamesLost;
                document.getElementById('current-streak').textContent = updatedStats.currentStreak;
                document.getElementById('max-streak').textContent = updatedStats.maxStreak;
              }
            });
          }

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

// Nuevo juego - volver a la pantalla de bienvenida
newGameButton.addEventListener("click", () => {
  gameContainer.classList.add("hide");
  welcomeScreen.classList.remove("hide");
  initializer();
});

// Inicializar verificando autenticación, temas y dificultad
window.onload = () => {
  initializeThemes();
  initializeDifficulty();
  initializeSounds();
  if (!checkAuth()) {
    authScreen.classList.remove("hide");
  }
};

// Sistema de sonidos
let soundEnabled = true;
let volumeLevel = 0.5;

// Referencias a elementos de audio
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
//const drawingSound = document.getElementById('drawing-sound');
const clickSound = document.getElementById('click-sound');

// Inicializar sistema de sonidos
function initializeSounds() {
  const savedSoundSetting = localStorage.getItem('soundEnabled');
  const savedVolume = localStorage.getItem('volumeLevel');

  if (savedSoundSetting !== null) {
    soundEnabled = savedSoundSetting === 'true';
  }
  if (savedVolume !== null) {
    volumeLevel = parseFloat(savedVolume);
  }

  // Configurar volumen inicial
  updateVolume();
  updateVolumeUI();
}

// Actualizar volumen de todos los sonidos
function updateVolume() {
  const sounds = [winSound, loseSound, drawingSound, clickSound];
  sounds.forEach(sound => {
    if (sound) {
      sound.volume = volumeLevel;
    }
  });
}

// Actualizar interfaz de volumen
function updateVolumeUI() {
  const volumeToggle = document.getElementById('volume-toggle');
  const volumeSlider = document.getElementById('volume-slider');

  if (volumeToggle) {
    volumeToggle.textContent = soundEnabled ? '🔊' : '🔇';
  }
  if (volumeSlider) {
    volumeSlider.value = volumeLevel;
    volumeSlider.style.display = soundEnabled ? 'block' : 'none';
  }
}

// Reproducir sonido
function playSound(soundElement) {
  if (!soundEnabled || !soundElement) return;

  soundElement.currentTime = 0;
  soundElement.play().catch(e => {
    console.log('Error reproduciendo sonido:', e);
  });
}

// Alternar sonido on/off
function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem('soundEnabled', soundEnabled.toString());
  updateVolumeUI();
}

// Cambiar volumen
function changeVolume(value) {
  volumeLevel = parseFloat(value);
  localStorage.setItem('volumeLevel', volumeLevel.toString());
  updateVolume();
}

// Event listeners para controles de volumen
document.addEventListener('DOMContentLoaded', function () {
  const volumeToggle = document.getElementById('volume-toggle');
  const volumeSlider = document.getElementById('volume-slider');

  if (volumeToggle) {
    volumeToggle.addEventListener('click', toggleSound);
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      changeVolume(e.target.value);
    });
  }
});

// ==================== SISTEMA DE ANIMACIONES ====================

// Crear confeti para victoria
function createConfetti() {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  const container = document.body;
  
  for (let i = 0; i < 30; i++) { // Reducido a 30 para mejor rendimiento
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animation = `confettiFall ${Math.random() * 2 + 1}s linear forwards`;
    confetti.style.animationDelay = Math.random() * 1 + 's';
    
    container.appendChild(confetti);
    
    // Remover después de la animación
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 3000);
  }
}

// Animación de victoria CORREGIDA
function triggerWinAnimation() {
  const resultText = document.getElementById('result-text');
  const canvas = document.getElementById('canvas');
  const userInputSection = document.getElementById('user-input-section');
  
  // Animación solo de efectos visuales (sin transform)
  document.querySelector('.container').classList.add('win-animation');
  
  // Efecto en el canvas
  canvas.classList.add('canvas-celebration');
  
  // Efecto en el mensaje
  const winMessage = resultText.querySelector('.win-msg');
  if (winMessage) {
    winMessage.classList.add('win-message-pulse');
  }
  
  // Animación suave del contenido
  resultText.classList.add('win-content-animation');
  userInputSection.classList.add('win-content-animation');
  
  // Confeti
  createConfetti();
  
  // Remover animaciones después de completarse
  setTimeout(() => {
    document.querySelector('.container').classList.remove('win-animation');
    canvas.classList.remove('canvas-celebration');
    if (winMessage) {
      winMessage.classList.remove('win-message-pulse');
    }
    resultText.classList.remove('win-content-animation');
    userInputSection.classList.remove('win-content-animation');
  }, 2000);
}

// Animación de derrota CORREGIDA
function triggerLoseAnimation() {
  const resultText = document.getElementById('result-text');
  const canvas = document.getElementById('canvas');
  const userInputSection = document.getElementById('user-input-section');
  
  // Animación solo de efectos visuales (sin transform que mueva el contenedor)
  document.querySelector('.container').classList.add('lose-animation');
  
  // Efecto en el canvas
  canvas.classList.add('canvas-game-over');
  
  // Efecto en el mensaje
  const loseMessage = resultText.querySelector('.lose-msg');
  if (loseMessage) {
    loseMessage.classList.add('lose-message-pulse');
  }
  
  // Animación suave del contenido
  resultText.classList.add('lose-content-animation');
  userInputSection.classList.add('lose-content-animation');
  
  // Remover animaciones después de completarse
  setTimeout(() => {
    document.querySelector('.container').classList.remove('lose-animation');
    canvas.classList.remove('canvas-game-over');
    if (loseMessage) {
      loseMessage.classList.remove('lose-message-pulse');
    }
    resultText.classList.remove('lose-content-animation');
    userInputSection.classList.remove('lose-content-animation');
  }, 1500);
}

// Animación para letras correctas (sin cambios)
function triggerLetterAnimation(letterElement) {
  letterElement.classList.add('letter-correct');
  setTimeout(() => {
    letterElement.classList.remove('letter-correct');
  }, 300);
}

// Animación para revelar letras en la palabra (sin cambios)
function revealLetterAnimation(index) {
  const dashes = document.getElementsByClassName('dashes');
  if (dashes[index]) {
    dashes[index].classList.add('revealed');
  }
}