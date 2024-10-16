let getToggleDarkMode = () => document.querySelector(".color-mode-button");

getToggleDarkMode().onclick = () => {
    document.body.classList.toggle("dark-mode");
};

let toggleFav = document.querySelector(".favourites-button");
toggleFav.onclick = () => {
    const fav = document.querySelector(".fav-container");
    if (fav.style.display === "flex") {
        fav.style.display = "none";
    }
    else {
        fav.style.display = "flex";
    }
};

document.querySelector('.color-mode-button').addEventListener('click', function () {
    const moonIcon = this.querySelector('ion-icon');
    if (moonIcon.style.color === 'orange') {
        moonIcon.style.color = '#333333';
    } else {
        moonIcon.style.color = 'orange';
    }
});

document.querySelector('.favourites-button').addEventListener('click', function () {
    const heartIcon = this.querySelector('ion-icon');
    if (heartIcon.style.color === 'red') {
        heartIcon.style.color = 'var(--body-test-color)';
    } else {
        heartIcon.style.color = 'red';
    }
});

async function fetchCards() {
    try {
        const response = await fetch('http://localhost:3000/cards');
        const data = await response.json();
        displayCards(data);
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

function displayCards(cards) {
    const container = document.querySelector('.cards-container');
    cards.forEach(card => {
        const cardHTML = createCardHTML(card);
        container.innerHTML += cardHTML;
    });
    addCardClickEvent();
    renderFavorites();
}

function createCardHTML(card) {
    return `
        <div class="card" id="${card.id}">
            <div class="img-container">
                <img src="../assets/${card.image}" alt="${card.topic}">
            </div>
            <div class="card-info-container">
                <div class="card-title-container">
                    <p class="card-type">${card.category}</p>
                    <h3 class="language-name">${card.topic}</h3>
                </div>
                ${createRateAuthorContainer(card)}
            </div>
        </div>
    `;
}

function createRateAuthorContainer(card) {
    return `
        <div class="rate-author-container">
            ${createStarRating(card.rating)}  
            <p class="author-name">Author: ${card.name}</p>
        </div>
    `;
}

function createStarRating(rating) {
    const fullStars = Math.floor(rating); 
    const hasHalfStar = rating % 1 !== 0; 
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<ion-icon name="star" class="star"></ion-icon>';
    }

    if (hasHalfStar) {
        starsHTML += '<ion-icon name="star-half-outline" class="star"></ion-icon>';
    }

    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        starsHTML += '<ion-icon name="star-outline" class="star"></ion-icon>';
    }

    return `<div class="stars">${starsHTML}</div>`;
}

function addCardClickEvent() {
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
        card.onclick = () => {
            let cardId = card.getAttribute('id');
            window.location.href = `./details.html?id=${cardId}`;
        };
    });
}



document.addEventListener('DOMContentLoaded', fetchCards);
