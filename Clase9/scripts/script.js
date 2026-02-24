const start = document.querySelector(".draw")

const goes_up = document.querySelector(".goes-up")
const cardImg = document.querySelector(".card")
const goes_down = document.querySelector(".goes-down")

const points = document.querySelector(".points")
const remaining = document.querySelector(".remaining")
const swap = document.querySelector(".power-swap")
const all_in = document.querySelector(".power-all-in")

let lastCardValue;
let pointsCount = 0;
const frasesVictoria = [
    "¡Exacto!",
    "¡Vas con racha!",
    "¡Increíble lectura!",
    "That's Crazy man",
    "¡Adivinaste!",
    "¡Eres un crack!",
    "¡Sigue así! 🔥",
    "LET IT RIIIDE!!",
    "17 Black!"
];

const frasesDerrota = [
    "¡Qué mala suerte!",
    "¡Casi lo logras!",
    "¡Uy! Por poco...",
    "Sigue intentando.",
    "Las cartas no mienten... perdiste.",
    "¡BOOM! Fallaste.",
    "The house always has the edge, Roy"
];

const shuffle = async () => {
    pointsCount = 0;

    const cardResponse = await fetch("https://deckofcardsapi.com/api/deck/o30bzr83nv33/shuffle")
    if (cardResponse.status == 200) {
        /* Proceso de Información */
        const data = await draw();
        const card = data.cards[0]
        /* Seteo de UI */
        cardImg.src = card.image
        remaining.textContent = `${data.remaining} Restantes!`
        lastCardValue = await calculate(card.value)
        
        /* Pequeñita animacion */
        let steps = ["Preparado!?", "Listo!!?", "A Jugar!!!", `Puntos: ${pointsCount}`]
        let i = 0
        const set = setInterval(() => {
            updatePointsDisplay(steps[i], "#000")
            i++;
            if (i >= steps.length) {clearInterval(set)}
        }, 1000);
        setTimeout(() => {
            document.body.style.pointerEvents = "all";
        }, 4000);
    }
}

const draw = async () => {
    const cardResponse = await fetch("https://deckofcardsapi.com/api/deck/o30bzr83nv33/draw/?count=1")
    if (cardResponse.status == 200) {
        const cardData = await cardResponse.json()
        return cardData
    }
}

const calculate = (val) => {
    const map = { "ACE" : 1, "JACK" : 11, "QUEEN" : 12, "KING" : 13};
    return map[val] || parseInt(val);
};

const updatePointsDisplay = (text, color = "#000") => {
    points.textContent = text;
    points.style.color = color;
};

const handleGuess = async (guessType) => {
    /* Proceso de Información */
    const data = await draw();
    const card = data.cards[0]
    cardValue = await calculate(card.value)
    /* Seteo de UI */
    cardImg.src = card.image
    remaining.textContent = `${data.remaining} Restantes!`
    /* Condicion de perdida */
    const lostUp = guessType === "UP" && cardValue < lastCardValue
    const lostDown = guessType === "DOWN" && cardValue > lastCardValue
    /* Manejo del 50/50 */
    if (lostUp || lostDown) {
        const frase = elegirFrase(frasesDerrota)
        handleLose(frase);
    } else {
        handleWin(cardValue)
    }
}

const elegirFrase = (lista) => lista[Math.floor(Math.random() * lista.length)];

const handleWin = async (newValue) => {
    lastCardValue = newValue;
    pointsCount++
    const frase = elegirFrase(frasesVictoria);
    updatePointsDisplay(`${frase}`, "#2ecc71");
    setTimeout(() => {
        updatePointsDisplay(`Puntos: ${pointsCount}`);
    }, 1200);
};


const handleLose = async (frase) => {
    updatePointsDisplay(frase, "#ff4d4d")
    document.body.style.pointerEvents = "none";
    setTimeout(() => {
        // Quitamos la clase para que se desvanezcan        
        cardImg.classList.remove("is-visible")


        setTimeout(async () => {
            await shuffle();
            // Volvemos a mostrar tras el shuffle
            cardImg.classList.add("is-visible")

        }, 1000);
    }, 2000);
}

goes_up.addEventListener("click", async () => {handleGuess("UP")})
goes_down.addEventListener("click", async () => {handleGuess("DOWN")})


start.addEventListener("click", async () =>{
    start.textContent = "Reiniciar"
    document.body.style.pointerEvents = "none";
    await shuffle()
    setTimeout(()=>{
        document.querySelector(".container_gamba").classList.add("is-visible");
        document.querySelector(".container_board").classList.add("is-visible");
        cardImg.classList.add("is-visible")
        
    },500)
})