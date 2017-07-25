import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const recordSchema = new Schema({
  record: Schema.Types.Mixed,
  isActive: { type: 'Boolean', default: false }
}, {strict: false});

export default mongoose.model('Record', recordSchema);
