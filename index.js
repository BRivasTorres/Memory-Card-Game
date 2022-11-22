const section = document.querySelector(".section")
const playerLivesCount = document.querySelector(".playerLives")
let playerLives = 6

playerLivesCount.textContent = playerLives


const getData = () => [
    { imgSrc: "./imgs/brasil.webp", name: "brasil" },
    { imgSrc: "./imgs/brasil.webp", name: "brasil" },
    { imgSrc: "./imgs/eltz.webp", name: "Castillo" },
    { imgSrc: "./imgs/eltz.webp", name: "Castillo" },
    { imgSrc: "./imgs/islandia.webp", name: "islandia" },
    { imgSrc: "./imgs/islandia.webp", name: "islandia" },
    { imgSrc: "./imgs/italia.webp", name: "italia" },
    { imgSrc: "./imgs/italia.webp", name: "italia" },
    { imgSrc: "./imgs/lauterbrunen.webp", name: "lauterbrunen" },
    { imgSrc: "./imgs/lauterbrunen.webp", name: "lauterbrunen" },
    { imgSrc: "./imgs/nueva zelanda.webp", name: "nueva zelanda" },
    { imgSrc: "./imgs/nueva zelanda.webp", name: "nueva zelanda" },
    { imgSrc: "./imgs/paris.webp", name: "paris" },
    { imgSrc: "./imgs/paris.webp", name: "paris" },
    { imgSrc: "./imgs/sueoya.webp", name: "sueoya" },
    { imgSrc: "./imgs/sueoya.webp", name: "sueoya" },
]

const randomize = () => {
    const cardData = getData()
    cardData.sort(() => Math.random() -0.5)
    console.log(cardData)
    return cardData
}

const cardGenerator = () => {
    const cardData = randomize()
    //Generate the HTML
    cardData.forEach((item) => {
        const card = document.createElement("div")
        const face = document.createElement("img")
        const back = document.createElement("div")
        card.classList = "card"
        face.classList = "face"
        back.classList = "back"

        //Atach the info to the cards
        face.src = item.imgSrc
        card.setAttribute("name", item.name)

        section.appendChild(card)
        card.appendChild(face)
        card.appendChild(back)

        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard")
            checkCards(e)
        })
    })
}
 

//Check Cards
const checkCards = (e) => {
    const clickedCard = e.target
    clickedCard.classList.add("flipped")
    const flippedCards = document.querySelectorAll(".flipped")    
    const toggleCard = document.querySelectorAll(".toggleCard")

    if(flippedCards.length === 2) {
        if(flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            flippedCards.forEach((card) => {
                card.classList.remove("flipped")
                card.style.pointerEvents = "none"
            })
        } else {
            flippedCards.forEach((card) => {
                card.classList.remove("flipped")
                setTimeout(() => card.classList.remove("toggleCard"), 1000)
            })
            playerLives--
            playerLivesCount.textContent = playerLives
            if(playerLives === 0) {
                restart("😑Try again")
            }
        } 
    }

    if(toggleCard.length === 16) {
        restart("🙂You Won🎉")
    }
}

//Restart 
const restart = (text) => {
    let cardData = randomize()
    let faces = document.querySelectorAll(".face")
    let cards = document.querySelectorAll(".card")
    section.style.pointerEvents = "none"
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard")

        setTimeout(() => {
            cards[index].style.pointerEvents = "all"
            faces[index].src = item.imgSrc
            cards[index].setAttribute("name", item.name)
            section.style.pointerEvents = "all"
        }, 1000)
    })
    playerLives = 6
    playerLivesCount.textContent = playerLives
    setTimeout(() => {
        window.alert(text)
    }, 1000)
}

cardGenerator()