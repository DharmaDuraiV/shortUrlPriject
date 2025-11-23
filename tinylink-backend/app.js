const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const linkRoutes = require("./routes/linkRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middlewares/errorMiddleware");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/links", linkRoutes);

app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", version: "1.0" });
});

// Redirect Route
const Link = require("./models/linkModel");
app.get("/:code", async (req, res, next) => {
  try {
    const code = req.params.code;

    const link = await Link.findOne({ code });
    if (!link) {
      return next(new AppError(404, "Short URL not found"));
    }

    link.totalClicks++;
    link.lastClicked = new Date();
    await link.save();

    return res.status(307).redirect(link.target);
  } catch (err) {
    next(err);
  }
});

// Unknown Routes
app.all(`/{*any}`, (req, res, next) => {
  next(new AppError(404, `Cannot find ${req.originalUrl} on this server!`));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
