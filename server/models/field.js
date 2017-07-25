import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const fieldSchema = new Schema({
  name: { type: 'String', required: true },
  description: { type: 'String' },
  type: {type: 'String', default: 'String'},
  isAcitve: {type: 'Boolean', default: true},
  isRequired: {type: 'Boolean', default: false}
});

export default mongoose.model('Field', fieldSchema);
