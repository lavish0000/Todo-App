import { executeQuery } from "../../DB/sqlLib";
import { dynamicObjectInterface } from "../../util/types";

export const addTaskService = function (opts: dynamicObjectInterface = {}) {
        const query = `INSERT INTO tasks (title, parent_task_id) VALUES ($1, $2) RETURNING *`;
        const params = [opts.title, opts?.parent_task_id];

        return executeQuery('Add Task', query, params);
};

export const getTaskByIdService = function (opts: dynamicObjectInterface) {
        const query = `SELECT * FROM tasks WHERE id = $1`;
        const params = [opts.id];

        return executeQuery('Get Task By Id', query, params);
};

export const updateTaskByIdService = function (opts: dynamicObjectInterface) {
        const query = `UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *`;
        const params = [opts.status, opts.id];

        return executeQuery('Update Task', query, params);
};

export const getAllTaskService = function () {
        const query = `SELECT * FROM tasks ORDER BY id`;
        const params = [];

        return executeQuery('Get Parent Task', query, params);
};

export const getSubTaskService = function (opts: dynamicObjectInterface) {
        const query = `SELECT * FROM tasks WHERE parent_task_id = $1`;
        const params = [opts.id];

        return executeQuery('Get Sub Task', query, params);
}
