import { Test, TestingModule } from '@nestjs/testing';
import { TimeCardBreakService } from './time-card_break.service';

describe('TimeCardBreakService', () => {
  let service: TimeCardBreakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeCardBreakService],
    }).compile();

    service = module.get<TimeCardBreakService>(TimeCardBreakService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
