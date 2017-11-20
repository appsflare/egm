import "reflect-metadata";
import * as express from 'express';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
// import { Request, Response } from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as  logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';

import * as webpack from 'webpack';

import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as  webpackHotMiddleware from 'webpack-hot-middleware';
const webpackConfig = require('../webpack.config.dev.babel').default;

//import api from './routes/api';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

const distPath = path.resolve(__dirname, `../frontend/dist/${isProduction ? 'prod' : 'dev'}`);

Container.set("config", { distPath, port });

useContainer(Container);

const app = createExpressServer({
  classTransformer: true,
  controllers: [__dirname + "/controllers/*.js"]
});




const startListenOnPort = () => {
  // Start server listen on specific port
  app.listen(port, (error: string) => {
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


// Api router
//app.use('/api', api);distPath

if (isProduction) {

  // Server static files as usual
  const distPath = path.resolve(__dirname, '../frontend/dist/prod');
  app.use(express.static(distPath));
  app.use(favicon(`${distPath}/favicon.ico`));
  // app.get('*', (req: Request, res: Response) => {
  //   console.log(req.url);
  //   res.sendFile(`${distPath}/index.html`);
  // });
  startListenOnPort();
} else {

  let listend = false;
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    // The public URL of the output resource directory, should be the same as output.publicPath
    publicPath: webpackConfig.output.publicPath,
    // Colorful stats output
    stats: {
      colors: true,
    },
  }) as any;
  // Server static files through webpackDevMiddleware
  // const distPath = path.resolve(__dirname, '../frontend/dist/dev');
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  // app.get('*', (req: Request, res: Response) => {
  //   console.log(req.url);
  //   res.write(middleware.fileSystem.readFileSync(`${distPath}/index.html`));
  //   res.end();
  // });
  middleware.waitUntilValid(() => {
    if (!listend) {
      startListenOnPort();
      listend = true;
    }
  });
}
