import User from '../models/user';
import jwt from 'jsonwebtoken';
import serverConfig from '../config';

/**
 * Sign up
 * @param req
 * @param res
 * @returns void
 */

export function signup(req, res) {
  User.find({email: req.body.user.email}, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (user.length != 0) {
      return res.status(400).send({'error': 'Duplicated email!'});
    }
    var newUser = new User(req.body.user);
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).json({ status: 'ok' });
    })
  })
}

/**
 * generateToken
 * @param req
 * @param res
 */
export function generateToken(req, res, next) {
  console.log('generate token');
  console.log(req.user);
  req.token = jwt.sign({
    id: req.user.id,
  }, serverConfig.secretKey, {
    expiresIn: 60*60*4
  });
  next();
}

export function respond(req, res) {
  res.status(200).json({
    user: req.user.id,
    token: req.token
  })
}
