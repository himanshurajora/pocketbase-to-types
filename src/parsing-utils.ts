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
    case FieldTypes.NUMBER:
      return ObjectTypes.NUMBER;
    case FieldTypes.DATE:
      return ObjectTypes.DATE;
    case FieldTypes.EMAIL:
      return ObjectTypes.STRING;
    case FieldTypes.FILE:
      return ObjectTypes.STRING;
    case FieldTypes.URL:
      return ObjectTypes.STRING;
    case FieldTypes.BOOL:
      return ObjectTypes.BOOL;
    case FieldTypes.SELECT:
      if (options.values) {
        return parseSelectOptions(options.values);
      }
      return ObjectTypes.STRING_ARRAY;
  }
  return ObjectTypes.ANY;
}

export function convertToOptionalProperty(parsedProperty: string) {
  return _.replace(parsedProperty, ':', '?:');
}

export function getFormattedProperty(name: string, type: string) {
  return `\t${name}: ${type}\n`;
}

export function parseSelectOptions(options: string[]) {
  return _.join(
    _.map(options, (option) => `'${option}'`),
    '|'
  );
}

export function getCollectionNameWithId(
  collectionId: string,
  collectionSchemas: CollectionSchema[]
) {
  const collection = _.find(
    collectionSchemas,
    (collectionSchema) => collectionSchema.id === collectionId
  );
  if (collection) {
    return convertToInterfaceName(collection.name);
  }
  throw new Error('Type is relation but collection id is not specified');
}

export function joinWithSemiColon(array: string[]) {
  return _.join(array, ';');
}

export function putBetweenCurlyBracesWithNewLines(str: string) {
  return `{\n ${str} \n}`;
}

export function formatProperties(properties: string[]) {
  return putBetweenCurlyBracesWithNewLines(joinWithSemiColon(properties));
}

export function withoutUnwantedFields(
  array: (string | null | undefined)[]
): string[] {
  return _.without(array, '', undefined, null) as string[];
}
