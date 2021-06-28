import { Response } from 'express'
import { Appointment } from '../models/appointment'
import { dbQuerry } from './db'

export const badRequest = (res: Response, err: string) => {
    res.status(400).json({
        err
    })
}

export const internalServerError = (res: Response, err: Error) => 
    res.status(500).json({
        err: err.message
    })

export const appointmentAlreadyExists = async (appointmet: Appointment) => {
    let existing_appointment: any = await dbQuerry('SELECT * from appointments WHERE client=' + String(appointmet.client) +' AND staff_member=' + String(appointmet.staff_member))

    if (existing_appointment.length > 0){
        return true
    }

    return false
}

export const validClient = async (client: Number) => {
    let existing_client = await dbQuerry('SELECT * from clients WHERE id='+ client)



    if (existing_client.length > 0){
        return true
    }

    return false
}

export const validStaffMember = async (staff_member: Number) => {
    let existing_staff_member = await dbQuerry('SELECT * from staff_members WHERE id='+ staff_member)

    if (existing_staff_member.length > 0){
        return true
    }

    return false
}

export const validAppointment = async (appointment: Number) => {
    let existing_appointment = await dbQuerry('SELECT * from appointments WHERE id='+ appointment)

    if (existing_appointment.length > 0){
        return true
    }

    return false
}