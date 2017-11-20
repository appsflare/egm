import { JsonController, Get } from 'routing-controllers';

@JsonController("/api/gateways")
export class GatewaysController {

  @Get("/list")
  getList() {
    return [{ name: "default" }];
  }
}