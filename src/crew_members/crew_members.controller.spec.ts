import { Test, TestingModule } from '@nestjs/testing';
import { CrewMembersController } from './crew_members.controller';

describe('CrewMembersController', () => {
  let controller: CrewMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrewMembersController],
    }).compile();

    controller = module.get<CrewMembersController>(CrewMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
