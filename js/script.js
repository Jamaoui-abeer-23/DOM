// script.js

// Select all necessary elements
const totalPriceElement = document.querySelector('.total');
const productCards = document.querySelectorAll('.card-body');

let totalPrice = 0;

// Function to update the total price
function updateTotalPrice() {
    totalPriceElement.textContent = `${totalPrice} $`;
}

// Function to handle quantity change
function handleQuantityChange(event) {
    const cardBody = event.target.closest('.card-body');
    const unitPriceElement = cardBody.querySelector('.unit-price');
    const quantityElement = cardBody.querySelector('.quantity');
    const unitPrice = parseFloat(unitPriceElement.textContent.replace(' $', ''));
    
    let quantity = parseInt(quantityElement.textContent);

    if (event.target.classList.contains('fa-plus-circle')) {
        quantity++;
    } else if (event.target.classList.contains('fa-minus-circle') && quantity > 0) {
        quantity--;
    }

    quantityElement.textContent = quantity;

    // Update total price
    totalPrice += (event.target.classList.contains('fa-plus-circle') ? unitPrice : -unitPrice);
    updateTotalPrice();
}

// Function to handle item deletion
function handleDelete(event) {
    const cardBody = event.target.closest('.card-body');
    const unitPriceElement = cardBody.querySelector('.unit-price');
    const unitPrice = parseFloat(unitPriceElement.textContent.replace(' $', ''));
    const quantityElement = cardBody.querySelector('.quantity');
    const quantity = parseInt(quantityElement.textContent);

    // Update total price
    totalPrice -= (unitPrice * quantity);
    updateTotalPrice();

    // Remove the card from the DOM
    cardBody.remove();
}

// Function to handle liking an item
function handleLike(event) {
    const heartIcon = event.target;
    heartIcon.classList.toggle('liked'); // Toggle the 'liked' class

    // Change color based on the liked state
    if (heartIcon.classList.contains('liked')) {
        heartIcon.style.color = 'red'; // Change to red when liked
    } else {
        heartIcon.style.color = ''; // Reset to default when unliked
    }
}

// Add event listeners to each product card
productCards.forEach(card => {
    const plusButton = card.querySelector('.fa-plus-circle');
    const minusButton = card.querySelector('.fa-minus-circle');
    const deleteButton = card.querySelector('.fa-trash-alt');
    const likeButton = card.querySelector('.fa-heart');

    plusButton.addEventListener('click', handleQuantityChange);
    minusButton.addEventListener('click', handleQuantityChange);
    deleteButton.addEventListener('click', handleDelete);
    likeButton.addEventListener('click', handleLike);
});