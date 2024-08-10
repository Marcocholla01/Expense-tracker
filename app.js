const express = require(`express`);
const colors = require(`colors`);
const cookiParser = require(`cookie-parser`);
const cors = require(`cors`);
const path = require(`path`);

const app = express();

app.use(cors());
app.use(cookiParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

const appPages = require(`./routes/pages.routes`);
const authRoutes = require(`./routes/auth.routes`);
const transactionsRoutes = require(`./routes/transactions.routes`);

app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/transactions`, transactionsRoutes);
app.use(appPages);

// errorHandling middlewares
app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(500).json({
    success: false,
    message: error.message,
  });
});

module.exports = app;
