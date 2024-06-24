const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }]
});

module.exports = mongoose.model('Position', positionSchema);

