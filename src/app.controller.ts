import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/events')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/all')
  getHello(): string {
    return this.appService.getHello();
  }


}
