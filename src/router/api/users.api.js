import { Router } from "express";
//import userManager from "../../data/fs/UserManager.js";
import userManager from "../../data/mongo/managers/usersManager.mongo.js";

const usersRouter = Router();

usersRouter.get('/', read)
usersRouter.get('/paginate', paginate)
usersRouter.get('/:id', readOne)
usersRouter.post('/', create)
usersRouter.put('/:id', update)
usersRouter.delete('/:id', destroy)

async function create(req, res, next) {
    try {
      const data = req.body;
      const users = await userManager.create(data);
      return res.json({
        statusCode: 201,
        message: "CREATED USER: " + users.id,
      });
    } catch (error) {
      return next(error);
    }
  }
  
  async function read(req, res, next) {
    try {
      const { rol } = req.query;
      const all = await userManager.read(rol);
      if (all.length > 0) {
        return res.json({
          statusCode: 200,
          response: all,
        });
      } else {
        const error = new Error("Not found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
  
  async function paginate(req, res, next) {
    try {
      const filter = {}
      const opts = {}
      if (req.query.limit) {
        opts.limit = req.query.limit
      }
      if (req.query.page) {
        opts.page = req.query.page
      }
      const all = await userManager.paginate({filter, opts})
      return res.json({
        statusCode: 200,
        response: all.docs,
        info: {
          page: all.page,
          totalPages: all.totalPages,
          limit: all.limit,
          prevPage: all.prevPage,
          nextPage: all.nextPage,
        }
      })
    } catch (error) {
      return next(error)
    }
  }

  async function readOne(request, response, next) {
    try {

      const { user_id } = request.session;
      const foundUser = await userManager.readOne(user_id);

      if (foundUser) {
        return response.json({
          statusCode: 200,
          response: foundUser
        })
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
  
  async function update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updateUser = await userManager.update(id, data);
      return res.json({
        statusCode: 200,
        response: updateUser,
      });
    } catch (error) {
      return next(error);
    }
  }
  
  async function destroy(req, res, next) {
    try {
      const { id } = req.params;
      const deleteUser = await userManager.destroy(id);
      return res.json({
        statusCode: 200,
        response: deleteUser,
      });
    } catch (error) {
      return next(error);
    }
  }
  

export default usersRouter