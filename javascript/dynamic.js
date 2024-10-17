let cardsData = [];
let filteredCards = [];

async function fetchCards() {
    try {
        const response = await fetch('http://localhost:3000/cards');
        const data = await response.json();
        cardsData = data;
        filteredCards = data;
        populateFilterDropdown(data);
        displayCards(filteredCards);
        enableSearchAndFilter();
    } catch (error) {
        console.error("Error fetching data: ", error);
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
        filteredCards.sort((a, b) => a.topic.localeCompare(b.topic));
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
