import { Controller, Get, Res } from 'ts-express-decorators';
import { Response } from 'express';
import { Inject } from 'typedi';

@Controller('*')
export class ClientController {

    constructor( @Inject("config") private readonly config: any) { }


    @Get('*')
    serve( @Res() res: Response) {
        res.sendFile(`${this.config.distPath}/index.html`);
        return res;
    }
}
