export const FieldTypes = {
  TEXT: 'text',
  EMAIL: 'email',
  OPTIONS: 'options',
  FILE: 'file',
  RELATION: 'relation',
  BOOL: 'bool',
  SELECT: 'select',
  URL: 'url',
  DATE:'date',
  JSON: 'json',
  NUMBER: 'number'

};

export const ObjectTypes = {
  STRING: 'string',
  NUMBER: 'number',
  STRING_ARRAY: 'string[]',
  ANY: 'any',
  BOOL: 'bool',
  DATE: 'Date'
};

export type FieldTypeKeys = keyof typeof FieldTypes;
