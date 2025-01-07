// src/feedback/feedback.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { User } from 'src/auth/entities/auth.entity';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto, user: User | null) {
    try {
      // Create a new feedback entity
      const feedback = this.feedbackRepository.create({
        content: createFeedbackDto.content,
        user: user || null,
      });

      // Save to database
      const savedFeedback = await this.feedbackRepository.save(feedback);
      return savedFeedback;
    } catch (error) {
      console.error('Error saving feedback:', error);
      throw error;
    }
  }

  async findAll() {
    return this.feedbackRepository.find({
      relations: ['user'], // Include user relation if needed
      order: {
        createdAt: 'DESC',
      },
    });
  }
}