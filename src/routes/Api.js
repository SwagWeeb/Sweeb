const express = require('express');
router = express.Router();
const log =  require('../functions/log');
const db = require('../database/mysql');

router.get('/:category', async function(req, res) {
    if (!req.params) return res.status(403).json({ error: 'Choose a correct path' });
    const categoryFix = req.params.category;

    if (!res.locals.bot.global.categories.includes(categoryFix.toProperCase())) return res.status(403).json({ error: 'unauthorized' });
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    log.log(`[Sweeb] /${categoryFix.toUpperCase()}/ requested by ${ip}`)
    if (!req.headers.authorization) return res.status(403).json({ error: 'no_token' });
    db.query(`SELECT * FROM sweebAPI WHERE apiToken = "${req.headers.authorization}"`, function(err, data) {
        if (data == undefined) return res.status(403).json({ error: 'unauthorized' });
        else db.query(`SELECT * FROM sweebData WHERE category = "${categoryFix.toProperCase()}"`, function(err, data) {
            const pic = data[Math.floor(Math.random()*data.length)]
            return res.json({url: pic.fileLink, id: pic.id, category: pic.category, added: pic.dateAdded});
        })
    })
})

router.get('/upload/:ID/:File', function(req, res) {
    if (!req.headers.authorization) return res.status(403).json({ error: 'no_token' });
    if (req.headers.authorization !== process.env.SERVER_KEY) return res.status(403).json({ error: 'unauthorized' });
    if (!req.locals.bot.config.uploaders.includes(req.params.IDS)) return res.status(403).json({ error: 'unauthorized' });
})

router.get('/delete/:ID/:File', function(req, res) {
    if (!req.headers.authorization) return res.status(403).json({ error: 'no_token' });
    if (req.headers.authorization !== process.env.SERVER_KEY) return res.status(403).json({ error: 'unauthorized' });
    if (!req.locals.bot.config.staffIDS.includes(req.params.IDS)) return res.status(403).json({ error: 'unauthorized' });
})

module.exports = router;