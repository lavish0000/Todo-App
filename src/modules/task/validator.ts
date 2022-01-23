import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { RESPONSE_TYPES } from '../../util/constants';
import { sendResponse } from '../../util/responses';

export const createTaskValidator = function (req: Request, res: Response, next: NextFunction) {

    console.info('API', req.protocol + '://' + req.get('host') + req.originalUrl);
    console.log('Body', JSON.stringify(req.body));

    const schema = Joi.object().keys({
        title: Joi.string().required(),
        parent_task_id: Joi.number().integer().allow(null),
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
        console.error(validation.error);
        sendResponse(res, RESPONSE_TYPES.VALIDATION_ERROR, {}, validation.error.details[0].message);
        return;
    }
    next();
};

export const updateTaskValidator = function (req: Request, res: Response, next: NextFunction) {

    console.info('API', req.protocol + '://' + req.get('host') + req.originalUrl);
    console.log('Body', JSON.stringify(req.body));

    const schema = Joi.object().keys({
        id: Joi.number().integer().required(),
        status: Joi.string().valid('completed').required(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
        console.error(validation.error);
        sendResponse(res, RESPONSE_TYPES.VALIDATION_ERROR, {}, validation.error.details[0].message);
        return;
    }
    next();
}

export const getAllSubTasksValidator = function (req: Request, res: Response, next: NextFunction) {

    console.info('API', req.protocol + '://' + req.get('host') + req.originalUrl);
    console.log('Body', JSON.stringify(req.params));

    const schema = Joi.object().keys({
        parent_task_id: Joi.number().integer().required(),
    });

    const validation = schema.validate(req.params);

    if (validation.error) {
        console.error(validation.error);
        sendResponse(res, RESPONSE_TYPES.VALIDATION_ERROR, {}, validation.error.details[0].message);
        return;
    }
    next();
}
