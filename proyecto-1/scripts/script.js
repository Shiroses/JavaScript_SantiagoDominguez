const drawP1 = document.querySelector(".deck-o-cards--p1")
const drawP2 = document.querySelector(".deck-o-cards--p2")


const handP1Id = document.querySelector(".deck-o-cards--player-one div")
const handP2Id = document.querySelector(".deck-o-cards--player-two div");

const handP1 = [];
const handP2 = [];




drawP1.addEventListener("click", ()=>{takeOne(handP1, "p1", handP1Id)})
drawP2.addEventListener("click", ()=>{takeOne(handP2, "p2", handP2Id)})

startGame()

function takeOne(player, p, handId){
        fetch("https://deckofcardsapi.com/api/deck/o30bzr83nv33/draw/?count=1")
        .then(drawResponse=>{
            return drawResponse.json()
        })
        .then((drawData) => {
            const newCard = document.createElement("img")
            const handSizeId = document.querySelectorAll(`.deck-o-cards--stack-${p}`)

            card = drawData.cards[0]
            actCard = handSizeId.length

            player.push(card)

            console.log(player)

            newCard.src = card.image
            newCard.classList.add("deck-o-cards","deck-o-cards--stack-"+p)
            newCard.style = (`--i: ${actCard}`)

            handId.appendChild(newCard);
        })
}

/* function startGame(){
    fetch("https://deckofcardsapi.com/api/deck/o30bzr83nv33/shuffle")
    .then(deckResponse => {return deckResponse.json()})
    .then ((deckData) => {
        const deckId = deckData.deck_id
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`)
        .then(drawResponse=>{return drawResponse.json()})
        .then((drawData) => {
            let cards = drawData.cards
            cards.forEach((card, index) => {
                handP1.push(card);

                const newCard = document.createElement("img");

                newCard.src = card.image;
                newCard.classList.add("deck-o-cards","deck-o-cards--stack-p1");
                newCard.style.setProperty('--i', index);

                handP1Id.appendChild(newCard);
            });
        })
    })
}
 */

function startGame() {
    fetch("https://deckofcardsapi.com/api/deck/o30bzr83nv33/shuffle")
    .then(res => res.json())
    .then(deckData => {
        return fetch(`https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=16`);
    })
    .then(res => res.json())
    .then(drawData => {
        const allCards = drawData.cards;
        allCards.forEach((card, index) => {
            if (index < 8) {
                renderCard(card, handP1, handP1Id);
            } else {
                renderCard(card, handP2, handP2Id);
            }
        });
    })
    .catch(err => console.error("Game Start Error:", err));
}

function renderCard(card, handArray, container) {
    handArray.push(card);

    if(handArray === handP1) {
        subclass = "deck-o-cards--stack-p1"
    } else {
        subclass = "deck-o-cards--stack-p2"
    }
    
    const newCard = document.createElement("img");
    newCard.src = card.image;
    newCard.classList.add("deck-o-cards", subclass); // Shared class
    
    // Calculate index based on current images in THIS container
    const visualIndex = container.querySelectorAll("img").length;
    newCard.style.setProperty('--i', visualIndex);

    container.appendChild(newCard);
}