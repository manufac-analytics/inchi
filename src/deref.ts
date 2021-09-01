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

export function generateINCHIAtom(input: ReturnType<typeof inchi_Atom>[]): INCHIAtom[] {
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

export function generateINCHIStereo0D(input: ReturnType<typeof inchi_Stereo0D>[]): INCHIStereo0D[] {
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

function generateINCHIInputPolymerUnit(
  input: refNAPI.Pointer<ReturnType<typeof inchi_Input_PolymerUnit>>[]
): INCHIInputPolymerUnit[] {
  let output: INCHIInputPolymerUnit[] = input.map((element) => {
    const out: INCHIInputPolymerUnit = {
      id: element.deref().id,
      type: element.deref().type,
      subType: element.deref().subtype,
      conn: element.deref().conn,
      label: element.deref().label,
      nA: element.deref().na,
      nB: element.deref().nb,
      xBr1: element.deref().xbr1.toArray() as FourNumberTuple,
      xBr2: element.deref().xbr2.toArray() as FourNumberTuple,
      smt: element.deref().smt.toArray() as EightyNumberTuple,
      aList: element.deref().alist.toArray(),
      bList: element.deref().blist.toArray(),
    };
    return out;
  });
  return output;
}

export function generateINCHIInputPolymer(input: ReturnType<typeof inchi_Input_Polymer>[]): INCHIInputPolymer[] {
  let output: INCHIInputPolymer[] = input.map((element) => {
    const out: INCHIInputPolymer = {
      units: generateINCHIInputPolymerUnit(element.units.toArray()),
      n: element.n,
    };
    return out;
  });
  return output;
}

export function generateINCHIInputV3000(input: ReturnType<typeof inchi_Input_V3000>[]): INCHIInputV3000[] {
  let output: INCHIInputV3000[] = input.map((element) => {
    const out: INCHIInputV3000 = {
      nNonStartAtoms: element.n_non_star_atoms,
      nStarAtoms: element.n_star_atoms,
      atomIndexOrig: element.atom_index_orig.deref(),
      atomIndexFin: element.atom_index_fin.deref(),
      nSGroups: element.n_sgroups,
      n3DContraints: element.n_3d_constraints,
      nCollections: element.n_collections,
      nNonHapticBonds: element.n_non_haptic_bonds,
      nHapticBonds: element.n_haptic_bonds,
      listsHapticBonds: element.lists_haptic_bonds.toArray().map((element) => element.deref()),
      nSteabs: element.n_steabs,
      listsSteabs: element.lists_steabs.toArray().map((element) => element.toArray()),
      nSterel: element.n_sterel,
      listsSterel: element.lists_sterel.toArray().map((element) => element.toArray()),
      nSterac: element.n_sterac,
      listsSterac: element.lists_sterac.toArray().map((element) => element.toArray()),
    };
    return out;
  });
  return output;
}
