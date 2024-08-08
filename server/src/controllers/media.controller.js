import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddleWare from "../middlewares/token.middleware.js"

const getList = async (req, res) => {
    try {
        const { page } = req.query;
        const { mediaType, mediaCategory } = req.params;

        const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });

        return responseHandler.ok(res, response);
    } catch (error) {
        console.log(error); res.status(400).json({ error })
        // responseHandler.error(res, error);
    }
}

const getGenres = async (req, res) => {
    try {
        const { mediaType } = req.params;

        const response = await tmdbApi.mediaGenres({ mediaType });
        // console.log(res, response);
        return responseHandler.ok(res, response);
    } catch (error) {
        console.log(error); res.status(400).json({ error })
        // responseHandler.error(res, error);
    }
}

const search = async (req, res) => {
    try {
        const { mediaType } = req.params;
        const { query, page } = req.query;

        const response = await tmdbApi.mediaSearch({
            query,
            page,
            mediaType: mediaType === "people" ? "person" : mediaType
        });


        responseHandler.ok(res, response);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error })
        // responseHandler.error(res, error);
    }
}

const getDetail = async (req, res) => {
    try {
        const { mediaType, mediaId } = req.params;

        const params = { mediaType, mediaId };

        const media = await tmdbApi.mediaDetail(params);

        media.credits = await tmdbApi.mediaCredits(params);

        const videos = await tmdbApi.mediaVideos(params);
        media.videos = videos;

        const recommend = await tmdbApi.mediaRecommend(params);
        media.recommend = recommend.results;

        media.images = await tmdbApi.mediaImages(params);

        const tokenDecoded = tokenMiddleWare.tokenDecode(req);

        if (tokenDecoded) {
            const user = await userModel.findById(tokenDecoded.data);
            if (user) {
                const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId })
                media.isFavorite = isFavorite !== null;
            }
        }

        media.reviews = await reviewModel.find({ mediaId }).populate("user").sort("-createdAt");
        // console.log(media.reviews);
        responseHandler.ok(res, media);
    } catch (error) {
        console.log(error); 
        res.status(400).json({ error })
        // responseHandler.error(res, error);
    }
}

export default {
    getList,
    getGenres,
    search,
    getDetail
}