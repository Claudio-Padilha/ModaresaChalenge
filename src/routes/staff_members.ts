import { Router } from 'express'
import { staffMemberController } from '../controllers/staff_member'

const staffMemberRouter = Router();
staffMemberRouter.post('/', staffMemberController.insertStaffMember);
staffMemberRouter.get('/', staffMemberController.listStaffMembers);

export { 
    staffMemberRouter,
}