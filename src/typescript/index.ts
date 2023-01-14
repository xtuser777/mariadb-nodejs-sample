import Database from "./database";

async function test(): Promise<void> {
    const db = Database.instance as Database;
    try {
        if (await db.open()) {
            const conn = db.getConnection();
            if (conn) {
                // const res = await conn.query("INSERT INTO sample_table(sam_description) VALUES(?)", ['Sample1']);
                // console.log(res.insertId);
                
                const rows = await conn.query("SELECT * FROM sample_table;");
                for (const row of rows) {
                    console.log(row);
                }
            } else {
                console.log("connection not open");
            }
        }
    } catch (err) {
        throw err;
    } finally {
        await db.close();
    }
}

test();