import { Request, Response } from "express";
import { RESPONSE_TYPES } from "../../util/constants";
import { sendResponse } from "../../util/responses";
import { addTaskService, getAllTaskService, getSubTaskService, getTaskByIdService, updateTaskByIdService } from "./services";

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, parent_task_id } = req.body;

        if (parent_task_id) {
            const parentTask = await getTaskByIdService({ id: parent_task_id });

            if (!parentTask || !parentTask.rowCount) {
                return sendResponse(res, RESPONSE_TYPES.NOT_FOUND, {}, "Parent task not found");
            }
        }

        const task = await addTaskService({ title, parent_task_id });
        sendResponse(res, RESPONSE_TYPES.SUCCESS, task.rows[0]);

    } catch (error) {
        sendResponse(res, RESPONSE_TYPES.SERVER_ERROR, {}, "Server error", error);
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id, status } = req.body;

        const task = await getTaskByIdService({ id });

        if (!task || !task.rowCount) {
            return sendResponse(res, RESPONSE_TYPES.NOT_FOUND, {}, "Task not found");
        }

        const updatedTask = await updateTaskByIdService({ id, status });
        sendResponse(res, RESPONSE_TYPES.SUCCESS, updatedTask.rows[0]);

    } catch (error) {
        sendResponse(res, RESPONSE_TYPES.SERVER_ERROR, {}, "Server error", error);
    }
}

export const getAllTasks = async (_: Request, res: Response) => {
    try {
        const allTasks = await getAllTaskService();

        const tasks = [];

        allTasks.rows.forEach(task => {
            if (!task.parent_task_id) {
                tasks.push(task);
            } else {
                const parentTask = tasks.find(parentTask => parentTask.id === task.parent_task_id);

                if (parentTask) {
                    parentTask.sub_tasks = parentTask.sub_tasks || [];
                    parentTask.sub_tasks.push(task);
                }
            }
        })

        sendResponse(res, RESPONSE_TYPES.SUCCESS, tasks);

    } catch (error) {
        sendResponse(res, RESPONSE_TYPES.SERVER_ERROR, {}, "Server error", error);
    }
}

export const getAllSubTasks = async (req: Request, res: Response) => {
    try {
        const { parent_task_id } = req.params;

        const parentTasks = await getTaskByIdService({ id: parent_task_id });

        if (!parentTasks || !parentTasks.rowCount) {
            return sendResponse(res, RESPONSE_TYPES.NOT_FOUND, {}, "Task not found");
        }

        const subTasks = await getSubTaskService({ id: parent_task_id });

        sendResponse(res, RESPONSE_TYPES.SUCCESS, subTasks.rows);

    } catch (error) {
        sendResponse(res, RESPONSE_TYPES.SERVER_ERROR, {}, "Server error", error);
    }
}