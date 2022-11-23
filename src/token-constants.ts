export const FieldTypes = {
  TEXT: 'text',
  EMAIL: 'email',
  OPTIONS: 'options',
  FILE: 'file',
  RELATION: 'relation',
};

export const ObjectTypes = {
  STRING: 'string',
  NUMBER: 'number',
  STRING_ARRAY: 'string[]',
  ANY: 'any',
};

export type FieldTypeKeys = keyof typeof FieldTypes;
