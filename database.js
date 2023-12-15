import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()

export async function getNotes() {
    const result = await pool.query('select * from notes')
    return result[0]
}
export async function getNote(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM notes
    WHERE id = ?
    `, [id]);
    return rows[0];
}

export async function createNote(title, description) {
    const [result] = await pool.query(`
    INSERT INTO notes (title,contents)
    VALUES (?,?)
    `, [title, description])

    return getNote(result.insertId);
}

const notes = await getNote(1);
const created = await createNote('third one', 'this is my title using js');
console.log(created);