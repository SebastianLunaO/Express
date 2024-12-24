import mysql from 'mysql2'

const psswd = process.env.password
const hosting = process.env.LHost
const user = process.env.UsedUSer
const MYSQL_nameDATABASE = process.env.DATABASENAME 

export const pool = mysql.createPool({
    host: hosting,
    user: 'root',
    password: 'Mausebas22',
    database: 'posting'
}).promise()


export async function getNotes(limit=50) {
    const result = await pool.query("SELECT * FROM post LIMIT ?;", limit);

    const rows = result[0];
    return rows
}




export async function getNote(id) {
    
    const [result] = await pool.query(`SELECT * 
        FROM post
        WHERE id = ?;`,id);
    const rows = result;
    
    return rows
}







export async function createNote(title) {
    const [result] = await pool.query(
        `INSERT INTO
        post (title) 
        VALUES (?)`, title 
    );
    const id = result.insertId
    return getNote(id) 
}

export async function updateNote(title,id) {
    const [result] = await pool.query(
        `UPDATE post
        SET title = ?
        WHERE id = ?`, [title,id]
    ); 
    return await getNote(id)
}



export async function rmPost(id) {
    const [result] = await pool.query(`DELETE 
        FROM post
        WHERE id = ?;`,id);

    const rows = result;
    return rows
}

export async function existID(id) {
    const [result] = await pool.query(
        `SELECT EXISTS (
    SELECT 1 
    FROM post
    WHERE id = ?);`,id
    ) 
    const jsonobj = result[0]
    const row = Object.values(jsonobj)[0]
    return row
}
