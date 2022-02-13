import * as express from 'express';
import catsRouter from './cats/cats.route';

class Server {
    constructor(public app: express.Application, public port: number) {
        this.app = app;
        this.port = port;
    }

    private setRoute() {
        this.app.get('/', (req, res) => {
            res.send({
                message: 'hello!!',
            });
        });
        this.app.use(catsRouter);
    }

    private setMiddleware() {
        // logging middleware
        this.app.use((req, res, next) => {
            console.log(req.rawHeaders[1]);
            next();
        });

        // json middleware
        this.app.use(express.json());

        this.setRoute();

        // 404 not found
        this.app.use((req, res, next) => {
            console.log('This is error middleware');
            res.send({ error: '404 not founde error' });
        });
    }

    public listen() {
        this.setMiddleware();
        this.app.listen(this.port, () => {
            console.log(
                `Example app listening at http://localhost:${this.port}`
            );
        });
    }
}

function run() {
    const server = new Server(express(), 8000);
    server.listen();
}

run();
