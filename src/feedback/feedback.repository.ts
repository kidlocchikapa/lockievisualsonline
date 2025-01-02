import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackRepository {
  constructor(
    @InjectRepository(Feedback)
    private readonly repository: Repository<Feedback>
  ) {}

  async create(feedback: Partial<Feedback>): Promise<Feedback> {
    const newFeedback = this.repository.create(feedback);
    return this.repository.save(newFeedback);
  }

  async findAll(): Promise<Feedback[]> {
    return this.repository.find({
      relations: ['user']
    });
  }
}