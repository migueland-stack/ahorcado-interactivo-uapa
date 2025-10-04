//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const welcomeScreen = document.getElementById("welcome-screen");
const startButton = document.getElementById("start-button");
const gameContainer = document.querySelector(".container");

// Al hacer clic en el botón de inicio, ocultar la ventana de bienvenida y mostrar el juego
startButton.addEventListener("click", () => {
  welcomeScreen.classList.add("hide");
  gameContainer.classList.remove("hide");
  initializer();
});

//Options values for buttons
let options = {
  frutas: [
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
  ],
  animales: [
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
  ],
  Paises: [
    "India",
    "Hungria",
    "Kirguistan",
    "Suiza",
    "Zimbabue",
    "Dominica",
    "España",
    "Mexico",
    "Argentina",
    "Japon",
    "Australia",
    "Canada",
  ],
};

//count
let winCount = 0;
let count = 0;

let chosenWord = "";

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

    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");

      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>¡Ganaste!</h2><p>La palabra era <span>${chosenWord}</span></p>`;
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

newGameButton.addEventListener("click", initializer);
window.onload = initializer;