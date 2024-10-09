const addToFavorites = (card) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (!favorites.find(fav => fav.id === card.id)) {
        favorites.push(card); 
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
    } else {
        alert(`${card.topic} is already in your favorites.`);
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
