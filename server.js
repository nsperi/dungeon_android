const server = express();
const port = 8080;
const ready = async () => {
    console.log("server ready on port " + port);
    await dbConnect();
}
const nodeServer = createServer(server)
server.listen(port, ready);
const socketServer = new Server(nodeServer)
socketServer.on("connection", socketCb);

server.engine("handlebars",engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname+'/src/views')
server.use(express.static(path.join(__dirname, 'public')))

//middlewaress
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));
server.use(session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000},
}));

//endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHander);