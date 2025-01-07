import { Controller, Post, Body, UseGuards, Req, Get, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { Request } from 'express';
import { User } from 'src/auth/entities/auth.entity';
import { Public } from '../auth/decolators/public.decolator'; // You'll need to create this

// Create an interface to extend the Express Request type
interface RequestWithUser extends Request {
  user?: User; // Make user optional
}

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // Make the create endpoint public
  @Public()
  @Post()
  async create(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @Req() req: RequestWithUser
  ) {
    // Handle both authenticated and unauthenticated feedback
    return this.feedbackService.create(createFeedbackDto, req.user || null);
  }

  // Keep the get endpoint protected
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.feedbackService.findAll();
  }
}