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
  inchi_Input_V3000,
  INCHIInputV3000,
} from "./headers";
import refNAPI from "ref-napi";
import { inchi_Atom, inchi_Stereo0D } from "./headers";

export function generateINCHIAtoms(input: ReturnType<typeof inchi_Atom>[]): INCHIAtom[] {
  let output: INCHIAtom[] = input.map((element) => {
    const out: INCHIAtom = {
      x: element.x,
      y: element.y,
      z: element.z,
      neighbor: element.neighbor.toArray() as MAXVALTuple,
      bondType: element.bond_type.toArray() as MAXVALTuple,
      bondStereo: element.bond_stereo.toArray() as MAXVALTuple,
      elName: element.elname.toArray() as ATOMELLENTuple,
      numBonds: element.num_bonds,
      numIsoH: element.num_iso_H.toArray() as NUMHISOTOPESTuple,
      isotopicMass: element.isotopic_mass,
      radical: element.radical,
      charge: element.charge,
    };
    return out;
  });
  return output;
}

export function generateINCHIStereo0Ds(input: ReturnType<typeof inchi_Stereo0D>[]): INCHIStereo0D[] {
  let output: INCHIStereo0D[] = input.map((element) => {
    const out: INCHIStereo0D = {
      neighbor: element.neighbor.toArray() as FourNumberTuple,
      centralAtom: element.central_atom,
      type: element.type,
      parity: element.parity,
    };
    return out;
  });
  return output;
}

function generateINCHIInputPolymerUnits(
  input: refNAPI.Pointer<ReturnType<typeof inchi_Input_PolymerUnit>>[]
): INCHIInputPolymerUnit[] {
  let output: INCHIInputPolymerUnit[] = input.map((element) => {
    const derefedUnit = element.deref();
    const out: INCHIInputPolymerUnit = {
      id: derefedUnit.id,
      type: derefedUnit.type,
      subType: derefedUnit.subtype,
      conn: derefedUnit.conn,
      label: derefedUnit.label,
      nA: derefedUnit.na,
      nB: derefedUnit.nb,
      xBr1: derefedUnit.xbr1.toArray() as FourNumberTuple,
      xBr2: derefedUnit.xbr2.toArray() as FourNumberTuple,
      smt: derefedUnit.smt.toArray() as EightyNumberTuple,
      aList: derefedUnit.alist.toArray(),
      bList: derefedUnit.blist.toArray(),
    };
    return out;
  });
  return output;
}

export function generateINCHIInputPolymer(input: ReturnType<typeof inchi_Input_Polymer>): INCHIInputPolymer {
  const out: INCHIInputPolymer = {
    units: generateINCHIInputPolymerUnits(input.units.toArray()),
    n: input.n,
  };
  return out;
}

export function generateINCHIInputV3000(input: ReturnType<typeof inchi_Input_V3000>): INCHIInputV3000 {
  const out: INCHIInputV3000 = {
    nNonStartAtoms: input.n_non_star_atoms,
    nStarAtoms: input.n_star_atoms,
    atomIndexOrig: input.atom_index_orig.deref(),
    atomIndexFin: input.atom_index_fin.deref(),
    nSGroups: input.n_sgroups,
    n3DContraints: input.n_3d_constraints,
    nCollections: input.n_collections,
    nNonHapticBonds: input.n_non_haptic_bonds,
    nHapticBonds: input.n_haptic_bonds,
    listsHapticBonds: input.lists_haptic_bonds.deref().toArray(),
    nSteabs: input.n_steabs,
    listsSteabs: input.lists_steabs.toArray().map((element) => element.toArray()),
    nSterel: input.n_sterel,
    listsSterel: input.lists_sterel.toArray().map((element) => element.toArray()),
    nSterac: input.n_sterac,
    listsSterac: input.lists_sterac.toArray().map((element) => element.toArray()),
  };
  return out;
}
