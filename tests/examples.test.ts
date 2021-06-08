import { strict } from "assert";
import refNAPI from "ref-napi";
import ArrayType from "ref-array-di";
import { ATOM_EL_LEN, INCHIAPI, inchi_Atom, inchi_Stereo0D, MAXVAL, NUM_H_ISOTOPES } from "../src";

const NAPIArrayType = ArrayType(refNAPI);

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
  // @ts-ignore
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
strict.equal(inchiAtom.radical, 2);
strict.equal(inchiAtom.charge, -2);

/**
 * Instantiate inchi_Stereo0D
 */
// @ts-ignore
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
