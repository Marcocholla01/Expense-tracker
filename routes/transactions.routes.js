const {
  getExpenses,
  getIncomes,
  addExpense,
  addIncome,
  deleteExpense,
  deleteIncome,
} = require(`../controllers/transactions.controller`);
const { authenticated } = require("../middlwares/auth.middlewares");
const router = require(`express`).Router();

router.get("/expenses", authenticated, getExpenses);
router.get("/incomes", authenticated, getIncomes);

router.post("/expenses", authenticated, addExpense);
router.post("/incomes", authenticated, addIncome);

router.delete("/expenses/:expenseId", authenticated, deleteExpense);
router.delete("/incomes/:incomeId", authenticated, deleteIncome);

module.exports = router;
