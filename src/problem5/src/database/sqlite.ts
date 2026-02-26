import sqlite3 from 'sqlite3';
import path from 'path';
import { logger } from '../utils/logger';

const dbPath = process.env.DB_PATH || path.resolve(__dirname, '../../resources.db');

export const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        logger.error(`Error connecting to the database: ${err.message}`);
    } else {
        logger.info('Connected to the SQLite database.');
        // Initialize the table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS resources (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            category TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

// Helper to run SQL queries that write data
export const runQuery = (query: string, params: unknown[] = []): Promise<{ id: number; changes: number }> => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, changes: this.changes });
            }
        });
    });
};

// Helper for selecting multiple rows
export const getAllRows = <T>(query: string, params: unknown[] = []): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows: T[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Helper for selecting a single row
export const getRow = <T>(query: string, params: unknown[] = []): Promise<T | undefined> => {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row: T) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};
