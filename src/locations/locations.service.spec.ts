import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminLocationService } from './locations.service';

describe('LocationsService', () => {
  let service: SuperAdminLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperAdminLocationService],
    }).compile();

    service = module.get<SuperAdminLocationService>(SuperAdminLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
