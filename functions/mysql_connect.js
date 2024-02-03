async function mysql_connect() {
    try {
        mysql_connection = await mysql.createConnection({
            host: EngineConfig.mysql.host,
            user: EngineConfig.mysql.username,
            password: EngineConfig.mysql.password,
            database: EngineConfig.mysql.database,
            port: EngineConfig.mysql.port,
        });

        console.log(`${EngineConfig.prefix} Connect to MySQL - ✅`);
    } catch (error) {
        console.log(`${EngineConfig.prefix} Connect to MySQL - ❌\nError: ${error}`);
    }
}

module.exports = mysql_connect;