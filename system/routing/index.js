const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    engine.functions.renderPageIfExists('home', res, {
        pageName: () => 'Home',
    });
});

module.exports = router;
