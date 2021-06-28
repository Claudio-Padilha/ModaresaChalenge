import { dbQuerry, dbQueryFirst } from "../services/db"

export type StaffMember = {
    id: number,
    first_name: string,
    last_name: string
}

const insertStaffMember = async (staffMember: StaffMember) => {
    await dbQuerry(`INSERT INTO staff_members (first_name, last_name) VALUES(?, ?)`, [staffMember.first_name, staffMember.last_name])

    let resp: any = await dbQuerry(`SELECT seq AS newId FROM sqlite_sequence WHERE name='staff_members'`)

    return getStaffMember(resp[0].newId)
}

const getStaffMember = async (id: number) => {
    const ret = await dbQueryFirst(`SELECT * FROM staff_members WHERE id = ?`, [id]);
    return ret as StaffMember | undefined;
}

const listStaffMembers = async () => {
    const retorno = await dbQuerry(`SELECT * FROM staff_members`);
    return retorno as StaffMember[];
}

export const staffMemberModel = {
    insertStaffMember,
    listStaffMembers,
    getStaffMember
}