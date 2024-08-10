const asyncHandler = require(`express-async-handler`);
const { generateUUID } = require("../utils/helperFunctions");

const { db } = require(`../config/database`);

// Get all expenses
exports.getExpenses = asyncHandler(async (req, res) => {
  const userId = req.auth.userId;
  const query = "SELECT * FROM expenses WHERE userId = ? ORDER BY date DESC";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching expenses:", err.message);
      res.status(500).json({ message: "Failed to fetch expenses" });
    } else {
      res.json({ success: true, expenses: results });
    }
  });
});

// Get all incomes
exports.getIncomes = asyncHandler(async (req, res) => {
  const userId = req.auth.userId;
  const query = "SELECT * FROM incomes WHERE userId = ? ORDER BY date DESC";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching incomes:", err.message);
      res.status(500).json({ message: "Failed to fetch incomes" });
    } else {
      res.json({ success: true, incomes: results });
    }
  });
});

// Add a new expense
exports.addExpense = asyncHandler(async (req, res) => {
  const { name, amount, date, category, description } = req.body;
  const expenseId = generateUUID();
  const userId = req.auth.userId;
  const query =
    "INSERT INTO expenses (expenseId, userId,name, amount, date, category, description) VALUES (?,?, ?,?, ?, ?, ?)";
  db.query(
    query,
    [expenseId, userId, name, amount, date, category, description],
    (err, result) => {
      if (err) {
        console.error("Error adding expense:", err.message);
        res.status(500).json({ message: "Failed to add expense" });
      } else {
        const newExpense = {
          expenseId,
          name,
          amount,
          date,
          category,
          description,
        };
        res.status(201).json(newExpense);
      }
    }
  );
});

// Add a new income
exports.addIncome = asyncHandler(async (req, res) => {
  const { name, amount, date, source, description } = req.body;
  const incomeId = generateUUID();
  const userId = req.auth.userId;
  const query =
    "INSERT INTO incomes (incomeId,userId,name, amount, date, source, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [incomeId, userId, name, amount, date, source, description],
    (err, result) => {
      if (err) {
        console.error("Error adding income:", err.message);
        res.status(500).json({ message: "Failed to add income" });
      } else {
        const newIncome = {
          incomeId,
          name,
          amount,
          date,
          source,
          description,
        };
        res.status(201).json(newIncome);
      }
    }
  );
});

// Delete an expense
exports.deleteExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;
  const query = "DELETE FROM expenses WHERE expenseId = ?";
  db.query(query, [expenseId], (err, result) => {
    if (err) {
      console.error("Error deleting expense:", err.message);
      res.status(500).json({ message: "Failed to delete expense" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "Expense not found" });
    } else {
      res.json({ message: "Expense deleted" });
    }
  });
});

// Delete an income
exports.deleteIncome = asyncHandler(async (req, res) => {
  const { incomeId } = req.params;
  const query = "DELETE FROM incomes WHERE incomeId = ?";
  db.query(query, [incomeId], (err, result) => {
    if (err) {
      console.error("Error deleting income:", err.message);
      res.status(500).json({ message: "Failed to delete income" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "Income not found" });
    } else {
      res.json({ message: "Income deleted" });
    }
  });
});
