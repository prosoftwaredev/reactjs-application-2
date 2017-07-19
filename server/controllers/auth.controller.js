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
  User.find({email: req.user.email}, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    if (user) {
      res.status(400).send('Duplicated email!');
    }
    const user = new User(req.user);
    user.save((err, user) => {
      if (err) {
        res.status(200).send('ok');
      }
    })
  })
}

/**
 * generateToken
 * @param req
 * @param res
 */
export function generateToken(req, res, next) {
  req.token = jwt.sign({
    id: req.user.id,
  }, serverConfig.secretKey, {
    expiresInMinutes: 120
  });
  next();
}

export function respond(req, res) {
  res.status(200).json({
    user: req.user.id,
    token: req.token
  })
}
