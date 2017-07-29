// Export Constants
import callApi from '../../util/apiCaller'; 
import {uploadImage} from '../../util/apiCaller'; 

export const ADD_RECORD = 'ADD_RECORD';
export const ADD_RECORDS = 'ADD_RECORDS';
export const DELETE_RECORD = 'DELETE_RECORD';
export const UPDATE_RECORD = 'UPDATE_RECORD';
export const ADD_FIELD = 'ADD_FIELD';
export const ADD_FIELDS = 'ADD_FIELDS';
export const DELETE_FIELD = 'DELETE_FIELD';
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const SET_STATUS_TEXT = 'SET_STATUS_TEXT';

export function fetchRecords() {
  return (dispatch) => {
    return callApi('records/').then(res => {
        dispatch(addRecords(res.records));
    });
  };
}

export function addRecords(records) {
  return {
    type: ADD_RECORDS,
    records
  }
}

export function updateRecord(record) {
  return (dispatch) => {
    var images = {};
    for (var key in record) {
      if (typeof record[key] == 'object') {
        images[key] = record[key]
      }
    }
    return uploadImage(images).then(res=>{
        for (var key in res) {
          record[key] = res[key];
        }
        callApi('records/update', 'put', record).then(res => {
          if (res.error) {
            dispatch(setStatusText(res.error));
          }
          else dispatch(addRecord(res.record));
        });
    });
  }
}

export function modifyRecord(record) {
  return {
    type: UPDATE_RECORD,
    record
  }
}

export function createRecord(record) {
  return (dispatch) => {
    var images = {};
    for (var key in record) {
      if (typeof record[key] == 'object') {
        console.log(record[key]);
        images[key] = record[key];
      }
    }
    return uploadImage(images).then(res=>{
      for (var key in res) {
        record[key] = res[key];
      }
      callApi('records/add', 'post', record).then(res => {
        if (res.error) {
          dispatch(setStatusText(res.error));
        }
        else dispatch(addRecord(res.record));
      });
    });

  }
}

export function addRecord(record) {
  return {
    type: ADD_RECORD,
    record
  }
}

export function fetchFields() {
  return (dispatch) => {
    return callApi('fields/').then(res => {
        dispatch(addFields(res.fields));
  });
  };
}

export function addFields(fields) {
  return {
    type: ADD_FIELDS,
    fields
  }
}

export function updateField(field) {
  return (dispatch) => {
    return callApi('fields/update', 'put', field).then(res => {
        if (res.error) {
      dispatch(setStatusText(res.error));
    }
  else {
      dispatch(modifyField(res.field));
    }
  })
  }
}

export function modifyField(field) {
  return {
    type: UPDATE_FIELD,
    field
  }
}

export function createField(field) {
  return (dispatch) => {
    return callApi('fields/add', 'post', field).then(res => {
        if (res.error) {
      dispatch(setStatusText(res.error));
    }
  else dispatch(addField(res.field));
  })
  }
}

export function addField(field) {
  return {
    type: ADD_FIELD,
    field
  }
}

export function setStatusText(text) {
  return {
    type: SET_STATUS_TEXT,
    statusText: text
  }
}

