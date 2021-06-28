import { Request, Response } from 'express'
import { Appointment, appointmentModel } from '../models/appointment'
import { badRequest, internalServerError } from '../services/utils'

import { appointmentAlreadyExists, validStaffMember, validClient } from "../services/utils"

const insertAppointment = async (req: Request, res: Response) => {
    const appointment_req = req.body

    if (!appointment_req)
        return badRequest(res, "You should inform a appointment!")

    if (!appointment_req.client)
        return badRequest(res, "You should inform the appointment's client!")
    
    
    if (! await validClient(appointment_req.client))
        return internalServerError(res, Error( "Client doesn't exist!"))
    
    
    if (!appointment_req.staff_member)
        return badRequest(res, "You should inform the appointment's staff member!")

    
    if (! await validStaffMember(appointment_req.staff_member))
        return internalServerError(res, Error( "Staff member doesn't exist!"))

    
    if (!appointment_req.start)
        return badRequest(res, "You should inform the appointment's start date!")
    
    
    if (!appointment_req.end)
        return badRequest(res, "You should inform the appointment's end date!")

    
    // if (await appointmentAlreadyExists(req.body))
    //     return internalServerError(res, Error( "Appointment already exists!"))

    console.log("QUEBREIIIIIIIIIIIIIIIIIIIIIIIIIIs")
    const appointment = req.body as Appointment

    return appointmentModel.insertAppointment(appointment)
    .then(appointment => {
        res.json(appointment)
    })
    .catch(err => internalServerError(res, err))
}

const listAppointments = ({}: Request, res: Response) => {
    appointmentModel.listAppointments()
        .then(appointments => {
            res.json(appointments)
        })
        .catch(err => internalServerError(res, err));
}

export const appointmentController = {
    insertAppointment,
    listAppointments
}