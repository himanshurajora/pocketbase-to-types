import { parseArguments } from './parse-arguments';
import { existsSync, readFileSync } from 'fs';
import { parsePocketBaseSchema } from './parse-pocketbase-schema';
const args = process.argv;

const { inputFile, outputDir } = parseArguments(args);

console.log({inputFile})

if (!inputFile || !existsSync(inputFile))
  throw new Error('Input file does not exist');

const collectionSchemas = readFileSync(inputFile, 'utf8')

parsePocketBaseSchema(JSON.parse(collectionSchemas));
