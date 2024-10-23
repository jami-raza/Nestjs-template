import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminJobService } from './jobs.service';

describe('JobsService', () => {
  let service: SuperAdminJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperAdminJobService],
    }).compile();

    service = module.get<SuperAdminJobService>(SuperAdminJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
