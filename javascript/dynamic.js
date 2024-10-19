
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
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; 

    try {
        const response = await fetch('https://tap-web-1.herokuapp.com/topics/list');
        const data = await response.json();
        cardsData = data;
        filteredCards = data;
        populateFilterDropdown(data);
        displayCards(filteredCards);
        enableSearchAndFilter();
    } catch (error) {
        console.error("Error fetching data: ", error);
    } finally {
        loader.style.display = 'none'; 
    }
}


function populateFilterDropdown(cards) {
    const filterDropdown = document.querySelector('#filter');
    const categories = [...new Set(cards.map(card => card.category))];

    categories.forEach(category => {
        const optionHTML = `<option value="${category}">${category}</option>`;
        filterDropdown.innerHTML += optionHTML;
    });
}


function displayCards(cards) {
    const container = document.querySelector('.cards-container');
    container.innerHTML = '';
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

function enableSearchAndFilter() {
    const searchInput = document.querySelector('.search-input');
    const filterDropdown = document.querySelector('#filter');
    const sortDropdown = document.querySelector('#sort');

    let debounceTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            applySearchFilterSort();
        }, 300);
    });

    filterDropdown.addEventListener('change', applySearchFilterSort);
    sortDropdown.addEventListener('change', applySearchFilterSort);
}

function applySearchFilterSort() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    const selectedCategory = document.querySelector('#filter').value;
    const sortBy = document.querySelector('#sort').value;

    filteredCards = cardsData.filter(card => card.topic.toLowerCase().includes(searchTerm));

    if (selectedCategory !== 'default') {
        filteredCards = filteredCards.filter(card => card.category === selectedCategory);
    }

    if (sortBy === 'title-asc') {
        filteredCards.sort((a, b) => {
            if(a.topic>b.topic){
                return 1
            }
            else if(b.topic>a.topic){
                return -1
            }
            else{
                return 0
            }
        
        });
    } else if (sortBy === 'title-desc') {
        filteredCards.sort((a, b) => b.topic.localeCompare(a.topic));
    } else if (sortBy === 'author-asc') {
        filteredCards.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'author-desc') {
        filteredCards.sort((a, b) => b.name.localeCompare(a.name));
    }
    displayCards(filteredCards);
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
