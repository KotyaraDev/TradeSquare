async function mysql_connect() {
    try {
        const connection = await mysql.createConnection({
            host: EngineConfig.mysql.host,
            user: EngineConfig.mysql.username,
            password: EngineConfig.mysql.password,
            database: EngineConfig.mysql.database,
            port: EngineConfig.mysql.port,
        });

        console.log(`${EngineConfig.prefix} Connect to MySQL - ✅`);
        return connection;
    } catch (error) {
        console.error(`${EngineConfig.prefix} Connect to MySQL - ❌\nError: ${error}`);
        throw error;
    }
}

module.exports = mysql_connect;
