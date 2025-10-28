const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String, default: '' },
  active: { type: Boolean, default: true },   // si está habilitada o no
  cronEnabled: { type: Boolean, default: false }, // si tiene cron activo
  lastStatus: { type: Number },
  lastResponse: { type: mongoose.Schema.Types.Mixed },
  lastExecutedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Url', urlSchema);
