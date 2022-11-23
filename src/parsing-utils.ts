import _ from 'lodash';
import { FieldTypeKeys, FieldTypes, ObjectTypes } from './token-constants';
import { CollectionSchema, SchemaOptions } from './types';
export function convertToInterfaceName(word: string) {
  return _.replace(_.startCase(word), / +/gm, '');
}

export function getFieldType(
  type: FieldTypeKeys,
  options: SchemaOptions,
  collectionSchemas: CollectionSchema[]
) {
  switch (type) {
    case FieldTypes.TEXT:
      return ObjectTypes.STRING;
    case FieldTypes.FILE:
      return ObjectTypes.STRING;
    case FieldTypes.OPTIONS:
      return ObjectTypes.STRING_ARRAY;
    case FieldTypes.RELATION:
      const collection = _.find(
        collectionSchemas,
        (collectionSchema) => collectionSchema.id === options.collectionId
      );
      if (collection) {
        return convertToInterfaceName(collection.name);
      }
      throw new Error('Type is relation but collection id is not specified');
  }
  return ObjectTypes.ANY;
}

export function convertToOptionalProperty(parsedProperty: string) {
  return _.replace(parsedProperty, ':', '?:');
}

export function getFormattedProperty(name: string, type: string) {
  return `\t${name}: ${type}\n`;
}
