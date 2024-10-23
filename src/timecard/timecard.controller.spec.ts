import { Test, TestingModule } from '@nestjs/testing';
import { TimecardController } from './timecard.controller';

describe('TimecardController', () => {
  let controller: TimecardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimecardController],
    }).compile();

    controller = module.get<TimecardController>(TimecardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
