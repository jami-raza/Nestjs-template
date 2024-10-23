import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminCrewMemberService } from './crew_members.service';

describe('CrewMembersService', () => {
  let service: SuperAdminCrewMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperAdminCrewMemberService],
    }).compile();

    service = module.get<SuperAdminCrewMemberService>(SuperAdminCrewMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
