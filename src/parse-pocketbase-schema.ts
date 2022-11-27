import { existsSync, mkdir, mkdirSync, writeFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import { format } from 'prettier';
import { ExportInterfaceToken } from './constants';
import {
    convertToOptionalProperty,
    convertToInterfaceName,
    getFieldType,
    getFormattedProperty
} from './parsing-utils';
import { FieldTypeKeys } from './token-constants';
import { CollectionSchema, Schema } from './types/index';

export function parsePocketBaseSchema(collectionSchemas: CollectionSchema[], outputDir: string) {
  _.forEach(collectionSchemas, (collectionSchema) => {
    const typesDir = path.resolve(process.cwd(), outputDir)
    const interfaces = interfaceGenerator(collectionSchemas);
    if(!existsSync(typesDir)) {
      mkdirSync(typesDir, {recursive: true})
    }
    writeFileSync(path.resolve(typesDir,'./index.ts'), format(interfaces, {semi: true, parser: 'typescript'}), {encoding: 'utf-8'});
  });
}


export const interfaceGenerator = (collectionSchemas: CollectionSchema[]) => {
  return _.join(
    _.map(collectionSchemas, (collectionSchema) => {
      const { name, schema } = collectionSchema;
      const interfaceStart = interfaceStartGenerator(name);
      const parsedProperties = propertiesGenerator(schema, collectionSchemas);
      return `${interfaceStart}${parsedProperties}\n`;
    }),
    ''
  );
};
export function interfaceStartGenerator(collectionSchemaName: string) {
  const name = convertToInterfaceName(collectionSchemaName);
  return `${ExportInterfaceToken} ${name}`;
}

export function propertiesGenerator(
  schemas: Schema[],
  collectionSchemas: CollectionSchema[]
) {
  return `{\n ${_.join(
    _.map(schemas, (schema) => parseProperty(schema, collectionSchemas)),
    ';'
  )} \n}`;
}

export function parseProperty(
  property: Schema,
  collectionSchemas: CollectionSchema[]
) {
  const { name, type, required, options } = property;
  const parsedProperty = getFormattedProperty(
    name,
    getFieldType(type as FieldTypeKeys, options, collectionSchemas)
  );
  if (!required) {
    return convertToOptionalProperty(parsedProperty);
  }

  return parsedProperty;
}
