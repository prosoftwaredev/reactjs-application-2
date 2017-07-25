/**
 * Created by lightening on 7/21/17.
 */

import Field from '../models/field';
import mongoose from 'mongoose';

export const getFields = (req, res) => {
  Field.find({}, (err, fields) => {
    if (err) {
      return res.status(500).send({'error': 'Can not get Fields'});
    }
    return res.json({ fields: fields });
  })
}

export const createField = (req, res) => {
  Field.find({name: req.body.name, isActive: true}, (err, field) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (field.length != 0) {
      return res.status(400).send({'error': 'Duplicated name!'});
    }
    var newField = new Field(req.body);
    newField.save((err, field) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).json({ field: field });
    })
  });
}

export const updateField = (req, res) => {
  Field.findById(req.body._id, (err, field) => {
    var newField = new Field(req.body);
    field.name = newField.name;
    field.description = newField.description;
    field.type = newField.type;
    field.isActive = newField.isActive;
    field.isRequired = newField.isRequired;
    field.save((err, doc) => {
      if (err) {
        return res.status(400).send({error: 'Can not upate Field!'});
      }
      return res.status(200).json({ field: doc });
    });
  });
}

export const deleteField = (req, res) => {
  Field.findById(req.body._id, (err, field) => {
    if (err) {
      return res.status(500).send({error: err});
    }
    field.isActive = false;
    field.save((err, doc) => {
      if (err) {
        return res.status(500).send({error: err});
      }
      if (!doc.isActive)
        return res.status(200).json({ status: 'ok' });
    })
  });
}
