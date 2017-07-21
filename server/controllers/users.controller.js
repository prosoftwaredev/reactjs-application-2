/**
 * Created by lightening on 7/21/17.
 */

import User from '../models/user';

export const getUsers = (req, res) => {
  console.log('getUsers');
  User.find({}, (err, users) => {
    console.log(users);
    if (err) {
      return res.status(500).send({'error': 'Can not get Users'});
    }
    return res.json({ users: users });
  })
}

export const createUser = (req, res) => {
  User.find({email: req.body.email}, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (user.length != 0) {
      return res.status(400).send({'error': 'Duplicated email!'});
    }
    var newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).json({ user: user });
    })
  });
}

export const updateUser = (req, res) => {
  User.findById(req.body._id, (err, user) => {
    var newUser = new User(req.body);
    user.first_name = newUser.first_name;
    user.last_name = newUser.last_name;
    user.email = newUser.email;
    user.admin = newUser.admin;
    if (!newUser.password) {
      user.password = newUser.password;
    }
    user.save((err, doc) => {
      if (err) {
        return res.status(400).send({error: 'Can not upate User!'});
      }
      return res.status(200).json({user: doc});
    });
});
}
