import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminEmployeeService } from './employees.service';

describe('EmployeesService', () => {
  let service: SuperAdminEmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperAdminEmployeeService],
    }).compile();

    service = module.get<SuperAdminEmployeeService>(SuperAdminEmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
