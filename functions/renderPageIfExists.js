const fs = require("fs");

async function renderPageIfExists(fileName, res, data = {}) {
    const filePath = `./views/${fileName}.hbs`;
    if (fs.existsSync(filePath)) {
        await res.render(`${fileName}.hbs`, data);
    } else {
        await res.render('error', {
            name: () => '404',
            desc: () => 'Not found',
            layout: false
        });
    }
}

module.exports = renderPageIfExists;