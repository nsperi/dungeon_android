function pathHander(req, res, next){
    return res.json({
        statusCode: 404,
        message: `${req.method} ${req.url} not found path`,
    })
}

export default pathHander