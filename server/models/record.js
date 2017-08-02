import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const recordSchema = new Schema({
  data: Schema.Types.Mixed,
  isActive: { type: 'Boolean', default: true }
}, {strict: false});

export default mongoose.model('Record', recordSchema);
