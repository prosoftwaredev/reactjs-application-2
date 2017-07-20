import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  first_name: { type: 'String', required: true },
  last_name: { type: 'String', required: true },
  email: { type: 'String', required: true },
  password: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  tokens: { type: 'Array'},
  admin: { type: 'Boolean', default: false }
});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) { return next();}
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

export default mongoose.model('User', userSchema);
