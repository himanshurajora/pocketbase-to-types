import { existsSync, mkdir, mkdirSync, writeFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import { format } from 'prettier';
import { ExpandRelationToken, ExportInterfaceToken } from './constants';
import {
  convertToOptionalProperty,
  convertToInterfaceName,
  getFieldType,
  getFormattedProperty,
  formatProperties,
  getCollectionNameWithId,
  withoutUnwantedFields,
} from './parsing-utils';
import { FieldTypeKeys, FieldTypes } from './token-constants';
import { CollectionSchema, Schema } from './types/index';

export function parsePocketBaseSchema(
  collectionSchemas: CollectionSchema[],
  outputDir: string
) {
  _.forEach(collectionSchemas, (collectionSchema) => {
    const typesDir = path.resolve(process.cwd(), outputDir);
    const interfaces = interfaceGenerator(collectionSchemas);
    if (!existsSync(typesDir)) {
      mkdirSync(typesDir, { recursive: true });
    }
    writeFileSync(
      path.resolve(typesDir, './index.ts'),
      format(interfaces, { semi: true, parser: 'typescript' }),
      { encoding: 'utf-8' }
    );
  });
}

export const interfaceGenerator = (collectionSchemas: CollectionSchema[]) => {
  return _.join(
    _.map(collectionSchemas, (collectionSchema) => {
      const { name } = collectionSchema;
      const interfaceStart = interfaceStartGenerator(name);
      const parsedProperties = propertiesGenerator(
        collectionSchema,
        collectionSchemas
      );
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
  collectionSchema: CollectionSchema,
  collectionSchemas: CollectionSchema[]
) {
  const relationString = generateObjectWithKeys(
    ExpandRelationToken,
    generateDirectAndIndirectRelations(collectionSchema, collectionSchemas)
  );

  const commonProperties = withoutUnwantedFields(
    _.map(collectionSchema.schema, (schema) =>
      parseProperty(schema, collectionSchemas)
    )
  );

  return formatProperties([...commonProperties, relationString]);
}

export function parseProperty(
  property: Schema,
  collectionSchemas: CollectionSchema[]
) {
  const { name, type, required, options } = property;
  // type relation is parsed using generateDirectAndIndirectRelations
  if (type === FieldTypes.RELATION) return '';
  const parsedProperty = getFormattedProperty(
    name,
    getFieldType(type as FieldTypeKeys, options, collectionSchemas)
  );
  if (!required) {
    return convertToOptionalProperty(parsedProperty);
  }

  return parsedProperty;
}

export function generateDirectAndIndirectRelations(
  // single collection schema
  collectionSchema: CollectionSchema,
  // entire database collection schema
  collectionSchemas: CollectionSchema[]
) {
  const directRelations = withoutUnwantedFields(
    _.map(collectionSchema.schema, (columnSchema) => {
      if (columnSchema.type !== FieldTypes.RELATION) return '';
      return `${columnSchema.name}: ${getCollectionNameWithId(
        columnSchema.options.collectionId!,
        collectionSchemas
      )}`;
    })
  );

  return directRelations;
}

export function generateObjectWithKeys(key: string, values: string[]) {
  return `${key}: ${formatProperties(values)}`;
}
