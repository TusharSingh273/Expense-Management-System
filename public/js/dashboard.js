window.onload = loadTransactions;

let allTransactions = [];
let pieChart;
let barChart;

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
    allTransactions = transactions;
    displayTransactions(allTransactions);
}

function displayTransactions(transactions){

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
                <td>${transaction.transaction_date.substring(0,10)}</td>

                <td>
                    ${
                        transaction.transaction_type === "income"
                        ? '<span class="income">Income</span>'
                        : '<span class="expense">Expense</span>'
                    }
                </td>
                <td>
                    <button class="edit-btn"
                        onclick="editTransaction(${transaction.id})">
                        Edit
                    </button>
                </td>
                <td>
                    <button class="delete-btn"
                        onclick="deleteTransaction(${transaction.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

        if(transaction.transaction_type === "income"){
            totalIncome += Number(transaction.amount);
        }else{
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
    
    drawCharts(transactions, totalIncome, totalExpense);
}

function filterTransactions(type){

    if(type === "all"){
        displayTransactions(allTransactions);
        return;
    }

    const filtered = allTransactions.filter(transaction =>
        transaction.transaction_type === type
    );

    displayTransactions(filtered);
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
const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
};

document.getElementById("currentDate").innerText =
    new Date().toLocaleDateString("en-IN", options);

document.getElementById("logoutBtn").addEventListener("click", logout);
function logout() {
    localStorage.removeItem("token");
    window.location.href = "/index";
}

function drawCharts(transactions,totalIncome,totalExpense){
    if(pieChart){
        pieChart.destroy();
    }
    if(barChart){
        barChart.destroy();
    }
    pieChart = new Chart(
        document.getElementById("pieChart"),
        {
            type:"pie",
            data:{
                labels:["Income","Expense"],
                datasets:[{
                    data:[totalIncome,totalExpense],
                    backgroundColor:[
                        "#16a34a",
                        "#dc2626"
                    ]
                }]
            }
        }
    );
    const expenseCategories = {};
    transactions.forEach(transaction=>{
        if(transaction.transaction_type==="expense"){
            if(!expenseCategories[transaction.category]){

                expenseCategories[transaction.category]=0;

            }
            expenseCategories[transaction.category]+=Number(transaction.amount);
        }
    });
    barChart = new Chart(
        document.getElementById("barChart"),
        {
            type:"bar",
            data:{
                labels:Object.keys(expenseCategories),
                datasets:[{
                    label:"Expenses",
                    data:Object.values(expenseCategories),
                    backgroundColor:"#2563eb"
                }]

            },
            options:{
                responsive:true,
                plugins:{
                    legend:{
                        display:false
                    }
                }
            }
        }
    );

}