import { Injectable } from '@nestjs/common';
import { FeedbackRepository } from './feedback.repository';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class FeedbackService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  async create(createFeedbackDto: CreateFeedbackDto, user: User) {
    return this.feedbackRepository.create({
      ...createFeedbackDto,
      user
    });
  }

  async findAll() {
    return this.feedbackRepository.findAll();
  }
}
