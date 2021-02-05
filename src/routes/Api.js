const express = require('express');
router = express.Router();
const log =  require('../functions/log');
const db = require('../database/mysql');

router.get('/:category', async function(req, res) {
    if (!req.params) return res.status(403).json({ error: 'Choose a correct path' });
    const categoryFix = req.params.category;
    if (!res.locals.bot.global.categories.includes(categoryFix.toProperCase())) return res.status(401).json({ error: 'unauthorized' });
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress, who = req.headers['user-agent'] || "Undefined (1.0.0)";
    log.log(`[Sweeb] /${categoryFix.toUpperCase()}/ requested by ${ip} - ${who}`)
    if (!req.headers.authorization) return res.status(401).json({ error: 'no_token' });
    db.query(`SELECT * FROM sweebAPI WHERE apiToken = "${req.headers.authorization}"`, function(err, data) {
        if (data == undefined) return res.status(401).json({ error: 'unauthorized' });
        else db.query(`(SELECT * FROM sweebData WHERE category = "${categoryFix.toProperCase()}" ORDER BY RAND() LIMIT 1)`, function(err, data) {
            if (data == undefined) return res.status(400).json({ error: 'data_not_found'})
            const picData = data[0];
            if (picData == undefined) return res.status(400).json({ error: 'data_not_found'})
            return res.json({url: picData.fileLink, id: picData.id, category: picData.category, added: picData.dateAdded});
        })
    })
})

router.get('/categories/:Type', function(req, res) {
    const categoryFix = req.params.Type;
    if (req.params) {
        if (!res.locals.bot.global.categories.includes(categoryFix.toProperCase())) return res.status(401).json({ error: 'unauthorized' });
        db.query(`SELECT * FROM sweebData where category = "${categoryFix.toProperCase()}"`, function(err, data) {
            if (data || data[0] || data.length == undefined) return res.status(400).json({ error: 'data_not_found'})
            return res.json({category: categoryFix.toProperCase(), amount: data.length});
        });
    } else return res.json({categories: res.locals.bot.global.categories});
    
})

module.exports = router;