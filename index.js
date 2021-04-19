// get the heading element
const headingEl = document.querySelector("#headingTotal");

//get the reference to desc element
const inputDescEl = document.querySelector("#inputDesc");

// ref to input amount
const inputElement = document.querySelector("#inputAmount");

// Get the ref to table
const expenseTableEl = document.querySelector("#expenseTable")

// init value of expense at 0
let totalExpense = 0;

// set the heading element to totalExpense
headingEl.textContent = totalExpense;

// allExpenses at one place
let allExpenses = [];

// onButtonClick add inputAmount to totalExpense
function addExpenseToTotal() {

    const expenseItem = {};

    // read value from inputAmount
    const textAmount = inputElement.value;

    // read the desc from inputDesc
    const textDesc = inputDescEl.value;

    // convert it to number
    const expense = parseInt(textAmount, 10);
    if (textDesc !== "" && !isNaN(expense) && expense > 0) {
        // put it in object 
        expenseItem.desc = textDesc;
        expenseItem.amount = expense;
        expenseItem.moment = new Date();

        totalExpense += expense;
        updateTotal();
        allExpenses.push(expenseItem);

        renderList(allExpenses);
        inputElement.value = "";
        inputDescEl.value = "";
    }
}

// Get the btn element
const element = document.querySelector("#btnAddExpense");

// Listen to click event
element.addEventListener("click", addExpenseToTotal, false);
document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        addExpenseToTotal();
    }
});

// Get Date String
function getDateString(momento) {
    return momento.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function updateTotal() {
    // set the heading element to totalExpense
    let someText = `Total: ${totalExpense}`;
    headingEl.textContent = someText;
}

//Delete Items
function deleteItem(dateValue, amount) {
    const newArr = allExpenses.filter(
        expense => expense.moment.valueOf() !== dateValue
    );
    renderList(newArr);
    totalExpense -= amount;
    updateTotal();
}

// View Layer 

function renderList(arrOfList) {
    const allExpenseHTML = arrOfList.map(expense =>
        createListItem(expense)
    );
    const joinedAllExpenseHTML = allExpenseHTML.join("");
    expenseTableEl.innerHTML = joinedAllExpenseHTML;
    allExpenses = arrOfList;
}

function createListItem({ desc, amount, moment }) {
    return `
        <li class="list-group-item d-flex justify-content-between">
                <div class="d-flex flex-column">
                    ${desc}
                    <small class="text-muted">${getDateString(moment)}</small>
                </div>
                <div>
                    <span class="px-5">
                        ${amount}
                    </span>
                    <button 
                        type="button" 
                        class="btn btn-outline-danger btn-sm"
                        onclick = "deleteItem(${moment.valueOf()}, ${amount})"
                        >
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </li>
        `;
}


