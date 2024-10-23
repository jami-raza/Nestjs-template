import { Test, TestingModule } from '@nestjs/testing';
import { TimeCardBreakController } from './time-card_break.controller';

describe('TimeCardBreakController', () => {
  let controller: TimeCardBreakController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeCardBreakController],
    }).compile();

    controller = module.get<TimeCardBreakController>(TimeCardBreakController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
