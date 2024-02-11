const express = require('express'), jwt = require('jsonwebtoken');
const router = express.Router();


router.post('/register', async (req, res) => {
    const requestData = req.body;
    const randomUserSecretKey = engine.functions.generateRandomString(128);

    // debug random key
    console.log(randomUserSecretKey);


    // TODO: transfer this code to function
    // jwt.verify(req.cookies['token'], randomUserSecretKey, (err, decoded) => {
    //     if (err) {
    //         console.error(`${EngineConfig.prefix} ${err}`);

    //         res.status(500).json({
    //             code: 10004, 
    //             message: "Failed to verify the user token",
    //         });
    //     } else {
    //         res.status(200).json({
    //             code: 10000, 
    //             message: "",
    //         });
    //     };
    // });
    

    if(requestData === undefined || requestData['email'] === undefined || requestData['pass'] === undefined || requestData['conf_pass'] === undefined) return res.status(500).json({ code: 10003, message: "Wrong params" });

    // Checking that the user is already logged in?
    if (req.cookies['token']) return res.status(500).json({ code: 10001, message: "User already authorised" });

    const sqlData = await engine.functions.mysql_fetch(`SELECT * FROM \`users\` WHERE \`email\` = '${requestData['email']}';`);

    if(sqlData.length > 0) {
        // Set client cookie ((jwt token))
        var token = jwt.sign({
            unid: 1,
            login: "user",
            email: "user@exaple.com",
        }, randomUserSecretKey, { expiresIn: '7d' });
        res.cookie('token', token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })

        // Insert user secret key
        await engine.functions.mysql_query(`UPDATE \`users\` SET \`secret\` = '${randomUserSecretKey}' WHERE \`email\` = '${requestData['email']}';`);

        res.status(200).json({
            code: 10000, 
            message: "",
        });
    } else {
        res.status(500).json({
            code: 10002, 
            message: "User not found",
        });
    }
});

router.post('/login', async (req, res) => {
    const requestData = req.body;
    console.log('Login', requestData);

    const data = {
        message: 'Hello, world!',
        value: 2
    };
    res.json(data);
});

router.post('/logout', async (req, res) => {
    const requestData = req.body;
    console.log('Logout', requestData);

    const data = {
        message: 'Hello, world!',
        value: 3
    };
    res.json(data);
});

module.exports = router;