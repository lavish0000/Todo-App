import { routesGenerator } from "../../util/commonFunctions";
import { HTTP_METHODS, routeInterface } from "../../util/types";
import { createTask, getAllSubTasks, getAllTasks, updateTask } from "./controller";
import { createTaskValidator, getAllSubTasksValidator, updateTaskValidator } from "./validator";

const routes: routeInterface [] = [
    {
        path: '/create',
        method: HTTP_METHODS.POST,
        handler: createTask,
        middlewares: [createTaskValidator],

    },
    {
        path: '/update',
        method: HTTP_METHODS.PUT,
        handler: updateTask,
        middlewares: [updateTaskValidator],
    },
    {
        path: '/getAllTasks',
        method: HTTP_METHODS.GET,
        handler: getAllTasks
    },
    {
        path: '/getAllSubTasks/:parent_task_id',
        method: HTTP_METHODS.GET,
        handler: getAllSubTasks,
        middlewares: [getAllSubTasksValidator],
    }
];

export default routesGenerator(routes);