document.addEventListener("DOMContentLoaded", () => {
    // Adjust Quantity
    document.querySelectorAll(".fa-plus-circle").forEach(plusBtn => {
        plusBtn.addEventListener("click", () => {
            const quantitySpan = plusBtn.nextElementSibling;
            const newQuantity = parseInt(quantitySpan.textContent) + 1;
            quantitySpan.textContent = newQuantity;
            updateTotal();
        });
    });

    document.querySelectorAll(".fa-minus-circle").forEach(minusBtn => {
        minusBtn.addEventListener("click", () => {
            const quantitySpan = minusBtn.previousElementSibling;
            let newQuantity = parseInt(quantitySpan.textContent) - 1;
            if (newQuantity < 0) newQuantity = 0; // Prevent negative quantities
            quantitySpan.textContent = newQuantity;
            updateTotal();
        });
    });

    // Delete Item
    document.querySelectorAll(".fa-trash-alt").forEach(deleteBtn => {
        deleteBtn.addEventListener("click", () => {
            const card = deleteBtn.closest(".card-body");
            card.remove();
            updateTotal();
        });
    });

    // Like Item
    document.querySelectorAll(".fa-heart").forEach(likeBtn => {
        likeBtn.addEventListener("click", () => {
            likeBtn.classList.toggle("liked");
        });
    });

    // Update Total Price
    function updateTotal() {
        let total = 0;
        document.querySelectorAll(".card-body").forEach(card => {
            const unitPrice = parseFloat(
                card.querySelector(".unit-price").textContent.replace("$", "").trim()
            );
            const quantity = parseInt(card.querySelector(".quantity").textContent);
            total += unitPrice * quantity;
        });
        document.querySelector(".total").textContent = `${total.toFixed(2)} $`;
    }

    // Add "liked" styling (optional)
    const style = document.createElement("style");
    style.textContent = `
        .fa-heart.liked {
            color: red;
        }
    `;
    document.head.appendChild(style);
});
