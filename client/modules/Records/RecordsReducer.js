import {
  ADD_RECORD,
  DELETE_RECORD,
  UPDATE_RECORD,
  ADD_RECORDS,
  ADD_FIELD,
  DELETE_FIELD,
  UPDATE_FIELD,
  ADD_FIELDS,
  SET_STATUS_TEXT
} from './RecordsActions'

const initialState = {
  records: [],
  fields: [],
  statusText: '',
};

const RecordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECORDS:
      return Object.assign({}, state, {
        records: action.records
      })
    case ADD_RECORD:
      return Object.assign({}, state, {
        records: [action.record, ...state.records],
      })
    case DELETE_RECORD:
      return Object.assign({}, state, {
        records: state.records.filter(record => record._id !== action.uid),
      })
    case UPDATE_RECORD:
      return Object.assign({}, state, {
        records: state.records.map(record => {
          if (record._id === action.record._id) return action.record;
          return record;
        })
      })
    case ADD_FIELDS:
      return Object.assign({}, state, {
        fields: action.fields
      })
    case ADD_FIELD:
      return Object.assign({}, state, {
        fields: [action.field, ...state.fields],
      })
    case DELETE_FIELD:
      return Object.assign({}, state, {
        fields: state.fields.filter(field => field._id !== action.uid),
      })
    case UPDATE_FIELD:
      return Object.assign({}, state, {
        fields: state.fields.map(field => {
          if (field._id === action.field._id) return action.field;
            return field;
          })
      })
    case SET_STATUS_TEXT:
      return Object.assign({}, state, {
        statusText: action.statusText
      });
    default:
      return state;
  }
};

export const getRecords = state => state.records.records;
export const getFields = state => state.records.fields;

export const getStatusText = state => state.records.statusText;

export default RecordsReducer;
