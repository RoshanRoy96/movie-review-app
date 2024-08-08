import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

const create = async (req, res) => {
    try {
        const { movieId } = req.params;

        const review = new reviewModel({
            user: req.user.id,
            movieId,
            ...req.body
        })

        await review.save();
        // console.log(review);
        responseHandler.created(res, {
            ...review._doc,
            id: review.id,
            user: req.user
        })
    } catch (error) {
        console.log(error); res.status(400).json({ error })
        // responseHandler.error(res, error);
    }
}

const remove = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await reviewModel.findOne({
            _id: reviewId,
            user: req.user.id
        })

        if (!review) return responseHandler.notfound(res);

        await review.remove();

        responseHandler.ok(res);
    } catch (error) {
        console.log(error); res.status(400).json({ error })
        // responseHandler.error(res, error);
    }
}

const getReviewOfUser = async (req, res) => {
    try {
        const reviews = await reviewModel.find({
            user: req.user.id,
        }).sort("-createdAt");
        
        responseHandler.ok(res, reviews);
    } catch (error) {
        console.log(error); res.status(400).json({ error })
        // responseHandler.error(res, error);
    }
}

export default {
    create,
    remove,
    getReviewOfUser
}