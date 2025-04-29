import { addReview, getPublicReviews, getReview } from "@/controllers/reivew";
import { isAuth, isPurchasedByTheUser } from "@/middlewares/auth";
import { newReviewSchema, validate } from "@/middlewares/validator";
import { Router } from "express";

const reviewRouter = Router();
