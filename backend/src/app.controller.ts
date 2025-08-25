// import { Controller, Get } from '@nestjs/common';

// @Controller()
// export class AppController {
//   @Get()
//   getHello(): string {
//     return 'Backend NestJS sudah jalan!';
//   }
// }


import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return { message: 'Backend running OK', status: 'success' };
  }
}
