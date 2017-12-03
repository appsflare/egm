import { Authenticated,  Controller, Get } from 'ts-express-decorators';
import { GatewayService, IGatewayService } from '../../services';
import { Inject } from 'typedi';

@Controller("/api/gateways")
@Authenticated()
export class GatewaysController {

  constructor( @Inject(GatewayService.type) private readonly gatewayService: IGatewayService) {
  }

  @Get('')
  async getAll() {
    const result = await this.gatewayService.getAll();
    return result;
  }
}