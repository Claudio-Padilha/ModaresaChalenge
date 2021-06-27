import { Application } from "express";
import Router from 'express';
import { clientRouter } from "./client";
import { staffMemberRouter } from "./staff_members";
import { appointmentRouter } from "./appointment";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/clients', clientRouter);
    apiRouter.use('/staffMembers', staffMemberRouter);
    apiRouter.use('/appointments', appointmentRouter);

    app.use('/api', apiRouter);
}
