const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get('id');
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

async function fetchCardDetails() {
    try {
        const loader = document.getElementById("loader")
        loader.style.display = "block"
        const response = await fetch(`https://tap-web-1.herokuapp.com/topics/details/${cardId}`);
        const card = await response.json();
        displayCardDetails(card);
    } catch (error) {
        console.error("Error fetching card details: ", error);
    } finally {
        loader.style.display = 'none';
    }
}

const displayCardDetails = (card) => {
    const includeCard = favorites.find(fav => fav.id === card.id);
    const favButtonText = includeCard ? "Remove from Favourites" : "Add to Favourites";

    const container = document.querySelector('.details-main-container');

    let subtopicsHTML = '';
    card.subtopics.forEach(subtopic => {
        subtopicsHTML += `<div class="feature d-flex align-items-center"><ion-icon name="checkmark-circle-outline" class="checkmark"></ion-icon> ${subtopic}</div>`;
    });

    const detailsHTML = `
        <div class="language-info-card-container d-flex justify-content-center position-relative">
            <div class="info-main-container text-white">
                <div class="info-title">
                    <p class="card-type">${card.category}</p>
                    <div class="by-author d-flex align-items-center">
                        <h2 class="card-name pt-1 pb-1">${card.topic}</h2>
                    </div>
                    <div class="stars">
                        <ion-icon name="star" class="star "></ion-icon>
                        <ion-icon name="star" class="star "></ion-icon>
                        <ion-icon name="star" class="star "></ion-icon>
                        <ion-icon name="star" class="star "></ion-icon>
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
                    <div class="favourites-button-container d-flex flex-column">
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
            <button class="add-to-favourits-button-mobile d-block d-md-none">
                <span class="add-to-favourits-button__span"><ion-icon name="heart-outline" class="favourites-heart"></ion-icon></span>
            </button>
            <img src="../assets/${card.image}" alt="" class="image d-md-none d-flex" />
        </div>
        <div class="features-main-container d-flex justify-content-center">
            <div class="features-container d-flex flex-column">
                <h2 class="feature-title d-flex align-items-center">${card.topic}</h2>
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
