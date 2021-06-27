import { Request, Response } from 'express'
import { StaffMember, staffMemberModel } from '../models/staff_member'
import { badRequest, internalServerError } from '../services/utils'

const insertStaffMember = async (req: Request, res: Response) => {
    
    const staff_member_req = req.body
    
    if (!staff_member_req)
        return badRequest(res, "You should inform a staff member!")

    if (!staff_member_req.first_name)
        return badRequest(res, "You should inform the staff member first name!")

    if (!staff_member_req.last_name)
        return badRequest(res, "You should inform the staff member last name!")

    const staff_member = req.body as StaffMember
    return staffMemberModel.insertStaffMember(staff_member)
    .then(staff_member => {
        res.json(staff_member)
    })
    .catch(err => internalServerError(res, err))
}

const listStaffMembers = ({}: Request, res: Response) => {
    staffMemberModel.listStaffMembers()
        .then(staff_members => {
            res.json(staff_members)
        })
        .catch(err => internalServerError(res, err));
}

export const staffMemberController = {
    insertStaffMember,
    listStaffMembers
}