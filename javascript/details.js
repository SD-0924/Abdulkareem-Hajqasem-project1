const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get('id');
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

async function fetchCardDetails() {
    try {
        const response = await fetch(`http://localhost:3000/cards/${cardId}`);
        const card = await response.json();
        displayCardDetails(card);
    } catch (error) {
        console.error("Error fetching card details: ", error);
    }
}

const displayCardDetails = (card) => {
    const includeCard = favorites.find(fav => fav.id === card.id); 
    const favButtonText = includeCard ? "Remove from Favourites" : "Add to Favourites"; 

    const container = document.querySelector('.details-main-container');

    let subtopicsHTML = '';
    card.subtopics.forEach(subtopic => {
        subtopicsHTML += `<div class="feature"><ion-icon name="checkmark-circle-outline" class="checkmark"></ion-icon> ${subtopic}</div>`;
    });

    const detailsHTML = `
        <div class="language-info-card-container">
            <div class="info-main-container">
                <div class="info-title">
                    <p class="card-type">${card.category}</p>
                    <div class="by-author">
                        <h2 class="card-name">${card.topic}</h2>
                    </div>
                    <div class="stars">
                        <ion-icon name="star" class="star"></ion-icon>
                        <ion-icon name="star" class="star"></ion-icon>
                        <ion-icon name="star" class="star"></ion-icon>
                        <ion-icon name="star" class="star"></ion-icon>
                        <ion-icon name="star-half-outline" class="star"></ion-icon>
                    </div>
                </div>
                <p class="card-full-info">${card.description}</p>
            </div>
            <div class="details-card">
                <div class="img-container">
                    <img src="../assets/${card.image}" alt="" />
                </div>
                <div class="card-info-container">
                    <div class="card-title-container">
                        <p class="author-card">${card.topic}</p>
                        <span class="card__by">by</span>
                        <div class="link-container">
                            <a href="" class="card__author">${card.name}</a>
                        </div>
                    </div>
                    <div class="favourites-button-container">
                        <p class="interested-text">Interested about this topic?</p>
                        <button class="add-to-favourits-button" id=${card.id}>
                            <span class="add-to-favourits-button-span">${favButtonText}<ion-icon name="heart-outline" class="add-to-favourits-button__heart"></ion-icon></span>
                        </button>
                        <div class="creadits-container">
                            <span class="credits">Unlimited Credits</span>
                        </div>
                    </div>
                </div>
            </div>
            <button class="add-to-favourits-button-mobile">
                <span class="add-to-favourits-button__span"><ion-icon name="heart-outline" class="favourites-heart"></ion-icon></span>
            </button>
            <img src="../assets/${card.image}" alt="" class="image" />
        </div>
        <div class="features-main-container">
            <div class="features-container">
                <h2 class="feature-title">${card.topic}</h2>
                ${subtopicsHTML} 
            </div>
            <div class="bandaka"></div>
        </div>
    `;

    container.innerHTML += detailsHTML;

    const favButton = document.querySelector(".add-to-favourits-button");
    const favButtonMobile = document.querySelector(".add-to-favourits-button-mobile");
    favButton.onclick = () => {
        addToFavorites(card);
    };
    favButtonMobile.onclick = () => {
        addToFavorites(card);
    };
}

document.addEventListener('DOMContentLoaded', fetchCardDetails);
