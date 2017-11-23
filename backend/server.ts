import "reflect-metadata";
import "./models";
import * as express from 'express';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { Request, Response } from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as  logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import { toArray } from './lib';
import * as Controllers from './controllers';

import * as webpack from 'webpack';

import * as webpackDevMiddleware from 'webpack-dev-middleware';
import { WebpackDevMiddleware } from 'webpack-dev-middleware';
import * as  webpackHotMiddleware from 'webpack-hot-middleware';

const webpackConfig = require('../webpack.config.dev.babel');

useContainer(Container);

require('mongoose').Promise = Promise;

interface ServerOptions {
    db: string;
    isProduction: boolean;
    distPath: string;
    port: number
}

export class Server {
    private readonly middlewares = new Array<any>();
    private webpackMiddleware: WebpackDevMiddleware;
    private started: boolean = false;
    private app: any;

    constructor(private readonly options: ServerOptions) {
        Container.set("config", this.options);
    }

    get isProd() {
        return this.options.isProduction === true;
    }

    private use(...middlewares: Array<any>) {
        this.middlewares.push(middlewares)
    }

    private create() {

        const app = createExpressServer({
            classTransformer: false,            
            controllers: toArray(Controllers),
        });

        this.middlewares.forEach(m => app.use(m));

        app.get('*', (req: Request, res: Response) => {
            const { distPath } = this.options;
            console.log(req.url);

            res.sendFile(`${distPath}/index.html`);
        });

        if (this.isProd) {
            app.disable('x-powered-by');
        }

        this.app = app;
    }

    private addCommonMiddlewares() {
        if (this.isProd) {
            this.use(helmet());
        }
        this.use(
            compression(),
            logger('dev'),
            bodyParser.json({
                limit: '20mb',
            }),
            bodyParser.urlencoded({
                limit: '20mb',
                extended: true,
            }),
            cookieParser()
        );
    }

    private addProdMiddlewares() {
        if (!this.isProd) {
            return;
        }

        console.log('adding prod middlewares');
        // Server static files as usual
        const distPath = path.resolve(__dirname, '../frontend/dist/prod');
        this.use(
            express.static(distPath),
            favicon(`${distPath}/favicon.ico`)
        );
    }

    private addDevMiddlewares() {

        if (this.isProd) {
            return;
        }

        const compiler = webpack(webpackConfig);
        this.webpackMiddleware = webpackDevMiddleware(compiler, {
            // The public URL of the output resource directory, should be the same as output.publicPath
            publicPath: webpackConfig.output.publicPath,
            // Colorful stats output
            stats: {
                colors: true,
            },
        });

        this.use(
            this.webpackMiddleware,
            webpackHotMiddleware(compiler)
        );

    }

    private async beforeStart(): Promise<any> {
        await mongoose.connect(this.options.db, { useMongoClient: true });
        return new Promise((resolve) => {

            if (!this.webpackMiddleware) {
                resolve(true);
            }

            this.webpackMiddleware.waitUntilValid(() => {
                if (this.started) { return; }

                resolve(true);
            });
        });
    }

    registerDependency(key: any, value: any) {
        Container.set(key, value);
    }

    async start() {
        this.addCommonMiddlewares();
        this.addDevMiddlewares();
        this.addProdMiddlewares();

        await this.beforeStart();
        this.create();

        const { port } = this.options;
        // Start server listen on specific port
        this.app.listen(port, (error: string) => {
            if (error) {
                console.log(`\n${error}`);
                return;
            }
            console.log(`\nExpress: Listening on port ${port}, open up http://localhost:${port}/ in your broswer!\n`);
        });
        this.started = true;
    }
}