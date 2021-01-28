const express = require('express');
router = express.Router();
const log =  require('../functions/log');
const db = require('../database/mysql');

router.get('/:category', async function(req, res) {
    if (!req.params) return res.status(403).json({ error: 'Choose a correct path' });
    const categoryFix = req.params.category;

    if (!client.global.categories.includes(categoryFix.toUpperCase())) return res.status(403).json({ error: 'unauthorized' });
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (!req.headers.authorization) return res.status(403).json({ error: 'no_token' });
    if (req.headers.authorization !== process.env.SERVER_KEY) return res.status(403).json({ error: 'unauthorized' });
    const pat = db.query(`SELECT * FROM sweebData WHERE category = "${categoryFix.toUpperCase()}"`)

    log.log(`[Sweeb] /${categoryFix.toUpperCase()}/ requested by ${ip}`)
    res.status(200).json({category: pat[Math.floor(Math.random()*pat.length)].category, url: pat[Math.floor(Math.random()*pat.length)].fileLink})
})

router.get('/upload/:ID/:File', function(req, res) {
    if (!req.headers.authorization) return res.status(403).json({ error: 'no_token' });
    if (req.headers.authorization !== process.env.SERVER_KEY) return res.status(403).json({ error: 'unauthorized' });
    if (!req.locals.client.config.uploaders.includes(req.params.IDS)) return res.status(403).json({ error: 'unauthorized' });
})

router.get('/delete/:ID/:File', function(req, res) {
    if (!req.headers.authorization) return res.status(403).json({ error: 'no_token' });
    if (req.headers.authorization !== process.env.SERVER_KEY) return res.status(403).json({ error: 'unauthorized' });
    if (!req.locals.client.config.staffIDS.includes(req.params.IDS)) return res.status(403).json({ error: 'unauthorized' });
})

module.exports = router;