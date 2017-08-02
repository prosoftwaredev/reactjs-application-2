/**
 * Created by lightening on 7/21/17.
 */

import Record from '../models/record';
import mongoose from 'mongoose';

export const getRecords = (req, res) => {
  Record.find({isActive: true}, (err, records) => {
    if (err) {
      return res.status(500).send({'error': 'Can not get Records'});
    }
    var data = [];
    for (var idx in records) {
      var datum = records[idx].data;
      datum['_id'] = records[idx]['_id'];
      console.log(records[idx]['_id']);
      data.push(datum);
    }
    console.log(data);
    return res.status(200).json({records: data});
  })
}

export const createRecord = (req, res) => {
  var newRecord = new Record({data: req.body});
  newRecord.markModified('data');
  newRecord.save((err, record) => {
    if (err) {
      return res.status(400).send(err);
    }
    console.log(record);
    var datum = {};
    datum = record.data;
    datum['_id'] = record['_id'];
    res.status(200).json({ record: datum });
  });
}

export const updateRecord = (req, res) => {
  Record.findById(req.body._id, (err, record) => {
    console.log(record);
    console.log(req.body._id);
    var data = req.body;
    delete data['_id'];
    record['data'] = data;
    record.markModified('data')
    record.save((err, doc) => {
      if (err) {
        return res.status(400).send({error: 'Can not upate Record!'});
      }
      var datum = {};
      datum = doc.data;
      datum['_id'] = doc['_id'];
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
