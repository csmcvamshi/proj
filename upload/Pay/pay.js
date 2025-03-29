document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById("upload-form");
    const paymentSection = document.getElementById("payment-section");
    const paymentForm = document.getElementById("payment-form");

    // Handle upload form submission
    uploadForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const fileInput = document.getElementById("file-upload");
        const dateInput = document.getElementById("submission-date");

        if (!fileInput.files.length) {
            alert("Please select a file before proceeding.");
            return;
        }

        if (!dateInput.value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            alert("Please enter a valid date in MM/DD/YYYY format.");
            return;
        }

        // Show payment section after file upload
        paymentSection.classList.remove("hidden");
    });

    // Handle payment submission
    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const cardNumber = document.getElementById("card-number").value;
        const expirationDate = document.getElementById("expiration-date").value;
        const cvv = document.getElementById("cvv").value;

        if (!cardNumber.match(/^\d{16}$/)) {
            alert("Enter a valid 16-digit card number.");
            return;
        }

        if (!expirationDate.match(/^\d{2}\/\d{2}$/)) {
            alert("Enter a valid expiration date in MM/YY format.");
            return;
        }

        if (!cvv.match(/^\d{3}$/)) {
            alert("Enter a valid 3-digit CVV.");
            return;
        }

        // Open a new window with payment details
        const paymentDetails = `
            <h2>Payment Details</h2>
            <p>Card Number: **** **** **** ${cardNumber.slice(-4)}</p>
            <p>Expiration Date: ${expirationDate}</p>
            <p>CVV: ***</p>
            <p>Payment Successful!</p>
        `;

        const paymentWindow = window.open("", "_blank", "width=400,height=300");
        paymentWindow.document.write(paymentDetails);
    });
});
// Get references to the elements
const proceedPaymentButton = document.getElementById("proceed-payment");
const paymentSection = document.getElementById("payment-section");

// Add an event listener to the "Proceed to Payment" button
proceedPaymentButton.addEventListener("click", () => {
    // Show the payment section by changing its display style
    paymentSection.style.display = "block";

    // Optionally scroll to the payment section for better user experience
    paymentSection.scrollIntoView({ behavior: "smooth" });
});
