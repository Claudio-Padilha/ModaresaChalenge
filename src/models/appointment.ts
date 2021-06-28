import { dbQuerry, dbQueryFirst } from "../services/db"

import {staffMemberModel} from "./staff_member"
import {clientModel} from "./client"

const { getStaffMember } = staffMemberModel

const { getClient } = clientModel

export type Appointment = {
    id: number,
    client: number,
    staff_member: number,
    start: Date,
    end: Date
}

const insertAppointment = async (appointment: Appointment) =>{

    await dbQuerry(`INSERT INTO appointments (client, staff_member, start, end) VALUES(?, ?, ?, ?)`, [appointment.client, appointment.staff_member, appointment.start, appointment.end])

    let resp = await dbQuerry(`SELECT seq AS newId FROM sqlite_sequence WHERE name='appointments'`)
    return getAppointment(resp[0].newId)
}

const getAppointment = async (id: number) => {
    const ret = await dbQueryFirst(`SELECT * FROM appointments WHERE id = ?`, [id]);
    return ret as Appointment | undefined;
}

const listAppointments = async () => {
    let ret: any[] = []
    const appointments: any = await dbQuerry(`SELECT * FROM appointments`);

    for (let i =0; i< appointments.length; i++){
        let client = await getClient(appointments[i].client)
        let staff_member = await getStaffMember(appointments[i].staff_member)

        ret.push(
            {
                id: appointments[i].id,
                client: {
                    name: client.name,
                    id: client.id
                },
                staff_member: {
                    first_name: staff_member.first_name,
                    last_name: staff_member.last_name,
                    id: staff_member.id
                },
                start: appointments[i].start,
                end:appointments[i].end
            }
        )
    }

    return ret;
}

export const appointmentModel = {
    insertAppointment,
    listAppointments
}