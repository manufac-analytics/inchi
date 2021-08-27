// @ts-nocheck There are some issues in the Definitely Typed packages of the "ref" related dependencies.
import {
  ATOMELLENTuple,
  INCHIAtom,
  MAXVALTuple,
  NUMHISOTOPESTuple,
  INCHIStereo0D,
  FourNumberTuple,
  inchi_Input_Polymer,
  INCHIInputPolymer,
  inchi_Input_PolymerUnit,
  INCHIInputPolymerUnit,
  EightyNumberTuple,
} from "./headers";
import refNAPI from "ref-napi";
import { inchi_Atom, inchi_Stereo0D } from "./headers";

export function generateINCHIAtom(input: ReturnType<typeof inchi_Atom>): INCHIAtom {
  const output: INCHIAtom = {
    x: input.x,
    y: input.y,
    z: input.z,
    neighbor: input.neighbor.toArray() as MAXVALTuple,
    bondType: input.bond_type.toArray() as MAXVALTuple,
    bondStereo: input.bond_stereo.toArray() as MAXVALTuple,
    elName: input.elname.toArray() as ATOMELLENTuple,
    numBonds: input.num_bonds,
    numIsoH: input.num_iso_H.toArray() as NUMHISOTOPESTuple,
    isotopicMass: input.isotopic_mass,
    radical: input.radical,
    charge: input.charge,
  };
  return output;
}

export function generateINCHIStereo0D(input: ReturnType<typeof inchi_Stereo0D>): INCHIStereo0D {
  const output: INCHIStereo0D = {
    neighbor: input.neighbor.toArray() as FourNumberTuple,
    centralAtom: input.central_atom,
    type: input.type,
    parity: input.parity,
  };
  return output;
}

function generateINCHIInputPolymerUnit(
  input: refNAPI.Pointer<ReturnType<typeof inchi_Input_PolymerUnit>>[]
): INCHIInputPolymerUnit[] {
  let output: INCHIInputPolymerUnit[] = [];
  let unit: INCHIInputPolymerUnit;
  for (let elementPtr of inputArray) {
    const element = elementPtr.deref();
    unit = {
      id: element.id,
      type: element.type,
      subType: element.subtype,
      conn: element.conn,
      label: element.label,
      nA: element.na,
      nB: element.nb,
      xBr1: element.xbr1.toArray() as FourNumberTuple,
      xBr2: element.xbr2.toArray() as FourNumberTuple,
      smt: element.smt.toArray() as EightyNumberTuple,
      aList: element.alist.deref(),
      bList: element.blist.deref(),
    };
    output.push(unit);
  }
  return output;
}

export function generateINCHIInputPolymer(input: ReturnType<typeof inchi_Input_Polymer>): INCHIInputPolymer {
  const output: INCHIInputPolymer = {
    units: generateINCHIInputPolymerUnit(input.units.deref()),
    n: input.n,
  };
  return output;
}
