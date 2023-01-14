const db = require('./database');

async function test() {
    try {
        await db.open();
        const conn = db.getConnection();
        const rows = await conn.query("SELECT 1 as val");
        console.log(rows); //[ {val: 1}, meta: ... ]
    } catch (err) {
        throw err;
    } finally {
        await db.close();
    }
}

test();