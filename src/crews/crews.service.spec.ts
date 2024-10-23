import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminCrewService } from './crews.service';

describe('CrewsService', () => {
  let service: SuperAdminCrewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperAdminCrewService],
    }).compile();

    service = module.get<SuperAdminCrewService>(SuperAdminCrewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
