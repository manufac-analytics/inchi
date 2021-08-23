import { INCHIAPI } from "./ffis";
import { inchi_InputINCHI, inchi_OutputStruct } from "./headers";
import refNAPI from "ref-napi";

type ReturnTypeCheckINCHIKey = 0 | -1 | 1 | 2 | 3;

export function CheckINCHIKey(input: string): ReturnTypeCheckINCHIKey {
  return INCHIAPI.CheckINCHIKey(input) as ReturnTypeCheckINCHIKey;
}

type ReturnTypeCheckINCHI = 0 | -1 | 1 | 2 | 3 | 4;

export function CheckINCHI(input: string, strict?: boolean): ReturnTypeCheckINCHI {
  return INCHIAPI.CheckINCHI(input, strict === true ? 1 : 0) as ReturnTypeCheckINCHI;
}

export function GetStringLength(input: string): number {
  return INCHIAPI.GetStringLength(input);
}

export interface GetINCHIOptions {
  NEWPSOFF?: boolean;
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

export function generateOptionsString(input: GetINCHIOptions | GetINCHIExOptions): string {
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

export interface INCHIOutput {
  szInChI: string;
  szAuxInfo: string;
  szMessage: string;
  szLog: string;
}

type ReturnTypeGetStructINCHI = 0 | -1 | -2 | 1 | 2 | 3 | 4 | 5;

export function GetStructFromINCHI(input: string, options: string[] = [""]): ReturnTypeGetStructINCHI {
  let inputInchiOptions: GetINCHIExOptions = {
    NEWPSOFF: false,
    DoNotAddH: false,
    SNon: false,
    SRel: false,
    SRac: false,
    SUCF: false,
    ChiralFlagON: false,
    ChiralFlagOFF: false,
    SUU: false,
    SLUUD: false,
    FixedH: false,
    RecMet: false,
    KET: false,
    "15T": false,
    AuxNone: false,
    Wnumber: false,
    Wmnumber: false,
    NoWarnings: false,
    OutputSDF: false,
    WarnOnEmptyStructure: false,
    SaveOpt: false,
    LooseTSACheck: false,
    Polymers: false,
    Polymers105: false,
    NoFrameShift: false,
    FoldCRU: false,
    NPZz: false,
    SAtZZ: false,
    LargeMolecules: false,
  };
  for (let opt of options) {
    inputInchiOptions[opt as keyof GetINCHIExOptions] = true;
  }
  const optionString = generateOptionsString(inputInchiOptions);
  const inchiInputObj = { szInChI: "", szOptions: "" };
  inchiInputObj.szInChI = input;
  inchiInputObj.szOptions = optionString;
  const inchiIn = new inchi_InputINCHI(inchiInputObj);
  const inchiOutStruct = new inchi_OutputStruct();
  const output = INCHIAPI.GetStructFromINCHI(inchiIn.ref(), inchiOutStruct.ref());
  return output as ReturnTypeGetStructINCHI;
}
