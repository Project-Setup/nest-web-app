import { Controller, Get, Res, Req } from '@nestjs/common';
import {} from '@nestjs/platform-fastify';
import { ViewService } from './view.service';
import { FastifyRequest, FastifyReply } from 'fastify';

@Controller()
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('*')
  async static(@Req() req: FastifyRequest, @Res() reply: FastifyReply) {
    Object.entries(reply.getHeaders()).forEach(([headerName, headerValue]) => {
      reply.raw.setHeader(headerName, headerValue);
    });

    const handle = this.viewService.getNextServer().getRequestHandler();
    await handle(req.raw, reply.raw);
    reply.sent = true;
  }
}
