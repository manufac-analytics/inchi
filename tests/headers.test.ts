// @ts-nocheck There are some issues in the Definitely Typed packages of the "ref" related dependencies
import { strict } from "assert";
import refNAPI from "ref-napi";
import {
  ATOM_EL_LEN,
  INCHIAPI,
  inchi_Atom,
  inchi_Stereo0D,
  inchi_Input,
  inchi_Input_PolymerUnit,
  MAXVAL,
  NUM_H_ISOTOPES,
  inchi_Input_Polymer,
  inchi_Input_V3000,
  inchi_InputEx,
  inchi_InputINCHI,
  inchi_Output,
  inchi_OutputStruct,
  inchi_OutputStructEx,
  STR_ERR_LEN,
  InchiInpData,
  NORM_ATOM,
  MAX_NUM_STEREO_ATOM_NEIGH,
  MAX_NUM_STEREO_BONDS,
  NORM_ATOMS,
  NAPIArrayType,
  INCHI_NUM,
  INCHIGEN_DATA,
} from "../src";

/**
 * Instantiate inchi_Atom
 */
const inchiAtom = new inchi_Atom({
  x: 1.1,
  y: 2.2,
  z: 3.3,
  neighbor: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  bond_type: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  bond_stereo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  elname: [1, 2, 3, 4, 5, 6],
  num_bonds: 3,
  num_iso_H: [1, 2, 3, 4],
  isotopic_mass: 10,
  radical: "3",
  charge: -2,
});
strict.equal(inchiAtom.x, 1.1);
strict.equal(inchiAtom.y, 2.2);
strict.equal(inchiAtom.z, 3.3);
strict.equal(inchiAtom.neighbor.toArray().length, MAXVAL);
strict.equal(inchiAtom.bond_type.toArray().length, MAXVAL);
strict.equal(inchiAtom.bond_stereo.toArray().length, MAXVAL);
strict.equal(inchiAtom.elname.toArray().length, ATOM_EL_LEN);
strict.equal(inchiAtom.num_bonds, 3);
strict.equal(inchiAtom.num_iso_H.toArray().length, NUM_H_ISOTOPES + 1);
strict.equal(inchiAtom.isotopic_mass, 10);
strict.equal(inchiAtom.radical, "3".charCodeAt(0)); // ASCII code
strict.equal(inchiAtom.charge, -2);

/**
 * Instantiate inchi_Stereo0D
 */
const inchiStereo0D = new inchi_Stereo0D({
  neighbor: [1, 2, 3, 4],
  central_atom: 1,
  type: 1,
  parity: 1,
});
strict.equal(inchiStereo0D.neighbor.toArray().length, 4);
strict.equal(inchiStereo0D.central_atom, 1);
strict.equal(inchiStereo0D.type, 1);
strict.equal(inchiStereo0D.parity, 1);

/**
 * Instantiate inchi_Input
 */
const inchiInput = new inchi_Input({
  atom: refNAPI.alloc(inchi_Atom, {
    x: 1.1,
    y: 2.2,
    z: 3.3,
    neighbor: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    bond_type: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    bond_stereo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    elname: [1, 2, 3, 4, 5, 6],
    num_bonds: 3,
    num_iso_H: [1, 2, 3, 4],
    isotopic_mass: 10,
    radical: 2,
    charge: -2,
  }),
  stereo0D: refNAPI.alloc(inchi_Stereo0D, {
    neighbor: [1, 2, 3, 4],
    central_atom: 1,
    type: 1,
    parity: 1,
  }),
  szOptions: "some-string",
  num_atoms: 32767,
  num_stereo0D: -32768,
});
strict.equal(inchiInput.atom.deref().neighbor.toArray().length, MAXVAL);
strict.equal(inchiInput.stereo0D.deref().neighbor.toArray().length, 4);
strict.equal(inchiInput.szOptions, "some-string");
strict.equal(inchiInput.num_atoms, 32767);
strict.equal(inchiInput.num_stereo0D, -32768);

/**
 * Instantiate inchi_Input_PolymerUnit
 */
const inchiInputPolymerUnit = new inchi_Input_PolymerUnit({
  id: 1,
  type: 1,
  subtype: 1,
  conn: 1,
  label: 1,
  na: 1,
  nb: 1,
  xbr1: [1, 2, 3, 4],
  xbr2: [1, 2, 3, 4],
  smt: new Array(80).fill(7),
  alist: refNAPI.alloc(refNAPI.types.int, 11),
  blist: refNAPI.alloc(refNAPI.types.int, 11),
});
strict.equal(inchiInputPolymerUnit.id, 1);
strict.equal(inchiInputPolymerUnit.type, 1);
strict.equal(inchiInputPolymerUnit.conn, 1);
strict.equal(inchiInputPolymerUnit.label, 1);
strict.equal(inchiInputPolymerUnit.na, 1);
strict.equal(inchiInputPolymerUnit.nb, 1);
strict.equal(inchiInputPolymerUnit.xbr1.toArray().length, 4);
strict.equal(inchiInputPolymerUnit.xbr2.toArray().length, 4);
strict.equal(inchiInputPolymerUnit.smt.toArray().length, 80);
strict.equal(inchiInputPolymerUnit.alist.deref(), 11);
strict.equal(inchiInputPolymerUnit.blist.deref(), 11);

/**
 * Instantiate inchi_Input_Polymer
 */
const inchiInputPolymer = new inchi_Input_Polymer({
  units: refNAPI
    .alloc(inchi_Input_PolymerUnit, {
      id: 1,
      type: 1,
      subtype: 1,
      conn: 1,
      label: 1,
      na: 1,
      nb: 1,
      xbr1: [1, 2, 3, 4],
      xbr2: [1, 2, 3, 4],
      smt: new Array(80).fill(7),
      alist: refNAPI.alloc(refNAPI.types.int, 11),
      blist: refNAPI.alloc(refNAPI.types.int, 11),
    })
    .ref(),
  n: 1234,
});
strict.equal(inchiInputPolymer.units.deref().deref().id, 1);
strict.equal(inchiInputPolymer.units.deref().deref().smt.toArray().length, 80);
strict.equal(inchiInputPolymer.n, 1234);

/**
 * Instantiate inchi_Input_V3000
 */
const inchiInputV3000 = new inchi_Input_V3000({
  n_non_star_atoms: 4,
  n_star_atoms: 3,
  atom_index_orig: refNAPI.alloc(refNAPI.types.int, 11),
  atom_index_fin: refNAPI.alloc(refNAPI.types.int, 11),
  n_sgroups: 13,
  n_3d_constraints: 13,
  n_collections: 12,
  n_non_haptic_bonds: 11,
  n_haptic_bonds: 11,
  lists_haptic_bonds: refNAPI.alloc(refNAPI.types.int, 11).ref(),
  n_steabs: 14,
  lists_steabs: refNAPI.alloc(refNAPI.types.int, 11).ref(),
  n_sterel: 19,
  lists_sterel: refNAPI.alloc(refNAPI.types.int, 11).ref(),
  n_sterac: 21,
  lists_sterac: refNAPI.alloc(refNAPI.types.int, 11).ref(),
});
strict.equal(inchiInputV3000.n_non_star_atoms, 4);
strict.equal(inchiInputV3000.n_star_atoms, 3);
strict.equal(inchiInputV3000.atom_index_orig.deref(), 11);
strict.equal(inchiInputV3000.atom_index_fin.deref(), 11);
strict.equal(inchiInputV3000.n_sgroups, 13);
strict.equal(inchiInputV3000.n_3d_constraints, 13);
strict.equal(inchiInputV3000.n_collections, 12);
strict.equal(inchiInputV3000.n_non_haptic_bonds, 11);
strict.equal(inchiInputV3000.n_haptic_bonds, 11);
strict.equal(inchiInputV3000.lists_haptic_bonds.deref().deref(), 11);
strict.equal(inchiInputV3000.n_steabs, 14);
strict.equal(inchiInputV3000.lists_steabs.deref().deref(), 11);
strict.equal(inchiInputV3000.n_sterel, 19);
strict.equal(inchiInputV3000.lists_sterel.deref().deref(), 11);
strict.equal(inchiInputV3000.n_sterac, 21);
strict.equal(inchiInputV3000.lists_sterac.deref().deref(), 11);

/**
 * Instantiate inchi_InputEx
 */
const inchiInputEx = new inchi_InputEx({
  atom: refNAPI.alloc(inchi_Atom),
  Stereo0D: refNAPI.alloc(inchi_Stereo0D),
  szOptions: "some-string",
  num_atoms: 11,
  num_stereo0D: 13,
  polymer: refNAPI.alloc(inchi_Input_Polymer),
  v3000: refNAPI.alloc(inchi_Input_V3000),
});
strict.equal(inchiInputEx.atom.deref().x, 0);
strict.equal(inchiInputEx.Stereo0D.deref().parity, 0);
strict.equal(inchiInputEx.szOptions, "some-string");
strict.equal(inchiInputEx.num_atoms, 11);
strict.equal(inchiInputEx.num_stereo0D, 13);
strict.equal(inchiInputEx.polymer.deref().n, 0);
strict.equal(inchiInputEx.v3000.deref().n_non_star_atoms, 0);

/**
 * Instantiate inchi_InputINCHI
 */
const inchiInputINCHI = new inchi_InputINCHI({
  szInChI: "some-string",
  szOptions: "some-string",
});
strict.equal(inchiInputINCHI.szInChI, "some-string");
strict.equal(inchiInputINCHI.szOptions, "some-string");

/**
 * Instantiate inchi_Output
 */
const inchiOutput = new inchi_Output({
  szInChI: "some-string",
  szAuxInfo: "some-string",
  szMessage: "some-string",
  szLog: "some-string",
});
strict.equal(inchiOutput.szInChI, "some-string");
strict.equal(inchiOutput.szAuxInfo, "some-string");
strict.equal(inchiOutput.szMessage, "some-string");
strict.equal(inchiOutput.szLog, "some-string");

/**
 * Instantiate inchi_OutputStruct
 */
const inchiOutputStruct = new inchi_OutputStruct({
  atom: refNAPI.alloc(inchi_Atom),
  Stereo0D: refNAPI.alloc(inchi_Stereo0D),
  num_atoms: 1,
  num_stereo0D: 2,
  szMessage: "some-string",
  szLog: "some-string",
  WarningFlags: [
    [1, 2],
    [3, 4],
  ],
});
strict.equal(inchiOutputStruct.atom.deref().x, 0);
strict.equal(inchiInputEx.Stereo0D.deref().parity, 0);
strict.equal(inchiOutputStruct.num_atoms, 1);
strict.equal(inchiOutputStruct.num_stereo0D, 2);
strict.equal(inchiOutputStruct.szMessage, "some-string");
strict.equal(inchiOutputStruct.szLog, "some-string");
strict.equal(inchiOutputStruct.WarningFlags[0][0], 1);

/**
 * Instantiate inchi_OutputStructEx
 */
const inchiOutputStructEx = new inchi_OutputStructEx({
  atom: refNAPI.alloc(inchi_Atom),
  Stereo0D: refNAPI.alloc(inchi_Stereo0D),
  num_atoms: 1,
  num_stereo0D: 2,
  szMessage: "some-string",
  szLog: "some-string",
  WarningFlags: [
    [1, 2],
    [3, 4],
  ],
  polymer: refNAPI.alloc(inchi_Input_Polymer),
  v3000: refNAPI.alloc(inchi_Input_V3000),
});
strict.equal(inchiOutputStructEx.atom.deref().x, 0);
strict.equal(inchiOutputStructEx.Stereo0D.deref().parity, 0);
strict.equal(inchiOutputStructEx.num_atoms, 1);
strict.equal(inchiOutputStructEx.num_stereo0D, 2);
strict.equal(inchiOutputStructEx.szMessage, "some-string");
strict.equal(inchiOutputStructEx.szLog, "some-string");
strict.equal(inchiOutputStructEx.WarningFlags[0][0], 1);
strict.equal(inchiOutputStructEx.polymer.deref().n, 0);
strict.equal(inchiOutputStructEx.v3000.deref().n_non_star_atoms, 0);

/**
 * Instantiate InchiInpData
 */
const InchiInpData1 = new InchiInpData({
  pInp: refNAPI.alloc(inchi_Input),
  bChiral: 1,
  szErrMsg: new Array(STR_ERR_LEN).fill(0),
});
strict.equal(InchiInpData1.pInp.deref().num_atoms, 0);
strict.equal(InchiInpData1.bChiral, 1);
strict.equal(InchiInpData1.szErrMsg.toArray().length, STR_ERR_LEN);

/**
 * Instantiate NORM_ATOM
 */
const NORMATOM = new NORM_ATOM({
  elname: ["1", "2", "3", "4", "5", "6"],
  el_number: "1",
  neighbor: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  orig_at_number: 1,
  orig_compt_at_numb: 1,
  bond_stereo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  bond_type: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  valence: "1",
  chem_bonds_valence: "1",
  num_H: "1",
  num_iso_H: [1, 2, 3],
  iso_atw_diff: "1",
  radical: "3",
  charge: -2,
  bAmbiguousStereo: "1",
  cFlags: "1",
  at_type: 1,
  component: 1,
  endpoint: 1,
  c_point: 1,
  x: 1.1,
  y: 2.2,
  z: 3.3,
  bUsed0DParity: "1",
  p_parity: "1",
  p_orig_at_num: [1, 2, 3, 4],
  sb_ord: ["1", "2", "3"],
  sn_ord: ["1", "2", "3"],
  sb_parity: ["1", "2", "3"],
  sn_orig_at_num: [1, 2, 3],
});
strict.equal(NORMATOM.elname.length, ATOM_EL_LEN);
strict.equal(NORMATOM.el_number, "1".charCodeAt(0));
strict.equal(NORMATOM.neighbor.length, MAXVAL);
strict.equal(NORMATOM.orig_at_number, 1);
strict.equal(NORMATOM.orig_compt_at_numb, 1);
strict.equal(NORMATOM.bond_type.toArray().length, MAXVAL);
strict.equal(NORMATOM.bond_stereo.toArray().length, MAXVAL);
strict.equal(NORMATOM.valence, "1".charCodeAt(0));
strict.equal(NORMATOM.chem_bonds_valence, "1".charCodeAt(0));
strict.equal(NORMATOM.num_H, "1".charCodeAt(0));
strict.equal(NORMATOM.num_iso_H.toArray().length, NUM_H_ISOTOPES);
strict.equal(NORMATOM.iso_atw_diff, "1".charCodeAt(0));
strict.equal(NORMATOM.radical, "3".charCodeAt(0)); // ASCII code
strict.equal(NORMATOM.charge, -2);
strict.equal(NORMATOM.bAmbiguousStereo, "1".charCodeAt(0));
strict.equal(NORMATOM.cFlags, "1".charCodeAt(0));
strict.equal(NORMATOM.at_type, 1);
strict.equal(NORMATOM.component, 1);
strict.equal(NORMATOM.endpoint, 1);
strict.equal(NORMATOM.c_point, 1);
strict.equal(NORMATOM.x, 1.1);
strict.equal(NORMATOM.y, 2.2);
strict.equal(NORMATOM.z, 3.3);
strict.equal(NORMATOM.bUsed0DParity, "1".charCodeAt(0));
strict.equal(NORMATOM.p_parity, "1".charCodeAt(0));
strict.equal(NORMATOM.p_orig_at_num.toArray().length, MAX_NUM_STEREO_ATOM_NEIGH);
strict.equal(NORMATOM.sb_ord.toArray().length, MAX_NUM_STEREO_BONDS);
strict.equal(NORMATOM.sn_ord.toArray().length, MAX_NUM_STEREO_BONDS);
strict.equal(NORMATOM.sb_parity.toArray().length, MAX_NUM_STEREO_BONDS);
strict.equal(NORMATOM.sn_orig_at_num.toArray().length, MAX_NUM_STEREO_BONDS);

/**
 * Instantiate NORM_ATOMS
 */
const NORMATOMS = new NORM_ATOMS({
  at: refNAPI.alloc(NORM_ATOM),
  at_fixed_bonds: refNAPI.alloc(NORM_ATOM),
  num_at: 1,
  num_removed_H: 1,
  num_bonds: 1,
  num_isotopic: 1,
  bExists: 1,
  bDeleted: 1,
  bHasIsotopicLayer: 1,
  bTautomeric: 1,
  bTautPreprocessed: 1,
  nNumRemovedProtons: 1,
  nNumRemovedProtonsIsotopic: [1, 2, 3],
  num_iso_H: [1, 2, 3],
  bTautFlags: 1,
  bTautFlagsDone: 1,
  bNormalizationFlags: 1,
});
strict.equal(NORMATOMS.at.deref().num_H, 0);
strict.equal(NORMATOMS.at_fixed_bonds.deref().num_H, 0);
strict.equal(NORMATOMS.num_at, 1);
strict.equal(NORMATOMS.num_removed_H, 1);
strict.equal(NORMATOMS.num_bonds, 1);
strict.equal(NORMATOMS.num_isotopic, 1);
strict.equal(NORMATOMS.bExists, 1);
strict.equal(NORMATOMS.bDeleted, 1);
strict.equal(NORMATOMS.bHasIsotopicLayer, 1);
strict.equal(NORMATOMS.bTautomeric, 1);
strict.equal(NORMATOMS.bTautPreprocessed, 1);
strict.equal(NORMATOMS.nNumRemovedProtons, 1);
strict.equal(NORMATOMS.nNumRemovedProtonsIsotopic.toArray().length, NUM_H_ISOTOPES);
strict.equal(NORMATOMS.num_iso_H.toArray().length, NUM_H_ISOTOPES);
strict.equal(NORMATOMS.bTautFlags, 1);
strict.equal(NORMATOMS.bTautFlagsDone, 1);
strict.equal(NORMATOMS.bNormalizationFlags, 1);

/**
 * Instantiate INCHIGEN_DATA
 */
// const INCHIGENDATA= new INCHIGEN_DATA({
//   pStrErrStruct: new Array(STR_ERR_LEN).fill(0),
//   num_components:[1,2],
//   NormAtomsNontaut:refNAPI.alloc([1,2]),
//   NormAtomsTaut:refNAPI.alloc([1,2]),
// });
// strict.equal(INCHIGENDATA.pStrErrStruct.toArray().length,STR_ERR_LEN);
// strict.equal(INCHIGENDATA.num_components.toArray().length,INCHI_NUM);
// strict.equal(INCHIGENDATA.NormAtomsNontaut.toArray().length,INCHI_NUM);
// strict.equal(INCHIGENDATA.NormAtomsTaut.toArray().length,INCHI_NUM);
