import { Router } from "express";
//import productsManager from "../../data/fs/productsManager.js";
import productManager from "../../data/mongo/ProductManager.mongo.js";
import uploader from "../../middlewares/multer.mid.js";
import productFieldsValidate from "../../middlewares/productFieldsValidate.mid.js";

const productsRouter = Router();

productsRouter.get("/", paginate);
productsRouter.get("/:pid", readOne);
productsRouter.post("/", uploader.single('photo'), productFieldsValidate, create);
productsRouter.put("/:pid", update);
productsRouter.delete("/:pid", destroy);

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await productManager.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function paginate(req, res, next) {
  try {
    const sortAndPaginate = {}
    req.query.limit && (sortAndPaginate.limit = req.query.limit)
    req.query.page && (sortAndPaginate.page = req.query.page)
    req.query.prevPage && (sortAndPaginate.prevPage = req.query.prevPage)
    req.query.nextPage && (sortAndPaginate.nextPage = req.query.nextPage )

    const filter = {}
    req.query.category && (filter.category = req.query.category)

    const result = await productManager.paginate({filter, sortAndPaginate})
    let products = result.docs.map( product => product.toObject())

    //Defino el objeto pagination con las propiedades de paginate
    // let pagination = {}
    // pagination.page = result.page
    // pagination.totalPages = result.totalPages
    // pagination.prevPage = result.prevPage
    // pagination.nextPage = result.nextPage

    // return response.json({
    //     statusCode: 200,
    //     response: products,
    //     pagination
    // })

    let page = result.page
    let prevPage = result.prevPage
    let nextPage = result.nextPage

    return res.render('products', {products, page, prevPage, nextPage} )
    
} catch (error) {
    return next(error)
}
}

async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await productManager.readOne(nid);
    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
      });
    } else {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { nid } = req.params;
    const data = req.body;
    const one = await productManager.update(nid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await productManager.destroy(nid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

export default productsRouter;
