/* eslint-disable camelcase */

import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createType('task_status', ['pending', 'completed']);
    pgm.createTable("tasks", {
        id: {
            type: "id",
            primaryKey: true,
        },
        title: {
            type: "varchar(1000)",
            notNull: true
        },
        status: {
            type: "task_status",
            notNull: true,
            default: "pending"
        },
        parent_task_id: {
            type: "integer",
            references: "tasks",
            referencesConstraintName: "tasks_task_id_fkey",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            notNull: false,
            default: null,
        },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp")
        }
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("tasks");
    pgm.dropType("task_status");
};
