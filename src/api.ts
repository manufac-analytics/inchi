import { INCHIAPI } from "./ffis";
import {
  INCHIOutputStruct,
  INCHIOutputStructEx,
  inchi_InputINCHI,
  inchi_OutputStruct,
  inchi_OutputStructEx,
} from "./headers";
import { generateINCHIAtom } from "./deref";

// #region Types and Interfaces

export const GetINCHIReturnCode = {
  /**
   * Success; no errors or warnings
   */
  inchi_Ret_OKAY: 0,
  /**
   * Success; warning(s) issued
   */
  inchi_Ret_WARNING: 1,
  /**
   * Error: no InChI has been created
   */
  inchi_Ret_ERROR: 2,
  /**
   * Severe error: no InChI has been created (typically, memory allocation failure)
   */
  inchi_Ret_FATAL: 3,
  /**
   * Unknown program error
   */
  inchi_Ret_UNKNOWN: 4,
  /**
   * Previous call to InChI has not returned yet
   */
  inchi_Ret_BUSY: 5,
  /**
   * No structural data have been provided
   */
  inchi_Ret_EOF: -1,
  /**
   * Not used in InChI library
   */
  inchi_Ret_SKIP: -2,
} as const;
export type GetINCHIReturnCode = typeof GetINCHIReturnCode[keyof typeof GetINCHIReturnCode];

export const CheckINCHIKeyReturnCode = {
  /**
   * InChIKey is valid and standard
   */
  INCHIKEY_VALID_STANDARD: 0,
  /**
   * InChIKey has invalid length
   */
  INCHIKEY_INVALID_LENGTH: 1,
  /**
   * InChIKey has invalid layout
   */
  INCHIKEY_INVALID_LAYOUT: 2,
  /**
   * InChIKey has invalid version number (not equal to 1)
   */
  INCHIKEY_INVALID_VERSION: 3,
  /**
   * InChIKey is valid and non-standard
   */
  INCHIKEY_VALID_NON_STANDARD: -1,
} as const;
export type CheckINCHIKeyReturnCode = typeof CheckINCHIKeyReturnCode[keyof typeof CheckINCHIKeyReturnCode];

export const CheckINCHIReturnCode = {
  /**
   * InChI is valid and standard
   */
  INCHI_VALID_STANDARD: 0,
  /**
   * InChI has invalid Prefix
   */
  INCHI_INVALID_PREFIX: 1,
  /**
   * InChI has invalid version number (not equal to 1)
   */
  INCHI_INVALID_VERSION: 2,
  /**
   * InChI has invalid layout
   */
  INCHI_INVALID_LAYOUT: 3,
  /**
   * Checking InChI through InChI2InChI either failed or produced a result which does not match the source InChI string
   */
  INCHI_FAIL_I2I: 4,
  /**
   * InChI is valid and non-standard
   */
  INCHI_VALID_NON_STANDARD: -1,
} as const;
export type CheckINCHIReturnCode = typeof CheckINCHIReturnCode[keyof typeof CheckINCHIReturnCode];

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
  /**
   * Meaning: Ignore stereo
   * Default behaviour: Use absolute stereo
   */
  SNon?: boolean;
  /**
   * Meaning: Use relative stereo
   * Default behaviour: Use absolute stereo
   */
  SRel?: boolean;
  /**
   * Meaning: Use racemic stereo
   * Default behaviour: Use absolute stereo
   */
  SRac?: boolean;
  /**
   * Meaning: Use Chiral Flag in MOL/SD file record: 
     if On – use Absolute stereo,
        Off – use Relative stereo
   * Default behaviour: Use absolute stereo
   */
  SUCF?: boolean;
  /**
   * Meaning: Set chiral flag ON
   * Default behaviour: -
   */
  ChiralFlagON?: boolean;
  /**
   * Meaning: Set chiral flag OFF
   * Default behaviour: -
   */
  ChiralFlagOFF?: boolean;
  /**
   * Meaning: Always indicate unknown/undefined stereo
   * Default behaviour: Does not indicate unknown/undefined stereo unless at least one defined stereo is present
   */
  SUU?: boolean;
  /**
   * Meaning: Stereo labels for “unknown” and “undefined” are different,‘u’ and ‘?’, resp. (new option)
   * Default behaviour: Stereo labels for “unknown” and “undefined” are the same (‘?’)
   */
  SLUUD?: boolean;
  /**
   * Meaning: Include reconnected metals results
   * Default behaviour: Do not include
   */
  FixedH?: boolean;
  /**
   * Meaning: Include Fixed H layer
   * Default behaviour: Do not include
   */
  RecMet?: boolean;
  /**
   * Meaning: Account for keto-enol tautomerism (experimental; extension to InChI 1)
   * Default behaviour: Ignore keto-enol tautomerism
   */
  KET?: boolean;
  /**
   * Meaning: Account for 1,5-tautomerism (experimental; extension to InChI 1)
   * Default behaviour: Ignore 1,5-tautomerism
   */
  "15T"?: boolean;
  /**
   * Meaning: Omit auxiliary information
   * Default behaviour: Include
   */
  AuxNone?: boolean;
  /**
   * Meaning: Set time-out per structure in seconds; W0 means unlimited
   * Default behaviour: The default value is unlimited
   */
  Wnumber?: boolean;
  /**
   * Meaning: (new in v. 1.06) Set time-out per structure in milliseconds; W0 means unlimited
   * Default behaviour: The default value is unlimited
   */
  Wmnumber?: boolean;
  /**
   * Meaning: (new in v. 1.06) Suppress allwarning messages(default:show)
   * Default behaviour: Output warnings as usuals
   */
  NoWarnings?: boolean;
  /**
   * Meaning: Output SDfile instead of InChI
   * Default behaviour: -
   */
  OutputSDF?: boolean;
  /**
   * Meaning: Warn and produce empty InChI for empty structure
   * Default behaviour: Just skip empty structure
   */
  WarnOnEmptyStructure?: boolean;
  /**
   * Meaning: Save custom InChI creation options (non-standard InChI)
   * Default behaviour: Do not save custom opts
   */
  SaveOpt?: boolean;
}

export interface GetINCHIExOptions extends GetINCHIOptions {
  /**
   * Meaning: (new in v. 1.06) Relax strictness of tetrahedral stereo ambiguity check for stereo atoms in (large) rings
   * Default behaviour: Use strict criteria (as in v. 1.05 and previous
   */
  LooseTSACheck?: boolean;
  /**
   * Meaning: Experimental support of simple polymers, current mode
   * Default behaviour: Disabled
   */
  Polymers?: boolean;
  /**
   * Meaning: (new in v. 1.06) Experimental support of simple polymers in legacy v. 1.05 mode
   * Default behaviour: Disabled
   */
  Polymers105?: boolean;
  /**
   * Meaning: (new in v. 1.06) Disable polymer CRU frame shift
   * Default behaviour: Attempt CRU frame shift
   */
  NoFrameShift?: boolean;
  /**
   * Meaning: (new in v. 1.06)In polymer treatment, try to fold constitutional repeating units which themselves contain repeats
   * Default behaviour: Disabled
   */
  FoldCRU?: boolean;
  /**
   * Meaning: (new in v. 1.06) Allow non-polymer Zz pseudo element atoms
   * Default behaviour: Disabled
   */
  NPZz?: boolean;
  /**
   * Meaning: (new in v. 1.06) Allow stereo at atoms connected to Zz
   * Default behaviour: Disabled
   */
  SAtZZ?: boolean;
  /**
   * Meaning: Experimental support of molecules up to 32767 atoms
   * Default behaviour: Disabled
   */
  LargeMolecules?: boolean;
}

export interface INCHIOutput {
  szInChI: string;
  szAuxInfo: string;
  szMessage: string;
  szLog: string;
}

export interface GetStructFromINCHIOutput {
  /**
   * Returns code from -2 to 5 to show different results
   */
  status: GetINCHIReturnCode;
  /**
   * Returns an object of inchi_OutputStruct
   */
  data: INCHIOutputStruct;
}

export interface GetStructFromINCHIExOutput {
  /**
   * Returns code from -2 to 5 to show different results
   */
  status: GetINCHIReturnCode;
  /**
   * Returns an object of inchi_OutputStructEx
   */
  data: INCHIOutputStructEx;
}

// #endregion

// #region Private Functions

function generateOptionsString(input?: GetINCHIOptions | GetINCHIExOptions): string {
  let optionString = "";
  if (input !== undefined) {
    const marker = process.platform === "win32" ? "/" : "-";
    let options = Object.keys(input)
      .filter((ele) => {
        return input[ele as keyof (GetINCHIOptions | GetINCHIExOptions)] === true;
      })
      .map((ele) => {
        return `${marker}${ele}`;
      });
    optionString = options.join(" ");
  }
  return optionString;
}

// #endregion

// #region Public Functions

/**
 * Check if the string represents valid InChIKey
 * @param input A source InChIKey string
 * @returns One amongst -1 , 0 , 1 , 2 , 3
 *  - -1: InChIKey is valid and non-standard
 *  - 0: InChIKey is valid and standard
 *  - 1: InChIKey has invalid length
 *  - 2: InChIKey has invalid layout
 *  - 3: InChIKey has invalid version number (not equal to 1)
 */
export function CheckINCHIKey(input: string): CheckINCHIKeyReturnCode {
  return INCHIAPI.CheckINCHIKey(input) as CheckINCHIKeyReturnCode;
}

/**
 * CheckINCHI
 * Description: Check if the string represents valid InChI/standard InChI
 * Input: takes two argument
 *  input - source InChI string ,
 *  strict (optional) - if false, just briefly check for proper layout (prefix, version, etc.)
 * Output: Returns code -1 , 0 , 1 , 2 , 3 , 4
 * -1: InChI is valid and non-standard
 *  0: InChI is valid and standard
 *  1: InChI has invalid prefix
 *  2: InChI has invalid version number (not equal to 1)
 *  3: InChI has invalid layout
 *  4: Checking InChI through InChI2InChI either failed or produced a result which does not match the source InChI string
 */
export function CheckINCHI(input: string, strict?: boolean): CheckINCHIReturnCode {
  return INCHIAPI.CheckINCHI(input, strict === true ? 1 : 0) as CheckINCHIReturnCode;
}

/**
 * GetStringLength
 * Description: Returns length of the string
 * Input: input - A string
 * Ouput: length of the string
 */
export function GetStringLength(input: string): number {
  return INCHIAPI.GetStringLength(input);
}

/**
 * GetStructFromINCHI
 * Description: This function creates structure from InChI string
 * Input: It takes two arguments
 *  input - An Inchi String
 *  options (optional) - An object containing chosen options as key and their values as true
 * Ouput: ouput is an object containing status and data
 *  status - The returned code
 *  data - data contains structure created from input (Inchi) string
 *    atom - Array of atom objects which contains various data like atom co-ordinates (x,y,z) , neighbor, bondType , bondStereo, elName, numBonds, numIsoh, isotopicMass, radical, charge
 *    stereo0D - array of num_stereo0D 0D stereo elements or NULL
 *    numAtoms - number of atoms in the structure
 *    numStereo0D - number of 0D stereo elements
 *    szMessage - A string containing Error/warning ASCIIZ message
 *    szLog - log-file ASCIIZ string, contains a human-readable list of recognized options and possibly an Error/warn message
 *    warningFlags - A 2d Array conataining warnings
 *                  [x][y]:
 *                  x=0 => Reconnected if present in InChI otherwise Disconnected/Normal
 *                  x=1 => Disconnected layer if Reconn. layer is present
 *                  y=1 => Main layer or Mobile-H
 *                  y=0 => Fixed-H layer
 */
export function GetStructFromINCHI(input: string, options?: GetINCHIOptions): GetStructFromINCHIOutput {
  const inchiIn = new inchi_InputINCHI({ szInChI: input, szOptions: generateOptionsString(options) });
  const inchiOutStruct = new inchi_OutputStruct();
  // @ts-expect-error Bad types in dep libs
  const returnCode: GetINCHIReturnCode = INCHIAPI.GetStructFromINCHI(inchiIn.ref(), inchiOutStruct.ref());
  const outputData: INCHIOutputStruct = {
    atom: generateINCHIAtom(inchiOutStruct.atom.deref()),
    stereo0D: inchiOutStruct.stereo0D,
    numAtoms: inchiOutStruct.num_atoms,
    numStereo0D: inchiOutStruct.num_stereo0D,
    szMessage: inchiOutStruct.szMessage,
    szLog: inchiOutStruct.szLog,
    warningFlags: inchiOutStruct.WarningFlags,
  };
  const output: GetStructFromINCHIOutput = { status: returnCode, data: outputData };
  return output;
}

/**
 * GetStructFromINCHIEx
 * Description: This extended version of GetStructFromINCHI supports v. 1.05 extensions: polymers and Molfile V3000 (partial support)
 * Input: It takes two arguments
 *  input - An Inchi String
 *  options (optional) - An object containing chosen options as key and their values as true
 * Ouput: ouput is an object containing status and data ,  It is a superset of inchi_OutputStruct including additional data-substructures carrying an information on polymers and V3000 features
 *  status - The returned code
 *  data - data contains structure created from input (Inchi) string
 *    atom - Array of atom objects which contains various data like atom co-ordinates (x,y,z) , neighbor, bondType , bondStereo, elName, numBonds, numIsoh, isotopicMass, radical, charge
 *    stereo0D - array of num_stereo0D 0D stereo elements or NULL
 *    numAtoms - number of atoms in the structure
 *    numStereo0D - number of 0D stereo elements
 *    szMessage - A string containing Error/warning ASCIIZ message
 *    szLog - log-file ASCIIZ string, contains a human-readable list of recognized options and possibly an Error/warn message
 *    warningFlags - A 2d Array conataining warnings
 *                  [x][y]:
 *                  x=0 => Reconnected if present in InChI otherwise Disconnected/Normal
 *                  x=1 => Disconnected layer if Reconn. layer is present
 *                  y=1 => Main layer or Mobile-H
 *                  y=0 => Fixed-H layer
 *    polymer - Array of Polymers , A Polymer contains two data , units and n.
 *        units - Array of Polymer units
 *        n - number of Polymer units
 *    v3000 - Array of V3000 Molfile features
 */
export function GetStructFromINCHIEx(input: string, options?: GetINCHIExOptions): GetStructFromINCHIExOutput {
  const inchiIn = new inchi_InputINCHI({ szInChI: input, szOptions: generateOptionsString(options) });
  const inchiOutStructEx = new inchi_OutputStructEx();
  // @ts-expect-error Bad types in dep libs
  const returnCode: GetINCHIReturnCode = INCHIAPI.GetStructFromINCHI(inchiIn.ref(), inchiOutStructEx.ref());
  const outputDataEx: INCHIOutputStructEx = {
    atom: generateINCHIAtom(inchiOutStructEx.atom.deref()),
    stereo0D: inchiOutStructEx.stereo0D,
    numAtoms: inchiOutStructEx.num_atoms,
    numStereo0D: inchiOutStructEx.num_stereo0D,
    szMessage: inchiOutStructEx.szMessage,
    szLog: inchiOutStructEx.szLog,
    warningFlags: inchiOutStructEx.WarningFlags,
    polymer: inchiOutStructEx.polymer,
    v3000: inchiOutStructEx.v3000,
  };
  const output: GetStructFromINCHIExOutput = { status: returnCode, data: outputDataEx };
  return output;
}

/**
 * This is the “standard” counterpart of GetStructFromINCHI
 * @param input An Inchi String
 * @param options An object containing chosen options as key and their values as true
 */
export function GetStructFromStdINCHI(input: string, options?: GetINCHIOptions): GetStructFromINCHIOutput {
  const inchiIn = new inchi_InputINCHI({ szInChI: input, szOptions: generateOptionsString(options) });
  const inchiOutStruct = new inchi_OutputStruct();
  // @ts-expect-error Bad types in dep libs
  const returnCode: GetINCHIReturnCode = INCHIAPI.GetStructFromINCHI(inchiIn.ref(), inchiOutStruct.ref());
  const outputData: INCHIOutputStruct = {
    atom: generateINCHIAtom(inchiOutStruct.atom.deref()),
    stereo0D: inchiOutStruct.stereo0D,
    numAtoms: inchiOutStruct.num_atoms,
    numStereo0D: inchiOutStruct.num_stereo0D,
    szMessage: inchiOutStruct.szMessage,
    szLog: inchiOutStruct.szLog,
    warningFlags: inchiOutStruct.WarningFlags,
  };
  const output: GetStructFromINCHIOutput = { status: returnCode, data: outputData };
  return output;
}

// #endregion
