const express = require('express');
router = express.Router();
const log =  require('../functions/log');
const db = require('../database/mysql');

router.get('/:category', async function(req, res) {
    if (!req.params) return res.status(403).json({ error: 'Choose a correct path' });
    const categoryFix = req.params.category;

    if (!res.locals.bot.global.categories.includes(categoryFix.toUpperCase())) return res.status(403).json({ error: 'unauthorized' });
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    log.log(`[Sweeb] /${categoryFix.toUpperCase()}/ requested by ${ip}`)
    //if (!req.headers.authorization) return res.status(403).json({ error: 'no_token' });
    //if (req.headers.authorization !== process.env.SERVER_KEY) return res.status(403).json({ error: 'unauthorized' });
    client.global.db.query(`SELECT * FROM sweebData WHERE category = "Pat"`, function(err, data) {
        const pic = data[Math.floor(Math.random()*data.length)]
        console.log(pic);
        return res.send(200).json({url: pic.url, id: pic.id, category: pic.category, added: pic.dateAdded});
    })
    

   // res.status(200).json({category: random.category, url: random.fileLink})
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