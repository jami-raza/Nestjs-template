import { Test, TestingModule } from '@nestjs/testing';
import { TimecardService } from './timecard.service';

describe('TimecardService', () => {
  let service: TimecardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimecardService],
    }).compile();

    service = module.get<TimecardService>(TimecardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
