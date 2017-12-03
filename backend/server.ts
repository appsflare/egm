import "reflect-metadata";
import "./models";
import * as express from 'express';
import { ServerLoader, GlobalAcceptMimesMiddleware, ServerSettings } from 'ts-express-decorators';
import { Container } from 'typedi';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as  logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as session from 'express-session';


import * as Controllers from './controllers';

import * as webpack from 'webpack';

import * as webpackDevMiddleware from 'webpack-dev-middleware';
import { WebpackDevMiddleware } from 'webpack-dev-middleware';
import * as  webpackHotMiddleware from 'webpack-hot-middleware';
import { PassportInitializer } from "./passport-initializer";

const webpackConfig = require('../webpack.config.dev.babel');


require('mongoose').Promise = Promise;

interface ServerOptions {
    db: string;
    isProduction: boolean;
    distPath: string;
    port: number
}

@ServerSettings({})
export class Server extends ServerLoader {    

    private webpackMiddleware: WebpackDevMiddleware;
    private started: boolean = false;
    private app: any;

    constructor(private readonly options: ServerOptions) {
        super();
        this.registerDependency("config", this.options);
    }

    get isProd() {
        return this.options.isProduction === true;
    }

    $onInit(): Promise<any> {
        return this.beforeStart();
    }

    async $onMountingMiddlewares(): Promise<any> {
        this.addCommonMiddlewares();
        this.addDevMiddlewares();
        this.addProdMiddlewares();

        await this.beforeStart();


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


    private addCommonMiddlewares() {
        if (this.isProd) {
            this.use(helmet());
        }

        const initializer = Container.get(PassportInitializer);
        initializer.initialize();

        this.use(
            GlobalAcceptMimesMiddleware,
            compression(),
            logger('dev'),
            bodyParser.json({
                limit: '20mb',
            }),
            // bodyParser.urlencoded({
            //     limit: '20mb',
            //     extended: true,
            // }),
            cookieParser(),
            session({ cookie: { httpOnly: true }, resave: true, saveUninitialized: true, secret: '324dewerwer2' }),
            passport.initialize(),
            passport.session()
        );


    }

    private addProdMiddlewares() {
        if (!this.isProd) {
            return;
        }
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
    
}