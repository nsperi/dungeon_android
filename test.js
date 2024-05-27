server.get('/api/products', async (req, res) =>{
    try {
        const {category} = req.query
        const all = await productManager.read(category)
        if(all.length !== 0){
            return res.json({
                statusCode: 200,
                response: all,
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.json({
            statusCode: error.statusCode || 500,
            message: error.message || "API ERROR",
        })
    }
})

server.get('/api/products/:pid', async (req, res) =>{
    try {
        const {pid} = req.params;
        const one = await productManager.readOne(pid);
        if (one) {
            return res.json({
                statusCode: 200,
                response: one,
            });
        } else {
            const error = new Error("Not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return res.json({
            statusCode: error.statusCode || 500,
            message: error.message || "API ERROR",
          });
    }
});

const create = async (req, res) =>{
    try {
        const data = req.body;
        const one = await productManager.create(data);
        return res.json({
            statusCode: 201,
            message: 'Created ID: ' + one.id,
        });
    } catch (error) {
        return res.json({
            statusCode: error.statusCode || 500,
            message: error.message || "API ERROR",
        });
    }
};

const update = async (req, res) =>{
    try {
        const {pid} = req.params
        const data = req.body
        const one = await productManager.update(pid, data)
        return res.json({
            statusCode: 200,
            response: one
        })
    } catch (error) {
        return res.json({
            statusCode: error.statusCode || 500,
            message: error.message || "API ERROR",
        });
    }
};

const destroy = async (req, res) =>{
    try {
        const {pid} = req.params
        const one = await productManager.destroy(pid)
        return res.json({
            statusCode: 200,
            response: one
        })
    } catch (error) {
        return res.json({
            statusCode: error.statusCode || 500,
            message: error.message || "API ERROR",
        });
    }
}

//router users
server.get('/api/users', async (req, res) =>{
    try {
        const {id} = req.query
        const all = await userManager.read(id)
        if(all.length !== 0){
            return res.status(200).json({
                res: all,
                id,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            res: error.message,
            success: false
        })
    }
})

server.get('/api/users/:uid', async (req, res) =>{
    try {
        const {uid} = req.params;
        const one = await userManager.readOne(uid);
        if (one) {
            return res.json({
                statusCode: 200,
                response: one,
            });
        } else {
            const error = new Error("Not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return res.json({
            statusCode: error.statusCode || 500,
            message: error.message || "API ERROR",
          });
    }
});




server.post('/api/products', create);
server.put('/api/products/:pid', update);
server.delete('/api/products/:pid', destroy);