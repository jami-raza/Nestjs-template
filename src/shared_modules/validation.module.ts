import { IsCustomerMembersConstraint } from 'src/crews/constraints/customer_members.constraint';
import { IsCustomerSupervisorConstraint } from 'src/crews/constraints/customer_superVisor.constraint';
import { IsCrewSupervisorAlreadyExistConstraint } from 'src/crews/constraints/duplicate.contraint';
import { IsCustomerMembersAlreadyExistConstraint } from 'src/crews/constraints/isemployee_alreadyexists.constraint';
import { IsSupervisorNotExistConstraint } from 'src/crews/constraints/issupervisor_notexists.constraint';
// import { IsCustomerAlreadyExistConstraint } from 'src/customer/constraints/duplicate-validation.constraints';
// import { IsCustomerNotExistConstraint } from 'src/customer/constraints/not-exist-validation.constraint';
import { IsRanchConstraint } from 'src/locations/constraints/isRanch.constraint';
import {
  IsRoleAlreadyExistConstraint,
  IsRoleNotExistConstraint,
} from 'src/roles/constraints/validation-constraints';
import { IsUserNotAdminConstraint } from 'src/users/constraints/is_admin_validation.constraint';
import { IsUserNotExistConstraint } from 'src/users/constraints/not_exist_validation.constraint';
import { IsUserAlreadyExistConstraint } from 'src/users/constraints/validation_constraints';
import { IsValidUUIDConstraint } from 'src/utils/constraints/uuid.constraint';



export const ValidationModule = [
    IsUserAlreadyExistConstraint,
    IsRoleAlreadyExistConstraint,
    IsRoleNotExistConstraint,
    // IsCustomerAlreadyExistConstraint,
    IsUserNotExistConstraint,
    IsUserNotAdminConstraint,
    // IsCustomerNotExistConstraint,
    IsCrewSupervisorAlreadyExistConstraint,
    IsCustomerSupervisorConstraint,
    IsCustomerMembersConstraint,
    IsValidUUIDConstraint,
    IsRanchConstraint,
    IsCustomerMembersAlreadyExistConstraint,
    IsSupervisorNotExistConstraint
]

