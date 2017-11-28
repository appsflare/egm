import { JsonController, Get } from 'routing-controllers';
import { GatewayService, IGatewayService } from '../../services';
import { Inject } from 'typedi';

@JsonController("/api/gateways")
export class GatewaysController {

  constructor( @Inject(GatewayService.type) private readonly gatewayService: IGatewayService) {
  }

  @Get()
  async getAll() {
    const result = await this.gatewayService.getAll();
    return result;
  }
}