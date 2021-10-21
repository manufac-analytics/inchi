// @ts-nocheck There are some issues in the Definitely Typed packages of the "ref" related dependencies
import {
  generateINCHIAtoms,
  generateINCHIStereo0Ds,
  generateINCHIInputPolymer,
  generateINCHIInputV3000,
} from "../src/deref";
import {
  inchi_Atom,
  inchi_Stereo0D,
  inchi_Input_PolymerUnit,
  inchi_Input_Polymer,
  inchi_Input_V3000,
} from "../src/headers";
import refNAPI from "ref-napi";

describe("test inchi deref", () => {
  test("Check generateINCHIAtoms function", () => {
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
      radical: 3,
      charge: -2,
    });
    const inchiAtom2 = new inchi_Atom({
      x: 1.5,
      y: 2.5,
      z: 3.5,
      neighbor: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      bond_type: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      bond_stereo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      elname: [1, 2, 3, 4, 5, 6],
      num_bonds: 3,
      num_iso_H: [1, 2, 3, 4],
      isotopic_mass: 15,
      radical: 6,
      charge: 3,
    });
    const output = generateINCHIAtoms([inchiAtom, inchiAtom2]);
    expect(output).toHaveLength(2);
    expect(output[0].isotopicMass).toBe(inchiAtom.isotopic_mass);
    expect(output[1].isotopicMass).toBe(inchiAtom2.isotopic_mass);
  });

  test("Check generateINCHIStereo0Ds function", () => {
    /**
     * Instantiate inchi_Stereo0D
     */
    const inchiStereo0D = new inchi_Stereo0D({
      neighbor: [1, 2, 3, 4],
      central_atom: 1,
      type: 1,
      parity: 1,
    });
    const inchiStereo0D2 = new inchi_Stereo0D({
      neighbor: [1, 2, 3, 4],
      central_atom: 2,
      type: 2,
      parity: 2,
    });

    const output = generateINCHIStereo0Ds([inchiStereo0D, inchiStereo0D2]);
    expect(output).toHaveLength(2);
    expect(output[0].centralAtom).toBe(inchiStereo0D.central_atom);
    expect(output[1].centralAtom).toBe(inchiStereo0D2.central_atom);
  });

  /**
   *  ! Message: Buffer instance must be at least 192 bytes to back this struct type
   */

  // test("Check generateINCHIInputPolymer function", () => {
  //   /**
  //    * Instantiate inchi_Input_Polymer
  //    */
  //   const inchiInputPolymer = new inchi_Input_Polymer({
  //     units: [
  //       new inchi_Input_PolymerUnit({
  //         id: 1,
  //         type: 1,
  //         subtype: 1,
  //         conn: 1,
  //         label: 1,
  //         na: 1,
  //         nb: 1,
  //         xbr1: [1, 2, 3, 4],
  //         xbr2: [1, 2, 3, 4],
  //         smt: new Array(80).fill(7),
  //         alist: new Array(11).fill(0),
  //         blist: new Array(11).fill(0),
  //       }).ref(),
  //     ],
  //     n: 1234,
  //   });

  //   const output = generateINCHIInputPolymer(inchiInputPolymer);
  //   expect(output.units[0].subType).toBe(1);
  // });

  test("Check generateINCHIInputV3000 function", () => {
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
      lists_haptic_bonds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      n_steabs: 14,
      lists_steabs: [[11]],
      n_sterel: 19,
      lists_sterel: [[11]],
      n_sterac: 21,
      lists_sterac: [[11]],
    });

    const output = generateINCHIInputV3000(inchiInputV3000);
    expect(output.n3DContraints).toBe(inchiInputV3000.n_3d_constraints);
  });
});
