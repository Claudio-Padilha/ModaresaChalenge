import { Router } from 'express'
import { appointmentController } from '../controllers/appointment'

const appointmentRouter = Router();
appointmentRouter.post('/', appointmentController.insertAppointment);
appointmentRouter.get('/', appointmentController.listAppointments);

export { 
    appointmentRouter,
}