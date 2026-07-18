const params = new URLSearchParams(window.location.search);
const transactionId = params.get("id");

// Load existing transaction if editing
window.onload = async function () {

    if (!transactionId) {
        return;
    }

    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:5000/api/transactions/${transactionId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const transaction = await response.json();

    document.getElementById("amount").value = transaction.amount;
    document.getElementById("type").value = transaction.transaction_type;
    document.getElementById("category").value = transaction.category;
    document.getElementById("description").value = transaction.transaction_description;
    document.getElementById("date").value =
        transaction.transaction_date.substring(0, 10);

    document.querySelector("button").innerText = "Update Transaction";
};

// Handle form submission
document
    .getElementById("transactionForm")
    .addEventListener("submit", addTransaction);

async function addTransaction(e) {

    e.preventDefault();

    const amount = document.getElementById("amount").value;
    const transaction_type = document.getElementById("type").value;
    const category = document.getElementById("category").value;
    const transaction_description = document.getElementById("description").value;
    const transaction_date = document.getElementById("date").value;

    // Decide whether to Add or Update
    const url = transactionId
        ? `http://localhost:5000/api/transactions/${transactionId}`
        : "http://localhost:5000/api/transactions/add";

    const method = transactionId ? "PUT" : "POST";

    const token = localStorage.getItem("token");

    const response = await fetch(url, {
        method: method,

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
            amount,
            transaction_type,
            category,
            transaction_description,
            transaction_date
        })
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
        window.location.href = "/dashboard";
    }
}