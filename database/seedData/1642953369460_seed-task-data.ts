/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        INSERT INTO 
        tasks 
        (id, title, status, parent_task_id, created_at) 
        VALUES 
        (1, 'Task 1', 'pending', NULL, now()), 
        (2, 'Task 2', 'completed', NULL, now()),
        (3, 'Task 3', 'completed', NULL, now()),
        (4, 'Task 4', 'pending', NULL, now()),
        (5, 'Subtask 1', 'pending', 1, now()),
        (6, 'Subtask 2', 'pending', 1, now()),
        (7, 'Subtask 3', 'pending', 1, now()),
        (8, 'Subtask 4', 'pending', 1, now()),
        (9, 'Subtask 5', 'pending', 1, now()),
        (10, 'Subtask 1', 'completed', 2, now()),
        (11, 'Subtask 2', 'pending', 2, now()),
        (12, 'Subtask 3', 'completed', 2, now()),
        (13, 'Subtask 1', 'completed', 3, now())
    `)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        DELETE FROM tasks 
        WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13)
    `)
}
