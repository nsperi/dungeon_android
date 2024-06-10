function isText(req, res, next) {
    try {
      const { text } = req.body;
      if (!text) {
        const err = new Error("Insert text!");
        err.statusCode = 400;
        throw err;
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  export default isText;