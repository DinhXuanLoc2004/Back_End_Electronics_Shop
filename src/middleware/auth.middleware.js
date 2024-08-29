const { asyncHandler } = require("../helpers/handError");
const { ErrorResponse } = require("../helpers/responseHandle");
const jwt = require('jsonwebtoken')
const verifyUser = asyncHandler(async (req, res, next) => {
    const authorization = req.headers['authorization']

    if (!authorization) throw new ErrorResponse({ message: 'unauthorized', code: 401 })

    const decode = jwt.verify(authorization, process.env.SECRET_KEY)

    req.user = { email: decode.email, role: decode.role, userId: decode.userId }
    next()
})

const isAdmin = (req, res, next) => {
    const { role } = req.user

    if (role != 'admin') throw new ErrorResponse({ message: 'forbidden', code: 403 })

    next()
}

module.exports = {
    verifyUser,
    isAdmin
}