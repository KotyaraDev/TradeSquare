async function mysql_fetch(sql) {
    console.log(`[MySQL | Fetch] Running: ${sql}`);

    try {
        const [rows, fields] = await mysql_connection.execute(sql);
        return rows || null;
    } catch (error) {
        console.error(`[MySQL | Fetch] Failed: ${error}`);
        return false;
    }
}

module.exports = mysql_fetch;