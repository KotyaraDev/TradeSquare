const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    engine.functions.renderPageIfExists('auth', res, {
        pageName: () => 'Auth',

        layout: false
    });
});

module.exports = router;
