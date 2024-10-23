import { Test, TestingModule } from '@nestjs/testing';
import { RanchesController } from './ranches.controller';

describe('RanchesController', () => {
  let controller: RanchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RanchesController],
    }).compile();

    controller = module.get<RanchesController>(RanchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
