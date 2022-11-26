#! /usr/bin/env node
import { existsSync, readFileSync } from 'fs';
import inquirer from 'inquirer';
import { parsePocketBaseSchema } from './parse-pocketbase-schema';
const args = process.argv;

let inputFile: string;
let outputDir: string;

inquirer
  .prompt({
    type: 'input',
    name: 'inputFile',
    message: 'Please enter the path to your PocketBase schema file',
    default: './schema/collections.json',
  })
  .then((answer) => {
    inputFile = answer.inputFile;
    if (!existsSync(inputFile)) {
      throw new Error(`File ${inputFile} does not exist`);
    }
  })
  .then(() => {
    inquirer
      .prompt({
        type: 'input',
        name: 'outputDir',
        message: 'Please enter the path to your output directory',
        default: './types',
      })
      .then((answer) => {
        outputDir = answer.outputDir;
        const schema = JSON.parse(readFileSync(inputFile, 'utf8'));
        parsePocketBaseSchema(schema, outputDir);
      });
  });
