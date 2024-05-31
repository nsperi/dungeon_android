import userManager from "../data/mongo/UserManager.mongo.js";

async function isValidEmail(req, res, next) {
  try {
    const { email } = req.body;
    const one = await userManager.readByEmail(email);
    if (one) {
      const error = new Error("Bad auth");
      error.StatusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export default isValidEmail;
