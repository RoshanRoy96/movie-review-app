const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data);

const error = (res, error) => responseWithData(res, 500, {
    status: 500,
    Message: "Oops! something went wrong",
    error
})

const badrequest = (res, message) => responseWithData(res, 400, {
    status: 400,
    message
})

const ok = (res, data) => responseWithData(res, 200, data);

const created = (res, data) => responseWithData(res, 201, data);

const unauthorize = (res, data) => responseWithData(res, 401, {
    status: 401,
    message: "Unauthorized"
});

const notfound = (res, data) => responseWithData(res, 401, {
    status: 404,
    message: "Resource NOT found"
});

export default {
    error,
    badrequest,
    ok,
    created,
    notfound,
    unauthorize
}

