/**
 * Created by lightening on 7/21/17.
 */

import Record from '../models/record';
import mongoose from 'mongoose';

export const getRecords = (req, res) => {
  Record.find({}, (err, records) => {
    if (err) {
      return res.status(500).send({'error': 'Can not get Records'});
    }
    return res.json({ records: records });
  })
}

export const createRecord = (req, res) => {
  var newRecord = new Record(req.body);
  newRecord.markModified('record');
  newRecord.save((err, record) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).json({ record: record });
  });
}

export const updateRecord = (req, res) => {
  Record.findById(req.body._id, (err, record) => {
    record.record = req.body.record;
    record.markModified('record');
    record.save((err, doc) => {
      if (err) {
        return res.status(400).send({error: 'Can not upate Record!'});
      }
      return res.status(200).json({record: doc});
    });
  });
}

export const deleteRecord = (req, res) => {
  Record.findById(req.body._id, (err, record) => {
    if (err) { return res.status(400).send({ eror: err }) }
    record.isActive = false;
    record.save((err, doc) => {
      if (!err) {
        return res.status(200).json({ status: 'ok' });
      }
    })
  });
}

export const uploadImage = (req, res) => {

}
