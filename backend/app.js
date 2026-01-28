import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

// Routers

// Auth Router
import AuthRouter from "./routes/auth-route.js";

// client Routers
import clientDetailsRouter from "./routes/client/client-details.js";
import clientProjectRouter from "./routes/client/client-project.js";
import clientSearchRouter from "./routes/client/client-search.js";
import clientProposalsRouter from "./routes/client/client-proposals.js";
import clientBidAcceptRouter from "./routes/client/bid-status/accepted.js";
import clientBidCancelRouter from "./routes/client/bid-status/cancelled.js";
import projectCompleteRouter from "./routes/client/complete-project.js";
import clientImageRouter from "./routes/client/client-image.js";
import clientReviewRouter from "./routes/client/client-review.js";
import clientInviteRouter from "./routes/client/client-invites.js";

// freelancer Routers
import freelancerProfileRouter from "./routes/freelancer/freelancer-profile.js";
import freelancerSearchRouter from "./routes/freelancer/freelancer-search.js";
import freelancerProjectRouter from "./routes/freelancer/freelancer-bid.js";
import freelancerImageRouter from "./routes/freelancer/freelancer-image.js";
import freelancerReviewRouter from "./routes/freelancer/freelancer-review.js";
import freelancerInviteRouter from "./routes/freelancer/freelancer-invites.js";

// middlewares
import authenticatedUser from "./middlewares/authentication.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import notFoundMiddleware from "./middlewares/not-found.js";

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

export default app;
