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
} from "../src";

/**
 * Check if the string represents valid InChIKey.
 */
strict.equal(INCHIAPI.CheckINCHIKey("VNWKTOKETHGBQD-UHFFFAOYSA-N"), 0); // Valid length and valid format
strict.equal(INCHIAPI.CheckINCHIKey("OTMSDBZUPAUEDD-UHFFFAOYSA-N"), 0); // Valid length and valid format

/**
 * Check if the string represents valid InChI/standard InChI.
 */
strict.equal(INCHIAPI.CheckINCHI("InChI=1S/C3H5NO/c1-2-5-3-4-1/h3H,1-2H2/p+1", 0), 0); // Standard InChI
strict.equal(
  INCHIAPI.CheckINCHI(
    "InChI=1S/C55H73N4O5.Mg/c1-13-39-35(8)42-28-44-37(10)41(24-25-48(60)64-27-26-34(7)23-17-22-33(6)21-16-20-32(5)19-15-18-31(3)4)52(58-44)50-51(55(62)63-12)54(61)49-38(11)45(59-53(49)50)30-47-40(14-2)36(9)43(57-47)29-46(39)56-42;/h13,26,28-33,37,41,51H,1,14-25,27H2,2-12H3,(H-,56,57,58,59,61);/q-1;+2/p-1/b34-26+;/t32-,33-,37+,41+,51-;/m1./s1",
    0
  ),
  0
); // Standard InChI

/**
 * Returns string length.
 */
strict.equal(INCHIAPI.GetStringLength("VNWKTOKETHGBQD-UHFFFAOYSA-N"), 27);
strict.equal(INCHIAPI.GetStringLength("4444"), 4);

/**
 * Instantiate char pointer (char *)
 */
const charPointer = refNAPI.alloc(refNAPI.types.char, 2);
strict.equal(refNAPI.deref(charPointer), 2);

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
