import userManager from "../data/mongo/managers/usersManager.mongo.js";

async function isValidEmail(req, res, next) {
    try {
        const {email} = req.body
        const one = await userManager.readByEmail(email)
        if(one) {
            const error = new Error('Bad auth')
            error.statusCode = 401
            throw error
        }
        return next()
    } catch (error) {
        next(error)
    }
}

export default isValidEmail