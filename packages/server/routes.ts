import { Router } from "express";

import { reviewController } from "./controllers/review.controller";

const router = Router();

router.get("/api/products/:id/reviews", reviewController.getReviews);

router.post('/api/products/:id/reviews/summary', reviewController.summarize);

export default router;
