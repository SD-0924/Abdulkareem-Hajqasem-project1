const addToFavorites = (card) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const fav = document.querySelector(".fav-container");
    const existingCard = favorites.findIndex(fav => fav.id === card.id);
        spanElement=document.querySelector(".add-to-favourits-button-span");
    if (existingCard === -1) {
        favorites.push(card); 
        localStorage.setItem('favorites', JSON.stringify(favorites));
        spanElement.innerHTML = `Remove from favorites <ion-icon name="heart-outline" class="add-to-favourits-button__heart"></ion-icon>`
        fav.style.display = "flex";
        renderFavorites();
    } else {
        favorites.splice(existingCard, 1); 
        localStorage.setItem('favorites', JSON.stringify(favorites));
        spanElement.innerHTML = `Add to Favorites <ion-icon name="heart-outline" class="add-to-favourits-button__heart"></ion-icon>`
        renderFavorites(); 
    }
};


const renderFavorites = () => {
    const favContainer = document.querySelector(".fav-cards-container");
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    favContainer.innerHTML = '';

    favorites.forEach(card => {
        const favCardHTML = `
            <div class="fav-card">
                <div class="fav-img-container">
                    <img src="../assets/${card.image}" alt="">
                </div>
                <div class="card-info-container-fav">
                    <div class="card-title-container">
                        <h3 class="language-name">${card.topic}</h3>
                    </div>
                    <div class="rate-author-container">
                        <div class="stars">
                            <ion-icon name="star" class="star"></ion-icon>
                            <ion-icon name="star" class="star"></ion-icon>
                            <ion-icon name="star" class="star"></ion-icon>
                            <ion-icon name="star" class="star"></ion-icon>
                            <ion-icon name="star-half-outline" class="star"></ion-icon>
                        </div>
                    </div>
                </div>
            </div>
        `;
        favContainer.innerHTML += favCardHTML;
    });
};

document.addEventListener('DOMContentLoaded', renderFavorites);
