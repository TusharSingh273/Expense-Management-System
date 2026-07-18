window.onload = loadTransactions;

async function loadTransactions() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:5000/api/transactions",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const transactions = await response.json();

    const table = document.getElementById("transactionTable");

    table.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;
    let monthlyIncome = 0;
    let monthlyExpense = 0;

    const today = new Date();

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    transactions.forEach(transaction => {

        table.innerHTML += `
            <tr>
                <td>${transaction.category}</td>
                <td>₹${transaction.amount}</td>
                <td>${transaction.transaction_type}</td>
                <td>${transaction.transaction_date.substring(0,10)}</td>

                <td>
                    <button onclick="editTransaction(${transaction.id})">
                        Edit
                    </button>
                </td>

                <td>
                    <button onclick="deleteTransaction(${transaction.id})">
                        Delete
                    </button>
                </td>
            </tr>
            `;

        if(transaction.transaction_type === "income"){
            totalIncome += Number(transaction.amount);
        }
        else{
            totalExpense += Number(transaction.amount);
        }
        const transactionDate = new Date(transaction.transaction_date);

        if(
            transactionDate.getMonth() === currentMonth &&
            transactionDate.getFullYear() === currentYear
        ){

            if(transaction.transaction_type === "income"){
                monthlyIncome += Number(transaction.amount);
            }
            else{
                monthlyExpense += Number(transaction.amount);
            }

        }
    });

    document.getElementById("income").innerText =
        "₹" + totalIncome.toFixed(2);

    document.getElementById("expense").innerText =
        "₹" + totalExpense.toFixed(2);

    document.getElementById("balance").innerText =
        "₹" + (totalIncome - totalExpense).toFixed(2);
    document.getElementById("monthlyIncome").innerText =
        "₹" + monthlyIncome.toFixed(2);

    document.getElementById("monthlyExpense").innerText =
        "₹" + monthlyExpense.toFixed(2);
}

function editTransaction(id){

    window.location.href =
    `/add-transaction?id=${id}`;

}

async function deleteTransaction(id){

    const confirmDelete = confirm(
        "Are you sure you want to delete this transaction?"
    );

    if(!confirmDelete){
        return;
    }

    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:5000/api/transactions/${id}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    alert(data.message);

    loadTransactions();
}