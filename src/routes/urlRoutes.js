const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/', urlController.createUrl);
router.get('/', urlController.getUrls);
router.put('/:id', urlController.updateUrl);
router.delete('/:id', urlController.deleteUrl);
router.post('/call', urlController.callUrl);

// Activar o desactivar cron
router.post('/:id/enable-cron', urlController.enableCron);
router.post('/:id/disable-cron', urlController.disableCron);

module.exports = router;
