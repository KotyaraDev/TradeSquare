const express = require("express");
const hbs = require("express-handlebars");


// ======= [ CONFIG ] =======
global.EngineConfig = {
    listen: {
        protocol: "http",       // http or https
        host: "localhost",
        port: "3000"
    },

    mysql: {
        host: "127.0.0.1",
        username: "root",
        password: "",
        database: "trade-square",
        port: "3306"
    },

    cache: false
}


// ======= [ CORE ] =======
const app = express();

app.engine('hbs', hbs.engine({
    defaultLayout: 'main', 
    extname: 'hbs',
    helpers: {
        siteHost: () => `${EngineConfig.listen.protocol}://${EngineConfig.listen.host}:${EngineConfig.listen.port}`,
        siteName: () => 'TradeSquare',
    },
}));
app.set('views', './views');
app.set('view engine', 'hbs');

if(EngineConfig.cache) {
    app.enable('view cache');
}


// ======= [ PAGES ] =======
app.get('/', (req, res) => {
    res.render('home', {
        pageName: () => 'Home',
    });
});


// ======= [ INIT CORE ] =======
app.listen(EngineConfig.listen.port, () => console.log(`Starting to ${EngineConfig.listen.protocol}://${EngineConfig.listen.host}:${EngineConfig.listen.port}`));