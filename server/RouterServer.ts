import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import * as cors from 'cors'
import { Server } from '@overnightjs/core';
import Logger from 'jet-logger';
import {NextFunction, Request, Response} from 'express';
import postgres from './postgres'


const options: cors.CorsOptions = {
    credentials: true,
    origin: '*',
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false
}
const Postgres = postgres()

class NormalRouterServer extends Server {

    private readonly FRONT_END_MSG = 'OvernightJS with standard express router started.';
    private readonly START_MSG = 'OvernightJS with standard express router started on port: ';


    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(cors(options))
        this.setupControllers();
        // error handler
        this.app.use((err: any, _: Request, res: Response, __: NextFunction) => {
            const status = err.status || 500
            res.status(status)
            const response = {
                error: err.message,
                code: err.code,
                stack: status > 499
                  ? err.stack
                  : undefined
            }
            res.json(response)
        })
    }


    private setupControllers(): void {
        const controllerInstances = [];
        for (const name of Object.keys(controllers)) {
            const controller = (controllers as any)[name];
            if (typeof controller === 'function') {
                controllerInstances.push(new controller());
            }
        }
        super.addControllers(controllerInstances);
    }

    public async checkPostgres () {
        const res = await Postgres.query('SELECT NOW()')
        return res
    }


    public start(port?: number): void {
        port = port || 3000;
        this.app.use((_: Request, res: Response) => {
            res.status(404).json({
                message: '0_o Route not found'
            })
        })
        this.app.listen(port, () => {
            Logger.Imp(this.START_MSG + port);
        });
    }
}

export default NormalRouterServer;
