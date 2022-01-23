/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        INSERT INTO 
        tasks 
        (title, status, parent_task_id, created_at) 
        VALUES 
        ('Task 1', 'pending', NULL, now()), 
        ('Task 2', 'completed', NULL, now()),
        ('Task 3', 'completed', NULL, now()),
        ('Task 4', 'pending', NULL, now()),
        ('Subtask 1', 'pending', 1, now()),
        ('Subtask 2', 'pending', 1, now()),
        ('Subtask 3', 'pending', 1, now()),
        ('Subtask 4', 'pending', 1, now()),
        ('Subtask 5', 'pending', 1, now()),
        ('Subtask 1', 'completed', 2, now()),
        ('Subtask 2', 'pending', 2, now()),
        ('Subtask 3', 'completed', 2, now()),
        ('Subtask 1', 'completed', 3, now())
    `)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        DELETE FROM tasks 
        WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13)
    `)
}
