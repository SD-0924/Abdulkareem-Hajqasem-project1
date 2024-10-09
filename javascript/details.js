
const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get('id');

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
    const container = document.querySelector('.details-main-container');

    let subtopicsHTML = '';
    card.subtopics.forEach(subtopic => {
        subtopicsHTML += `<div class="feature"><ion-icon name="checkmark-circle-outline"></ion-icon> ${subtopic}</div>`;
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
                        <div class="link-container">
                            <span>by</span>
                            <a href="">${card.name}</a>
                        </div>
                    </div>
                    <div class="favourites-button-container">
                        <p class="interested-text">Interested about this topic?</p>
                        <button class="add-to-favourits-button" id=${card.id}>
                            <span class="add-to-favourits-button-span">Add to Favourites <ion-icon name="heart-outline" class="add-to-favourits-button__heart"></ion-icon></span>
                        </button>
                        <div class="creadits-container">
                            <span class="credits">Credits</span>
                        </div>
                    </div>
                </div>
            </div>
            <button class="add-to-favourits-button-mobile">
                <span class="add-to-favourits-button__span"><ion-icon name="heart-outline" class="favourites-heart"></ion-icon></span>
            </button>
            <img src="../assets/javascript.jpg" alt="" class="image" />
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
    favButton.onclick = () => {
        addToFavorites(card); 
    };
}

document.addEventListener('DOMContentLoaded', fetchCardDetails);
