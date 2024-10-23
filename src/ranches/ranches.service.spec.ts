import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminRanchService } from './ranches.service';

describe('RanchesService', () => {
  let service: SuperAdminRanchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperAdminRanchService],
    }).compile();

    service = module.get<SuperAdminRanchService>(SuperAdminRanchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
