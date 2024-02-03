const express = require("express");
const hbs = require("express-handlebars");
const fs = require("fs");
const path = require("path");

global.mysql = require('mysql2/promise');


let engine = {};



// ======= [ CONFIG ] =======
global.EngineConfig = {
    prefix: "[TradeSquare / Helper]:",

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

    cache: false,
}



// ======= [ FUNCTIONS ] =======
engine.functions = {};

const functionsFolder = './functions';
if(!fs.existsSync(functionsFolder)) {
  fs.mkdirSync(functionsFolder);
  console.log(`[FUNCTIONS | Folder] Folder '${functionsFolder}' created.`);
}

const functionFiles = fs.readdirSync(functionsFolder).filter(file => file.endsWith('.js'));
console.log("============");
for(const file of functionFiles) {
  const functionName = file.split('.')[0];
  engine.functions[functionName] = require(`./functions/${file}`);
  console.log(`[FUNCTIONS | Load] ${functionName}`);
}
console.log("============\n");



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

app.use('/assets', express.static(path.join(__dirname, 'assets')));

if(EngineConfig.cache) {
    app.enable('view cache');
}



// ======= [ MYSQL CONNECT ] =======
(async () => {
    global.mysql_connection = null;
    await engine.functions.mysql_connect();

    // ======= [ PAGES ] =======

    let _pages = await engine.functions.mysql_fetch("SELECT * FROM `pages` WHERE `status` = '1'");

    if (_pages.length <= 0) {
        app.get('/', (req, res) => {
            res.render('error', {
                // pageName: () => 'Server Error',
                // content: () => 'Pages not found in the database',

                name: () => '500',
                desc: () => 'Server Error',
                layout: false
            });
        });
    } else {
        for (let Index = 0; Index < _pages.length; Index++) {  // Fix: Use < instead of >
            app.get(_pages[Index].url, (req, res) => {
                if(fs.existsSync(`./views/${_pages[Index].performer}`)) {
                    res.render(_pages[Index].performer, {
                        pageName: () => _pages[Index].name,
                    });
                } else {
                    res.render('error', {
                        // pageName: () => 'Server Error',
                        // content: () => `File <b>${_pages[Index].performer}</b> not be found in directory "./views".`,

                        name: () => '404',
                        desc: () => 'Not found',
                        layout: false
                    });
                }
            });
        }
    }
})();



// ======= [ INIT CORE ] =======
app.listen(EngineConfig.listen.port, () => console.log(`${EngineConfig.prefix} Starting to ${EngineConfig.listen.protocol}://${EngineConfig.listen.host}:${EngineConfig.listen.port}`));