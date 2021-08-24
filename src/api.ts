// @ts-nocheck There are some issues in the Definitely Typed packages of the "ref" related dependencies.
import { INCHIAPI } from "./ffis";
import { inchi_OutputStruct, inchi_OutputStructEx } from "./headers";

// #region Types and Interfaces

export type StatusReturnType1 = -1 | 0 | 1 | 2 | 3;
export type StatusReturnType2 = -1 | 0 | 1 | 2 | 3 | 4;
export type StatusReturnType3 = -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5;

export interface GetINCHIOptions {
  /**
   * Meaning: Both ends of wedge point to stereocenters.
   * Default behavior: Only narrow end of wedge points to stereocenter
   */
  NEWPSOFF?: boolean;
  /**
   * Meaning: All hydrogens in input structure are explicit
   * Default behavior: Add H according to usual valences
   */
  DoNotAddH?: boolean;
  SNon?: boolean;
  SRel?: boolean;
  SRac?: boolean;
  SUCF?: boolean;
  ChiralFlagON?: boolean;
  ChiralFlagOFF?: boolean;
  SUU?: boolean;
  SLUUD?: boolean;
  FixedH?: boolean;
  RecMet?: boolean;
  KET?: boolean;
  "15T"?: boolean;
  AuxNone?: boolean;
  Wnumber?: boolean;
  Wmnumber?: boolean;
  NoWarnings?: boolean;
  OutputSDF?: boolean;
  WarnOnEmptyStructure?: boolean;
  SaveOpt?: boolean;
}

export interface GetINCHIExOptions extends GetINCHIOptions {
  LooseTSACheck?: boolean;
  Polymers?: boolean;
  Polymers105?: boolean;
  NoFrameShift?: boolean;
  FoldCRU?: boolean;
  NPZz?: boolean;
  SAtZZ?: boolean;
  LargeMolecules?: boolean;
}

export interface INCHIOutput {
  szInChI: string;
  szAuxInfo: string;
  szMessage: string;
  szLog: string;
}

// #endregion

// #region Private Functions

function generateOptionsString(input: GetINCHIOptions | GetINCHIExOptions): string {
  const marker = process.platform === "win32" ? "/" : "-";
  let options = Object.keys(input)
    .filter((ele) => {
      return input[ele as keyof (GetINCHIOptions | GetINCHIExOptions)] === true;
    })
    .map((ele) => {
      return `${marker}${ele}`;
    });
  return options.join(" ");
}

// #endregion

// #region Public Functions

export function CheckINCHIKey(input: string): StatusReturnType1 {
  return INCHIAPI.CheckINCHIKey(input) as StatusReturnType1;
}

export function CheckINCHI(input: string, strict?: boolean): StatusReturnType2 {
  return INCHIAPI.CheckINCHI(input, strict === true ? 1 : 0) as StatusReturnType2;
}

export function GetStringLength(input: string): number {
  return INCHIAPI.GetStringLength(input);
}

export function GetStructFromINCHI(input: string, options: GetINCHIOptions): StatusReturnType3 {
  const inchiIn = { szInChI: input, szOptions: generateOptionsString(options) };
  const inchiOutStruct = new inchi_OutputStruct();
  const output = INCHIAPI.GetStructFromINCHI(inchiIn.ref(), inchiOutStruct.ref());
  return output as StatusReturnType3;
}

export function GetStructFromINCHIEx(input: string, options: GetINCHIExOptions): StatusReturnType3 {
  const inchiIn = { szInChI: input, szOptions: generateOptionsString(options) };
  const inchiOutStructEx = new inchi_OutputStructEx();
  const output = INCHIAPI.GetStructFromINCHIEx(inchiIn.ref(), inchiOutStructEx.ref());
  return output as StatusReturnType3;
}

export function GetStructFromStdINCHI(input: string, options: GetINCHIOptions): StatusReturnType3 {
  const inchiIn = { szInChI: input, szOptions: generateOptionsString(options) };
  const inchiOutStruct = new inchi_OutputStruct();
  const output = INCHIAPI.GetStructFromStdINCHI(inchiIn.ref(), inchiOutStruct.ref());
  return output as StatusReturnType3;
}

// #endregion