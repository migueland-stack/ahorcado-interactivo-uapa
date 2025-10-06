// ==================== CONFIGURACIÓN Y CONSTANTES ====================
const API_URL = "http://localhost:3000/api";

// Multiplicadores de puntuación por dificultad
const difficultyMultipliers = {
  facil: 1.0, // 0% bonus
  intermedio: 1.5, // 50% bonus
  dificil: 2.0, // 100% bonus
};

// Palabras organizadas por dificultad
const optionsByDifficulty = {
  facil: {
    Frutas: [
      "Manzana",
      "Pera",
      "Uva",
      "Kiwi",
      "Fresa",
      "Mango",
      "Limon",
      "Melon",
      "Coco",
      "Ciruela",
      "Higo",
      "Datil",
      "Guinda",
      "Cereza",
      "Nispero",
      "Grosella",
      "Membrillo",
      "Nectarina",
      "Albaricoque",
      "Mora",
      "Frambuesa",
      "Arandano",
      "Zarzamora",
      "Aguacate",
      "Chirimoya",
      "Granada",
      "Higo",
    ],
    Colores: [
      "Rojo",
      "Azul",
      "Verde",
      "Rosa",
      "Gris",
      "Negro",
      "Blanco",
      "Beige",
      "Oro",
      "Naranja",
      "Lila",
      "Cyan",
      "Marron",
      "Bordo",
      "Celeste",
      "Turquesa",
      "Magenta",
      "Violeta",
      "Carmesi",
      "Amarillo",
      "Indigo",
      "Esmeralda",
      "AzulMarino",
      "VerdeLima",
      "Salmon",
      "Caqui",
      "Lavanda",
    ],
    Animales: [
      "Gato",
      "Perro",
      "Pato",
      "Oso",
      "Lobo",
      "Zorro",
      "Pez",
      "Rana",
      "Loro",
      "Conejo",
      "Cabra",
      "Vaca",
      "Pollo",
      "Raton",
      "Tigre",
      "Leon",
      "Mono",
      "Elefante",
      "Jirafa",
      "Cebra",
      "Caballo",
      "Oveja",
      "Cerdo",
      "Gallina",
      "Pavo",
      "Pinguino",
      "Delfin",
      "Ballena",
      "Tiburon",
    ],
    Comidas: [
      "Pizza",
      "Taco",
      "Sopa",
      "Arroz",
      "Pasta",
      "Pan",
      "Queso",
      "Leche",
      "Huevo",
      "Carne",
      "Pescado",
      "Fruta",
      "Verdura",
      "Jugo",
      "Agua",
      "Yogur",
      "Miel",
      "Mantequilla",
      "Galleta",
      "Pastel",
      "Helado",
      "Chocolate",
      "Cafe",
      "Te",
      "Panqueque",
      "Waffle",
      "Ensalada",
      "Sandwich",
      "Hamburguesa",
    ],
    Familia: [
      "Padre",
      "Madre",
      "Hijo",
      "Hija",
      "Abuelo",
      "Abuela",
      "Tio",
      "Tia",
      "Primo",
      "Prima",
      "Hermano",
      "Hermana",
      "Sobrino",
      "Sobrina",
      "Nieto",
      "Nieta",
      "Esposo",
      "Esposa",
      "Novio",
      "Novia",
      "Amigo",
      "Amiga",
    ],
  },
  intermedio: {
    Frutas: [
      "Manzana",
      "Arandano",
      "Mandarina",
      "Piña",
      "Granada",
      "Sandia",
      "Platano",
      "Mango",
      "Fresa",
      "Kiwi",
      "Papaya",
      "Cereza",
      "Melocoton",
      "Uva",
      "Melon",
      "Pera",
      "Guayaba",
      "Tamarindo",
      "Naranja",
      "Limon",
      "Frambuesa",
      "Coco",
      "Maracuya",
      "Higo",
      "Guayaba",
      "Litchi",
      "Rambutan",
      "Carambola",
      "Durian",
      "Mangostan",
      "Pitahaya",
      "Kumquat",
      "Pomelo",
      "Lima",
      "Caimito",
      "Zapote",
    ],
    Animales: [
      "Erizo",
      "Rinoceronte",
      "Ardilla",
      "Pantera",
      "Morsa",
      "Cebra",
      "Elefante",
      "Jirafa",
      "Tigre",
      "Oso",
      "Lobo",
      "Delfin",
      "Gato",
      "Perro",
      "Caballo",
      "Camello",
      "Pinguino",
      "Gorila",
      "Zorro",
      "Ballena",
      "Koala",
      "Leopardo",
      "Canguro",
      "Buho",
      "Hipopotamo",
      "Cocodrilo",
      "Serpiente",
      "Lagarto",
      "Tortuga",
      "Camaleon",
      "Aguila",
      "Halcon",
      "Buho",
      "Colibrí",
      "Flamenco",
      "PavoReal",
      "Pulpo",
      "Calamar",
      "Medusa",
      "Estrella",
      "Erizo",
      "Cangrejo",
    ],
    Colores: [
      "Rojo",
      "Azul",
      "Verde",
      "Amarillo",
      "Rosa",
      "Negro",
      "Blanco",
      "Gris",
      "Marron",
      "Naranja",
      "Violeta",
      "Turquesa",
      "Beige",
      "Celeste",
      "Dorado",
      "Plateado",
      "Magenta",
      "Cian",
      "Carmesi",
      "Escarlata",
      "Granate",
      "Purpura",
      "Lavanda",
      "Malva",
      "Ocre",
      "Canela",
      "Chocolate",
      "Ebano",
      "Marfil",
      "Perla",
    ],
    Comidas: [
      "Pizza",
      "Hamburguesa",
      "Sushi",
      "Taco",
      "Empanada",
      "Arepa",
      "Paella",
      "Pasta",
      "Ensalada",
      "Ceviche",
      "Burrito",
      "Hotdog",
      "Lasaña",
      "Croqueta",
      "Sopa",
      "Tortilla",
      "Tamales",
      "Gazpacho",
      "Risotto",
      "Falafel",
      "Hummus",
      "Guacamole",
      "Ratatouille",
      "Borscht",
      "Goulash",
      "Curry",
      "Biryani",
      "Pho",
      "Ramen",
      "Tagine",
    ],
    Profesiones: [
      "Doctor",
      "Ingeniero",
      "Maestro",
      "Policia",
      "Bombero",
      "Carpintero",
      "Panadero",
      "Electricista",
      "Mecanico",
      "Arquitecto",
      "Abogado",
      "Enfermero",
      "Cientifico",
      "Investigador",
      "Programador",
      "Diseñador",
      "Artista",
      "Musico",
      "Escritor",
      "Fotografo",
      "Cocinero",
      "Agricultor",
      "Pescador",
      "Piloto",
      "Conductor",
      "Vendedor",
      "Gerente",
      "Contador",
      "Economista",
    ],
    Deportes: [
      "Futbol",
      "Baloncesto",
      "Tenis",
      "Natacion",
      "Ciclismo",
      "Atletismo",
      "Boxeo",
      "Judo",
      "Karate",
      "Esgrima",
      "Gimnasia",
      "Voleibol",
      "Rugby",
      "Hockey",
      "Golf",
      "Beisbol",
      "Criquet",
      "Badminton",
      "Padel",
      "Squash",
      "Surf",
      "Snowboard",
      "Esqui",
      "Escalada",
    ],
  },
  dificil: {
    Paises: [
      "Kirguistan",
      "Zimbabue",
      "Dominica",
      "Argentina",
      "Australia",
      "Mozambique",
      "Turkmenistan",
      "Madagascar",
      "Guatemala",
      "Venezuela",
      "Kazajistan",
      "Azerbaiyan",
      "Bangladesh",
      "Turkmenistan",
      "Uzbekistan",
      "Tayikistan",
      "Kuwait",
      "Qatar",
      "Barein",
      "Oman",
      "Butan",
      "Nepal",
      "SriLanka",
      "Maldivas",
      "Micronesia",
      "Palaos",
      "Vanuatu",
      "Tuvalu",
      "Kiribati",
      "Nauru",
      "Samoa",
    ],
    Ciudades: [
      "Barcelona",
      "Montevideo",
      "Estocolmo",
      "Yakarta",
      "Melbourne",
      "Johannesburgo",
      "Philadelphia",
      "SanPetersburgo",
      "Guadalajara",
      "Cartagena",
      "Valparaiso",
      "Mendoza",
      "Salvador",
      "Recife",
      "Fortaleza",
      "Manila",
      "Bangkok",
      "Seul",
      "Osaka",
      "Yokohama",
      "Nagoya",
      "Sapporo",
      "Kioto",
      "Busan",
      "Incheon",
      "Calcuta",
      "Chennai",
      "Bangalore",
      "Hyderabad",
      "Ahmedabad",
    ],
    Profesiones: [
      "Arquitecto",
      "Ingeniero",
      "Programador",
      "Electricista",
      "Neurocirujano",
      "Astrofisico",
      "Bioquimico",
      "Psicologo",
      "Sociologo",
      "Antropologo",
      "Geologo",
      "Meteorologo",
      "Oceanografo",
      "Sismologo",
      "Volcanologo",
      "Paleontólogo",
      "Arqueologo",
      "Linguista",
      "Filosofo",
      "Teologo",
      "Cardiologo",
      "Neurologo",
      "Oncologo",
      "Pediatra",
      "Ginecologo",
      "Traumatologo",
      "Dermatologo",
      "Oftalmologo",
      "Otorrinolaringologo",
    ],
    Animales: [
      "Ornitorrinco",
      "Armadillo",
      "Cangrejo",
      "Medusa",
      "Pulpo",
      "Calamar",
      "Estrella",
      "Erizo",
      "Anemonas",
      "Coral",
      "Almeja",
      "Mejillon",
      "Ostra",
      "Vieira",
      "Nautilo",
      "Ajolote",
      "Quimera",
      "Celacanto",
      "Tuatara",
      "Komodo",
      "Pangolin",
      "Okapi",
      "Narval",
      "Mantis",
      "Avestruz",
      "Condor",
      "Albatros",
      "Pelicano",
      "Fragata",
      "Cormoran",
    ],
    Ciencia: [
      "Telescopio",
      "Microscopio",
      "Termometro",
      "Barometro",
      "Hidrometro",
      "Acelerador",
      "Colisionador",
      "Espectrometro",
      "Cromatografo",
      "Centrifuga",
      "Autoclave",
      "Incubadora",
      "Pipeta",
      "Bureta",
      "Matraz",
      "Probeta",
      "Crisol",
      "Mortero",
      "Embudo",
      "Portaobjetos",
      "Cubeta",
      "Electrodo",
      "Transistor",
      "Diodo",
      "Resistor",
      "Condensador",
      "Inductor",
    ],
    Literatura: [
      "Quijote",
      "MobyDick",
      "Ulises",
      "Orgullo",
      "Prejuicio",
      "Cumbres",
      "Borroscas",
      "Rayuela",
      "Soledad",
      "Niebla",
      "Plenilunio",
      "Alicia",
      "Wonderland",
      "Oz",
      "Neverland",
      "Narnia",
      "TierraMedia",
      "Westeros",
      "Poniente",
      "Hogwarts",
      "Howgarts",
      "Atlantida",
      "Avalon",
      "Camelot",
      "ShangriLa",
      "ElDorado",
      "Lemuria",
      "Hiperborea",
    ],
  },
};

// ==================== VARIABLES GLOBALES ====================
let userData = null;
let currentGameScore = 0;
let winCount = 0;
let count = 0;
let chosenWord = "";
let currentDifficultyLevel = "intermedio";
let isGameActive = false;
let soundEnabled = true;
let volumeLevel = 0.5;

// ==================== INICIALIZACIÓN GENERAL ====================
window.onload = function () {
  initializeMenu();
  initializeThemes();
  initializeDifficulty();
  initializeSounds();
  initializeAuthentication();
  initializeGameEventListeners();

  if (!checkAuth()) {
    document.getElementById("auth-screen").classList.remove("hide");
  }
};

// ==================== SISTEMA DE MENÚ ====================
function initializeMenu() {
  const menuButton = document.getElementById("menu-button");
  const dropdownMenu = document.getElementById("dropdown-menu");

  // Event listener para abrir/cerrar menú
  menuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("hide");
    playSound("click-sound");
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!dropdownMenu.contains(e.target) && !menuButton.contains(e.target)) {
      dropdownMenu.classList.add("hide");
    }
  });

  // Prevenir que el menú se cierre al hacer clic dentro
  dropdownMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// ==================== SISTEMA DE TEMAS ====================
function initializeThemes() {
  const themeSelector = document.getElementById("theme-selector");

  // Cargar tema guardado
  const savedTheme = localStorage.getItem("selectedTheme") || "classic";
  changeTheme(savedTheme);
  if (themeSelector) themeSelector.value = savedTheme;

  // Event listener para cambiar tema
  themeSelector?.addEventListener("change", (e) => {
    changeTheme(e.target.value);
  });
}

function changeTheme(themeName) {
  document.documentElement.setAttribute("data-theme", themeName);
  localStorage.setItem("selectedTheme", themeName);
  updateCanvasColor(themeName);
}

function updateCanvasColor(themeName) {
  const canvas = document.getElementById("canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  switch (themeName) {
    case "dark":
      context.strokeStyle = "#ffffff";
      break;
    case "retro":
      context.strokeStyle = "#00ff00";
      break;
    default: // classic
      context.strokeStyle = "#000000";
  }
}

// ==================== SISTEMA DE DIFICULTAD ====================
function initializeDifficulty() {
  const difficultySelector = document.getElementById("difficulty-selector");

  // Cargar dificultad guardada
  const savedDifficulty =
    localStorage.getItem("selectedDifficulty") || "intermedio";
  changeDifficulty(savedDifficulty);
  if (difficultySelector) difficultySelector.value = savedDifficulty;

  // Event listener para cambiar dificultad
  difficultySelector?.addEventListener("change", (e) => {
    if (!isGameActive) {
      changeDifficulty(e.target.value);
    }
  });
}

function changeDifficulty(difficulty) {
  currentDifficultyLevel = difficulty;
  localStorage.setItem("selectedDifficulty", difficulty);
  updateDifficultyUI(difficulty);
}

function updateDifficultyUI(difficulty) {
  const difficultyNames = {
    facil: "Fácil",
    intermedio: "Intermedio",
    dificil: "Difícil",
  };

  const bonusPercentages = {
    facil: "+0%",
    intermedio: "+50%",
    dificil: "+100%",
  };

  const currentDifficultyEl = document.getElementById("current-difficulty");
  const difficultyBonusEl = document.getElementById("difficulty-bonus");
  const gameDifficultyEl = document.getElementById("game-difficulty");

  if (currentDifficultyEl)
    currentDifficultyEl.textContent = difficultyNames[difficulty];
  if (difficultyBonusEl)
    difficultyBonusEl.textContent = bonusPercentages[difficulty];
  if (gameDifficultyEl)
    gameDifficultyEl.textContent = difficultyNames[difficulty];
}

function getOptionsForCurrentDifficulty() {
  return (
    optionsByDifficulty[currentDifficultyLevel] ||
    optionsByDifficulty.intermedio
  );
}

function setDifficultySelectorEnabled(enabled) {
  const difficultySelector = document.getElementById("difficulty-selector");
  if (!difficultySelector) return;

  difficultySelector.disabled = !enabled;
  difficultySelector.style.opacity = enabled ? "1" : "0.6";
  difficultySelector.style.cursor = enabled ? "pointer" : "not-allowed";
}

// ==================== SISTEMA DE SONIDO ====================
function initializeSounds() {
  const savedSoundSetting = localStorage.getItem("soundEnabled");
  const savedVolume = localStorage.getItem("volumeLevel");

  if (savedSoundSetting !== null) {
    soundEnabled = savedSoundSetting === "true";
  }
  if (savedVolume !== null) {
    volumeLevel = parseFloat(savedVolume);
  }

  updateVolume();
  updateVolumeUI();

  // Event listeners para controles de volumen del menú
  const volumeToggle = document.getElementById("volume-toggle");
  const volumeSliderMenu = document.getElementById("volume-slider-menu");

  if (volumeToggle) {
    volumeToggle.addEventListener("click", toggleSound);
  }

  if (volumeSliderMenu) {
    volumeSliderMenu.addEventListener("input", (e) => {
      changeVolume(e.target.value);
    });
  }
}

function updateVolume() {
  const sounds = ["win-sound", "lose-sound", "click-sound"];
  sounds.forEach((soundId) => {
    const sound = document.getElementById(soundId);
    if (sound) {
      sound.volume = volumeLevel;
    }
  });
}

function updateVolumeUI() {
  const volumeToggle = document.getElementById("volume-toggle");
  const volumeSliderMenu = document.getElementById("volume-slider-menu");

  if (volumeToggle) {
    volumeToggle.textContent = soundEnabled ? "🔊" : "🔇";
  }
  if (volumeSliderMenu) {
    volumeSliderMenu.value = volumeLevel;
    volumeSliderMenu.style.display = soundEnabled ? "block" : "none";
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem("soundEnabled", soundEnabled.toString());
  updateVolumeUI();
}

function changeVolume(value) {
  volumeLevel = parseFloat(value);
  localStorage.setItem("volumeLevel", volumeLevel.toString());
  updateVolume();
}

function playSound(soundId) {
  if (!soundEnabled) return;

  const sound = document.getElementById(soundId);
  if (!sound) return;

  sound.currentTime = 0;
  sound.play().catch((e) => {
    console.log("Error reproduciendo sonido:", e);
  });
}

// ==================== SISTEMA DE AUTENTICACIÓN ====================
function initializeAuthentication() {
  // Mostrar/ocultar formularios
  document.getElementById("show-register")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("login-form").classList.add("hide");
    document.getElementById("register-form").classList.remove("hide");
  });

  document.getElementById("show-login")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("register-form").classList.add("hide");
    document.getElementById("login-form").classList.remove("hide");
  });

  // Registro
  document
    .getElementById("register-button")
    ?.addEventListener("click", async () => {
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
  document
    .getElementById("login-button")
    ?.addEventListener("click", async () => {
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
  document.getElementById("logout-button")?.addEventListener("click", () => {
    logout();
  });
}

async function registerUser(email, password, username) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

async function updateUserScore(score, gameResult) {
  if (!userData) return null;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/scores/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: userData.id, score, gameResult }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error("Error actualizando estadísticas:", error);
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
    console.error("Error obteniendo leaderboard:", error);
    return [];
  }
}

async function loadUserData(user) {
  userData = user;

  document.getElementById("user-name").textContent = userData.username;
  document.getElementById("games-won").textContent = userData.gamesWon || 0;
  document.getElementById("best-score").textContent = userData.bestScore || 0;
  document.getElementById("current-user").textContent = userData.username;

  // Actualizar nuevos campos de estadísticas si existen
  const gamesLostEl = document.getElementById("games-lost");
  const currentStreakEl = document.getElementById("current-streak");
  const maxStreakEl = document.getElementById("max-streak");

  if (gamesLostEl) gamesLostEl.textContent = userData.gamesLost || 0;
  if (currentStreakEl)
    currentStreakEl.textContent = userData.currentStreak || 0;
  if (maxStreakEl) maxStreakEl.textContent = userData.maxStreak || 0;

  document.getElementById("auth-screen").classList.add("hide");
  document.getElementById("welcome-screen").classList.remove("hide");
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  userData = null;
  window.location.reload();
}

function checkAuth() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

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
    dificil: " (+100% bonus dificultad)",
  };
  return bonuses[difficulty] || "";
}

// ==================== SISTEMA DE ANIMACIONES ====================
function createConfetti() {
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
  ];
  const container = document.body;

  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animation = `confettiFall ${
      Math.random() * 2 + 1
    }s linear forwards`;
    confetti.style.animationDelay = Math.random() * 1 + "s";

    container.appendChild(confetti);

    // Remover después de la animación
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 3000);
  }
}

function triggerWinAnimation() {
  const resultText = document.getElementById("result-text");
  const canvas = document.getElementById("canvas");
  const userInputSection = document.getElementById("user-input-section");

  if (!resultText || !canvas || !userInputSection) return;

  // Animación solo de efectos visuales (sin transform)
  document.querySelector(".container").classList.add("win-animation");

  // Efecto en el canvas
  canvas.classList.add("canvas-celebration");

  // Efecto en el mensaje
  const winMessage = resultText.querySelector(".win-msg");
  if (winMessage) {
    winMessage.classList.add("win-message-pulse");
  }

  // Animación suave del contenido
  resultText.classList.add("win-content-animation");
  userInputSection.classList.add("win-content-animation");

  // Confeti
  createConfetti();

  // Remover animaciones después de completarse
  setTimeout(() => {
    document.querySelector(".container").classList.remove("win-animation");
    canvas.classList.remove("canvas-celebration");
    if (winMessage) {
      winMessage.classList.remove("win-message-pulse");
    }
    resultText.classList.remove("win-content-animation");
    userInputSection.classList.remove("win-content-animation");
  }, 2000);
}

function triggerLoseAnimation() {
  const resultText = document.getElementById("result-text");
  const canvas = document.getElementById("canvas");
  const userInputSection = document.getElementById("user-input-section");

  if (!resultText || !canvas || !userInputSection) return;

  // Animación solo de efectos visuales
  document.querySelector(".container").classList.add("lose-animation");

  // Efecto en el canvas
  canvas.classList.add("canvas-game-over");

  // Efecto en el mensaje
  const loseMessage = resultText.querySelector(".lose-msg");
  if (loseMessage) {
    loseMessage.classList.add("lose-message-pulse");
  }

  // Animación suave del contenido
  resultText.classList.add("lose-content-animation");
  userInputSection.classList.add("lose-content-animation");

  // Remover animaciones después de completarse
  setTimeout(() => {
    document.querySelector(".container").classList.remove("lose-animation");
    canvas.classList.remove("canvas-game-over");
    if (loseMessage) {
      loseMessage.classList.remove("lose-message-pulse");
    }
    resultText.classList.remove("lose-content-animation");
    userInputSection.classList.remove("lose-content-animation");
  }, 1500);
}

function triggerLetterAnimation(letterElement) {
  letterElement.classList.add("letter-correct");
  setTimeout(() => {
    letterElement.classList.remove("letter-correct");
  }, 300);
}

function revealLetterAnimation(index) {
  const dashes = document.getElementsByClassName("dashes");
  if (dashes[index]) {
    dashes[index].classList.add("revealed");
  }
}

// ==================== JUEGO PRINCIPAL ====================
function initializeGameEventListeners() {
  // Al hacer clic en el botón de inicio, ocultar la ventana de bienvenida y mostrar el juego
  document.getElementById("start-button")?.addEventListener("click", () => {
    document.getElementById("welcome-screen").classList.add("hide");
    document.querySelector(".container").classList.remove("hide");
    initializer();
  });

  // Leaderboard
  document
    .getElementById("leaderboard-button")
    ?.addEventListener("click", async () => {
      await showLeaderboard();
      document.querySelector(".welcome-buttons").classList.add("hide");
      document.getElementById("leaderboard").classList.remove("hide");
    });

  document.getElementById("back-button")?.addEventListener("click", () => {
    document.getElementById("leaderboard").classList.add("hide");
    document.querySelector(".welcome-buttons").classList.remove("hide");
  });

  // Nuevo juego - volver a la pantalla de bienvenida
  document.getElementById("new-game-button")?.addEventListener("click", () => {
    document.querySelector(".container").classList.add("hide");
    document.getElementById("welcome-screen").classList.remove("hide");
    initializer();
  });
}

//Display option buttons
function displayOptions() {
  const optionsContainer = document.getElementById("options-container");
  if (!optionsContainer) return;

  optionsContainer.innerHTML = `<h3>Selecciona una Categoría:</h3>`;
  let buttonCon = document.createElement("div");
  const currentOptions = getOptionsForCurrentDifficulty();

  for (let value in currentOptions) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
}

//Block all the Buttons
function blocker() {
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
    
    document.getElementById("new-game-container").classList.remove("hide");

    // ✅ HABILITAR selector de dificultad cuando el juego termina
    isGameActive = false;
    setDifficultySelectorEnabled(true);
}

//Word Generator
function generateWord(optionValue) {
  let optionsButtons = document.querySelectorAll(".options");
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue.toLowerCase()) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  document.getElementById("letter-container").classList.remove("hide");
  document.getElementById("user-input-section").innerText = "";

  const currentOptions = getOptionsForCurrentDifficulty();
  let optionArray = currentOptions[optionValue];
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  document.getElementById("user-input-section").innerHTML = displayItem;
}

// Canvas Creator con soporte para temas
function canvasCreator() {
  const canvas = document.getElementById("canvas");
  if (!canvas) return null;

  let context = canvas.getContext("2d");
  context.beginPath();

  // Usar el color del tema actual
  const currentTheme = localStorage.getItem("selectedTheme") || "classic";
  switch (currentTheme) {
    case "dark":
      context.strokeStyle = "#ffffff";
      break;
    case "retro":
      context.strokeStyle = "#00ff00";
      break;
    default:
      context.strokeStyle = "#000000";
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
}

function drawMan(count) {
  const creator = canvasCreator();
  if (!creator) return;

  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = creator;
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
}

// Función principal del juego
async function initializer() {
  winCount = 0;
  count = 0;
  currentGameScore = 0;
  isGameActive = true;

  document.getElementById("user-input-section").innerHTML = "";
  document.getElementById("options-container").innerHTML = "";
  document.getElementById("letter-container").classList.add("hide");
  document.getElementById("new-game-container").classList.add("hide");
  document.getElementById("letter-container").innerHTML = "";

  // Deshabilitar selector de dificultad durante el juego
  setDifficultySelectorEnabled(false);

  // Array con letras A-Z + Ñ
  const lettersArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "Ñ",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  lettersArray.forEach((letter) => {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = letter;

    button.addEventListener("click", async () => {
      playSound("click-sound");

      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");

      if (charArray.includes(button.innerText)) {
        charArray.forEach(async (char, index) => {
          if (char === button.innerText) {
            // Animación para revelar letra
            revealLetterAnimation(index);
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              // Calcular puntuación con bonus de dificultad
              currentGameScore = calculateScore(
                true,
                6 - count,
                chosenWord.length,
                currentDifficultyLevel
              );
              document.getElementById(
                "score-earned"
              ).innerHTML = `¡Ganaste ${currentGameScore} puntos!`;
              document.getElementById(
                "difficulty-bonus-info"
              ).innerHTML = `Bonus dificultad: ${getDifficultyBonusText(
                currentDifficultyLevel
              )}`;
              document.getElementById(
                "result-text"
              ).innerHTML = `<h2 class='win-msg'>¡Ganaste!</h2><p>La palabra era <span>${chosenWord}</span></p>`;

              playSound("win-sound");
              triggerWinAnimation();

              // Actualizar estadísticas en el backend - VICTORIA
              if (userData) {
                const updatedStats = await updateUserScore(
                  currentGameScore,
                  "win"
                );
                if (updatedStats) {
                  document.getElementById("games-won").textContent =
                    updatedStats.gamesWon;
                  document.getElementById("best-score").textContent =
                    updatedStats.bestScore;
                  const gamesLostEl = document.getElementById("games-lost");
                  const currentStreakEl =
                    document.getElementById("current-streak");
                  const maxStreakEl = document.getElementById("max-streak");

                  if (gamesLostEl)
                    gamesLostEl.textContent = updatedStats.gamesLost;
                  if (currentStreakEl)
                    currentStreakEl.textContent = updatedStats.currentStreak;
                  if (maxStreakEl)
                    maxStreakEl.textContent = updatedStats.maxStreak;
                }
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
          document.getElementById(
            "result-text"
          ).innerHTML = `<h2 class='lose-msg'>¡Perdiste!</h2><p>La palabra era <span>${chosenWord}</span></p>`;
          document.getElementById("difficulty-bonus-info").innerHTML = "";

          playSound("lose-sound");
          triggerLoseAnimation();

          // Actualizar estadísticas en el backend - DERROTA
          if (userData) {
            const updatedStats = await updateUserScore(0, "lose");
            if (updatedStats) {
              document.getElementById("games-won").textContent =
                updatedStats.gamesWon;
              document.getElementById("best-score").textContent =
                updatedStats.bestScore;
              const gamesLostEl = document.getElementById("games-lost");
              const currentStreakEl = document.getElementById("current-streak");
              const maxStreakEl = document.getElementById("max-streak");

              if (gamesLostEl) gamesLostEl.textContent = updatedStats.gamesLost;
              if (currentStreakEl)
                currentStreakEl.textContent = updatedStats.currentStreak;
              if (maxStreakEl) maxStreakEl.textContent = updatedStats.maxStreak;
            }
          }

          blocker();
        }
      }

      button.disabled = true;
    });

    document.getElementById("letter-container").append(button);
  });

  displayOptions();
  const creator = canvasCreator();
  if (creator) {
    creator.initialDrawing();
  }
}

async function showLeaderboard() {
  const scores = await getLeaderboard();
  const scoresList = document.getElementById("scores-list");
  if (!scoresList) return;

  scoresList.innerHTML = "";

  scores.forEach((score, index) => {
    const scoreItem = document.createElement("div");
    scoreItem.className = `score-item ${
      score.username === userData?.username ? "current-user" : ""
    }`;
    scoreItem.innerHTML = `
            <div class="leaderboard-user">
                <strong>${index + 1}. ${score.username}</strong>
                <span>${score.best_score || 0} pts</span>
            </div>
            <div class="leaderboard-stats">
                <small>Victorias: ${score.games_won || 0} | Racha: ${
      score.max_streak || 0
    }</small>
            </div>
        `;
    scoresList.appendChild(scoreItem);
  });
}
