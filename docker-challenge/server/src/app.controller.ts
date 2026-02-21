import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('up')
  up() {
    return this.appService.up()
  }

  @Get('down')
  down() {
    return this.appService.down()
  }
}
