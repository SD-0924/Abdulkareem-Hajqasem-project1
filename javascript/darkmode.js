let toggleDarkMode = document.querySelector(".color-mode-button");

toggleDarkMode.onclick = () => {
    document.body.classList.toggle("dark-mode");
};

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
        const cardHTML = `
            <div class="card">
                <div class="img-container">
                    <img src="../assets/${card.image}" alt="${card.topic}">
                </div>
                <div class="card-info-container">
                    <div class="card-title-container">
                        <p class="card-type">${card.category}</p>
                        <h3 class="language-name">${card.topic}</h3>
                    </div>
                    <div class="rate-author-container">
                        <div class="stars">
                            <!-- Example: Assuming 4 stars for all, modify as needed -->
                            <ion-icon name="star" class="star"></ion-icon>
                            <ion-icon name="star" class="star"></ion-icon>
                            <ion-icon name="star" class="star"></ion-icon>
                            <ion-icon name="star" class="star"></ion-icon>
                            <ion-icon name="star-half-outline" class="star"></ion-icon>
                        </div>
                        <p class="author-name">Author: ${card.name}</p>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

document.addEventListener('DOMContentLoaded', fetchCards);
