import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const personDetail = async (req, res) => {
    try {
        const { personId } = req.params;

        const person = await tmdbApi.personDetail({ personId });

        responseHandler.ok(res, person);
    } catch {

    }
}

const personMedias = async (req, res) => {
    try {
        const { personId } = req.params;
        // console.log(personId);
        const medias = await tmdbApi.personMedias({ personId });

        responseHandler.ok(res, medias);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error })
        // responseHandler.error(res, error);
    }
}

export default {
    personDetail,
    personMedias
}