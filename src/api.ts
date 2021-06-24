import { INCHIAPI } from "./ffis";

export function CheckINCHIKey(input: string): 0 | -1 | 1 | 2 | 3 {
  return INCHIAPI.CheckINCHIKey(input) as 0 | -1 | 1 | 2 | 3;
}

export function CheckINCHI(input: string, strict?: boolean): 0 | -1 | 1 | 2 | 3 | 4 {
  return INCHIAPI.CheckINCHI(input, strict === true ? 1 : 0) as 0 | -1 | 1 | 2 | 3 | 4;
}

export function GetStringLength(input: string): number {
  return INCHIAPI.GetStringLength(input);
}