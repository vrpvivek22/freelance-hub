require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

// database connection
const connectDB = require("./database/connect");

// Routers

// Auth Router
const AuthRouter = require("./routes/auth-route");

// client Routers
const clientDetailsRouter = require("./routes/client/client-details");
const clientProjectRouter = require("./routes/client/client-project");
const clientSearchRouter = require("./routes/client/client-search");
const clientProposalsRouter = require("./routes/client/client-proposals");
const clientBidAcceptRouter = require("./routes/client/bid-status/accepted");
const clientBidCancelRouter = require("./routes/client/bid-status/cancelled");
const projectCompleteRouter = require("./routes/client/complete-project");
const clientImageRouter = require("./routes/client/client-image");
const clientReviewRouter = require("./routes/client/client-review");
const clientInviteRouter = require("./routes/client/client-invites");

// freelancer Routers
const freelancerProfileRouter = require("./routes/freelancer/freelancer-profile");
const freelancerSearchRouter = require("./routes/freelancer/freelancer-search");
const freelancerProjectRouter = require("./routes/freelancer/freelancer-bid");
const freelancerImageRouter = require("./routes/freelancer/freelancer-image");
const freelancerReviewRouter = require("./routes/freelancer/freelancer-review");
const freelancerInviteRouter = require("./routes/freelancer/freelancer-invites");

// middlewares
const authenticatedUser = require("./middlewares/authentication");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet());

app.use(
  "/api/v1/auth",
  rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    message: "Too many login attempts. Try again later.",
  })
);

// routes

// Auth route
app.use("/api/v1/auth", AuthRouter);

// client routes
app.use("/api/v1/client/details", authenticatedUser, clientDetailsRouter);
app.use("/api/v1/client/project", authenticatedUser, clientProjectRouter);
app.use("/api/v1/client/search", clientSearchRouter);
app.use(
  "/api/v1/client/project/proposals",
  authenticatedUser,
  clientProposalsRouter
);
app.use("/api/v1/client/bid", authenticatedUser, clientBidAcceptRouter);
app.use("/api/v1/client/bid", authenticatedUser, clientBidCancelRouter);
app.use("/api/v1/client/project", authenticatedUser, projectCompleteRouter);
app.use("/api/v1/client", authenticatedUser, clientImageRouter);
app.use("/api/v1/client", authenticatedUser, clientReviewRouter);
app.use("/api/v1/client", authenticatedUser, clientInviteRouter);

// freelancer routes
app.use(
  "/api/v1/freelancer/profile",
  authenticatedUser,
  freelancerProfileRouter
);
app.use("/api/v1/freelancer/bid", authenticatedUser, freelancerProjectRouter);
app.use("/api/v1/freelancer/search", freelancerSearchRouter);
app.use("/api/v1/freelancer", authenticatedUser, freelancerImageRouter);
app.use("/api/v1/freelancer", authenticatedUser, freelancerReviewRouter);
app.use("/api/v1/freelancer", authenticatedUser, freelancerInviteRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`This server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

start();
