import { dbQuerry, dbQueryFirst } from "../services/db"

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
    const retorno = await dbQuerry(`SELECT * FROM appointments`);
    return retorno as Appointment[];
}

export const appointmentModel = {
    insertAppointment,
    listAppointments
}