import BookModel from "@/models/book";
import ReviewModel from "@/models/review";
import { AddReviewRequestHandler } from "@/types";
import { sendErrorResponse } from "@/utils/helper";
import { RequestHandler } from "express";
import { ObjectId, Types, isValidObjectId } from "mongoose";

export const addReview: AddReviewRequestHandler = async (req, res) => {
    const { bookId, rating, content } = req.body;
  
    await ReviewModel.findOneAndUpdate(
      { book: bookId, user: req.user.id },
      { content, rating },
      { upsert: true }
    );
  
    const [result] = await ReviewModel.aggregate<{ averageRating: number }>([
      {
        $match: {
          book: new Types.ObjectId(bookId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
  
    await BookModel.findByIdAndUpdate(bookId, {
      averageRating: result.averageRating,
    });
  
    res.json({
      message: "Review updated.",
    });
  };
  