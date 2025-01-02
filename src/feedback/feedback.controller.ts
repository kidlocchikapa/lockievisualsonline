import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { Request } from 'express';
import { User } from 'src/auth/entities/auth.entity';

// Create an interface to extend the Express Request type
interface RequestWithUser extends Request {
  user: User;
}

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @Req() req: RequestWithUser
  ) {
    return this.feedbackService.create(createFeedbackDto, req.user);
  }

  @Get()
  async findAll() {
    return this.feedbackService.findAll();
  }
}