async function mysql_query(sql) {
    console.log(`[MySQL | Query] Running: ${sql}`);

    try {
        await mysql_connection.beginTransaction();
        await mysql_connection.query(sql);
        await mysql_connection.commit();
    } catch (error) {
        console.error(`[MySQL | Query] Failed: ${error}`);
        return false;
    }
}

module.exports = mysql_query;