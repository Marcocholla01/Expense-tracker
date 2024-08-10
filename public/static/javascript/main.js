document.addEventListener("DOMContentLoaded", () => {
  // Check if user is already logged in
  window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "/login";
    }
  });

  const balanceElement = document.getElementById("balance");
  const incomeElement = document.getElementById("income");
  const expenseElement = document.getElementById("expense");
  const transactionList = document.getElementById("transactionList");
  const transactionForm = document.getElementById("transactionForm");

  let transactions = [];

  // Function to calculate and update the display of balance, income, and expenses
  const updateValues = () => {
    const amounts = transactions.map((transaction) =>
      parseFloat(transaction.amount)
    );
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => acc + item, 0)
      .toFixed(2);
    const expense = (
      amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) *
      -1
    ).toFixed(2);

    balanceElement.textContent = `$${total}`;
    incomeElement.textContent = `$${income}`;
    expenseElement.textContent = `$${expense}`;
  };

  // Function to remove a transaction
  const removeTransaction = (id, type) => {
    transactions = transactions.filter((transaction) => transaction.id !== id);

    const endpoint =
      type === "expense"
        ? `/api/v1/transactions/expenses/${id}`
        : `/api/v1/transactions/incomes/${id}`;

    fetch(endpoint, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        updateTransactionList();
        updateValues();
        showToast("Transaction removed successfully!");
      })
      .catch((error) => {
        console.error("Error removing transaction:", error);
        showToast("Failed to remove transaction.");
      });
  };

  // Function to update the transaction list
  const updateTransactionList = () => {
    transactionList.innerHTML = "";

    transactions.forEach((transaction) => {
      const transactionItem = document.createElement("li");
      const sign = transaction.amount < 0 ? "-" : "+";
      const amount = `${sign}$${Math.abs(
        parseFloat(transaction.amount)
      ).toFixed(2)}`;

      transactionItem.classList.add(transaction.amount < 0 ? "minus" : "plus");
      transactionItem.innerHTML = `
                ${transaction.name} <span>${amount}</span>
                <button class="delete-btn" data-id="${transaction.id}" data-type="${transaction.type}">x</button>
              `;

      transactionList.appendChild(transactionItem);
    });
  };

  // Function to handle form submission
  transactionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(transactionForm);
    const isExpense = formData.get("type") ? true : false; // Check if it's an expense
    const name = formData.get("name");
    const amount = parseFloat(formData.get("amount"));
    const date = formData.get("date");

    const transaction = {
      name,
      amount: isExpense ? -amount : amount,
      date,
    };

    const url = isExpense
      ? "/api/v1/transactions/expenses"
      : "/api/v1/transactions/incomes";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then((response) => response.json())
      .then((data) => {
        transactions.push(data);
        updateTransactionList();
        updateValues();
        transactionForm.reset();
        showToast("Transaction added successfully!");
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
        showToast("Failed to add transaction.");
      });
  });

  // Function to fetch and load all transactions
  const loadTransactions = () => {
    Promise.all([
      fetch("/api/v1/transactions/expenses")
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .catch((error) => {
          console.error("Error fetching expenses:", error);
          showToast("Failed to fetch expenses.");
        }),
      fetch("/api/v1/transactions/incomes")
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .catch((error) => {
          console.error("Error fetching incomes:", error);
          showToast("Failed to fetch incomes.");
        }),
    ])
      .then(([expensesResponse, incomesResponse]) => {
        if (expensesResponse.success && incomesResponse.success) {
          const expenses =
            expensesResponse.expenses.map((exp) => ({
              ...exp,
              amount: parseFloat(exp.amount),
              id: exp.expenseId,
              type: "expense",
            })) || [];
          const incomes =
            incomesResponse.incomes.map((inc) => ({
              ...inc,
              amount: parseFloat(inc.amount),
              id: inc.incomeId,
              type: "income",
            })) || [];

          transactions = [...expenses, ...incomes].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          updateTransactionList();
          updateValues();
        } else {
          throw new Error("Failed to fetch transactions");
        }
      })
      .catch((error) => {
        console.error("Error loading transactions:", error);
        showToast("Failed to load transactions.");
      });
  };

  // Initial load of transactions
  loadTransactions();

  // Event delegation for delete button clicks
  transactionList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const id = event.target.getAttribute("data-id");
      const type = event.target.getAttribute("data-type");
      removeTransaction(id, type);
    }
  });

  // Function to show toast message
  const showToast = (message) => {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000); // Duration for toast visibility
  };
});
