import { Injectable } from '@nestjs/common';
import { TaskService } from './task.service';

@Injectable()
export class AppService {
  constructor(private readonly taskService:TaskService){}
  async getStock(){
    await this.taskService.getStock()
  }
  getHello(): string {
    this.getStock()
    return 'Hello World!';
  }
}
