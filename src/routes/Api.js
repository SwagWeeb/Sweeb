const express = require('express');
router = express.Router();

router.get('/pat', function(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (!req.headers.authorization) return res.status(403).json({ error: 'no_token' });
    if (req.headers.authorization !== process.env.SERVER_KEY) return res.status(403).json({ error: 'unauthorized' });
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