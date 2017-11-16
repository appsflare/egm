"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require('../webpack.config.dev.babel').default;
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const distPath = path.resolve(__dirname, `../frontend/dist/${isProduction ? 'prod' : 'dev'}`);
typedi_1.Container.set("config", { distPath, port });
routing_controllers_1.useContainer(typedi_1.Container);
const app = routing_controllers_1.createExpressServer({
    classTransformer: true,
    controllers: [__dirname + "/controllers/*.js"]
});
const startListenOnPort = () => {
    app.listen(port, (error) => {
        if (error) {
            console.log(`\n${error}`);
        }
        console.log(`\nExpress: Listening on port ${port}, open up http://localhost:${port}/ in your broswer!\n`);
    });
};
if (isProduction) {
    app.use(helmet());
    app.disable('x-powered-by');
}
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '20mb',
}));
app.use(bodyParser.urlencoded({
    limit: '20mb',
    extended: true,
}));
app.use(cookieParser());
if (isProduction) {
    const distPath = path.resolve(__dirname, '../frontend/dist/prod');
    app.use(express.static(distPath));
    app.use(favicon(`${distPath}/favicon.ico`));
    startListenOnPort();
}
else {
    let listend = false;
    const compiler = webpack(webpackConfig);
    const middleware = webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
        },
    });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    middleware.waitUntilValid(() => {
        if (!listend) {
            startListenOnPort();
            listend = true;
        }
    });
}
//# sourceMappingURL=index.js.map