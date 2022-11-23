import * as _ from 'lodash';
import {
    AllPTTArgs,
  InputFileArg,
  InputFileSortArg,
  OutputDirArg,
  OutputDirSortArg,
  ValueDoesNotExistIndex,
} from './constants';
export function parseArguments(args: string[]) {
  const inputFile = findValueForOnlyOne(
    [InputFileSortArg, InputFileArg],
    args
  );
  const outputDir = findValueForOnlyOne(
    [OutputDirSortArg, OutputDirArg],
    args
  );

  return {
    inputFile,
    outputDir
  }
}

export function findValueForOnlyOne(keys: string[], args: string[]) {
  const [firstValue, secondValue] = keys;
  console.log(firstValue, secondValue);
  const firstIndex = _.indexOf(args, firstValue);
  const secondIndex = _.indexOf(args, secondValue)

  if(firstIndex === ValueDoesNotExistIndex && secondIndex === ValueDoesNotExistIndex){
    throw new Error("Required arguments not provided")
  }
  return returnValueIfIndexExists(firstIndex, args) || returnValueIfIndexExists(secondIndex, args);
}

export function returnValueIfIndexExists(index: number, args: string[]){
    if(index!== ValueDoesNotExistIndex){
        const value = args[index + 1];
        if(value && !_.includes(AllPTTArgs, value)){
            return value;
        }
        return null;
    }
}
