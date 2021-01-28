const express = require('express');
router = express.Router();

router.get('/pat', function(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
})

module.exports = router;