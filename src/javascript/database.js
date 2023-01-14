require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD,
    connectionLimit: 5
});

const connection = {
    conn: undefined,
    open: false,
};

const Database = {
    async open() {
        try {
            connection.conn = await pool.getConnection();
            connection.open = true;
        } catch (err) {
            throw err;
        }
    },
    async close() {
        if (connection.open) {
            try {
                await connection.conn.end();
                connection.open = false;
            } catch (err) {
                throw err;
            }
        }
    },
    getConnection() {
        if (connection.open) return connection.conn;
        else {
            console.log('Conexão fechada... Tente abrir a connexão com a função open()');
            return undefined;
        }
    }
};

module.exports = Database;