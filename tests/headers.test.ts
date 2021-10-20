// @ts-nocheck There are some issues in the Definitely Typed packages of the "ref" related dependencies
import {
  ATOM_EL_LEN,
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
  INCHIGEN_DATA,
  INCHI_NUM,
} from "../src/headers";
import refNAPI from "ref-napi";
import ArrayType from "ref-array-di";

const NAPIArrayType = ArrayType(refNAPI);
const IntArray = NAPIArrayType(refNAPI.types.int);

describe("test inchi headers", () => {
  test("Check inchi_Atom", () => {
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
    expect(inchiAtom.x).toBe(1.1);
    expect(inchiAtom.y).toBe(2.2);
    expect(inchiAtom.z).toBe(3.3);
    expect(inchiAtom.neighbor.toArray().length).toBe(MAXVAL);
    expect(inchiAtom.bond_type.toArray().length).toBe(MAXVAL);
    expect(inchiAtom.bond_stereo.toArray().length).toBe(MAXVAL);
    expect(inchiAtom.elname.toArray().length).toBe(ATOM_EL_LEN);
    expect(inchiAtom.num_bonds).toBe(3);
    expect(inchiAtom.num_iso_H.toArray().length).toBe(NUM_H_ISOTOPES + 1);
    expect(inchiAtom.isotopic_mass).toBe(10);
    expect(inchiAtom.radical).toBe("3".charCodeAt(0)); // ASCII code
    expect(inchiAtom.charge).toBe(-2);
  });

  test("check inchi_Stereo0D", () => {
    /**
     * Instantiate inchi_Stereo0D
     */
    const inchiStereo0D = new inchi_Stereo0D({
      neighbor: [1, 2, 3, 4],
      central_atom: 1,
      type: 1,
      parity: 1,
    });
    expect(inchiStereo0D.neighbor.toArray().length).toBe(4);
    expect(inchiStereo0D.central_atom).toBe(1);
    expect(inchiStereo0D.type).toBe(1);
    expect(inchiStereo0D.parity).toBe(1);
  });

  test("check inchi_Input", () => {
    /**
     * Instantiate inchi_Input
     */
    const inchiInput = new inchi_Input({
      atom: [
        new inchi_Atom({
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
      ],
      stereo0D: [
        new inchi_Stereo0D({
          neighbor: [1, 2, 3, 4],
          central_atom: 1,
          type: 1,
          parity: 1,
        }),
      ],
      szOptions: "some-string",
      num_atoms: 32767,
      num_stereo0D: -32768,
    });
    expect(inchiInput.atom.toArray()[0].neighbor.toArray().length).toBe(MAXVAL);
    expect(inchiInput.stereo0D.toArray()[0].neighbor.toArray().length).toBe(4);
    expect(inchiInput.szOptions).toBe("some-string");
    expect(inchiInput.num_atoms).toBe(32767);
    expect(inchiInput.num_stereo0D).toBe(-32768);
  });

  test("check inchi_Input_PolymerUnit", () => {
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
      alist: new Array(1).fill(11),
      blist: new Array(1).fill(11),
    });
    expect(inchiInputPolymerUnit.id).toBe(1);
    expect(inchiInputPolymerUnit.type).toBe(1);
    expect(inchiInputPolymerUnit.conn).toBe(1);
    expect(inchiInputPolymerUnit.label).toBe(1);
    expect(inchiInputPolymerUnit.na).toBe(1);
    expect(inchiInputPolymerUnit.nb).toBe(1);
    expect(inchiInputPolymerUnit.xbr1.toArray().length).toBe(4);
    expect(inchiInputPolymerUnit.xbr2.toArray().length).toBe(4);
    expect(inchiInputPolymerUnit.smt.toArray().length).toBe(80);
    expect(inchiInputPolymerUnit.alist[0]).toBe(11);
    expect(inchiInputPolymerUnit.blist[0]).toBe(11);
  });

  test("check inchi_Input_Polymer", () => {
    /**
     * Instantiate inchi_Input_Polymer
     */
    const inchiInputPolymer = new inchi_Input_Polymer({
      units: [
        new inchi_Input_PolymerUnit({
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
          alist: new Array(11).fill(0),
          blist: new Array(11).fill(0),
        }).ref(),
      ],
      n: 1234,
    });
    expect(inchiInputPolymer.units.toArray()[0].deref().id).toBe(1);
    expect(inchiInputPolymer.units.toArray()[0].deref().smt.toArray().length).toBe(80);
    expect(inchiInputPolymer.n).toBe(1234);
  });

  test("check inchi_Input_V3000", () => {
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
    expect(inchiInputV3000.n_non_star_atoms).toBe(4);
    expect(inchiInputV3000.n_star_atoms).toBe(3);
    expect(inchiInputV3000.atom_index_orig.deref()).toBe(11);
    expect(inchiInputV3000.atom_index_fin.deref()).toBe(11);
    expect(inchiInputV3000.n_sgroups).toBe(13);
    expect(inchiInputV3000.n_3d_constraints).toBe(13);
    expect(inchiInputV3000.n_collections).toBe(12);
    expect(inchiInputV3000.n_non_haptic_bonds).toBe(11);
    expect(inchiInputV3000.n_haptic_bonds).toBe(11);
    expect(inchiInputV3000.lists_haptic_bonds[10]).toBe(11);
    expect(inchiInputV3000.n_steabs).toBe(14);
    expect(inchiInputV3000.lists_steabs[0][0]).toBe(11);
    expect(inchiInputV3000.n_sterel).toBe(19);
    expect(inchiInputV3000.lists_sterel[0][0]).toBe(11);
    expect(inchiInputV3000.n_sterac).toBe(21);
    expect(inchiInputV3000.lists_sterac[0][0]).toBe(11);
  });

  test("check inchi_InputEx", () => {
    /**
     * Instantiate inchi_InputEx
     */
    const inchiInputEx = new inchi_InputEx({
      atom: [new inchi_Atom()],
      stereo0D: [new inchi_Stereo0D()],
      szOptions: "some-string",
      num_atoms: 11,
      num_stereo0D: 13,
      polymer: new inchi_Input_Polymer().ref(),
      v3000: new inchi_Input_V3000().ref(),
    });
    expect(inchiInputEx.atom[0].x).toBe(0);
    expect(inchiInputEx.stereo0D[0].parity).toBe(0);
    expect(inchiInputEx.szOptions).toBe("some-string");
    expect(inchiInputEx.num_atoms).toBe(11);
    expect(inchiInputEx.num_stereo0D).toBe(13);
    expect(inchiInputEx.polymer.deref().n).toBe(0);
    expect(inchiInputEx.v3000.deref().n_non_star_atoms).toBe(0);
  });

  test("check inchi_InputINCHI", () => {
    /**
     * Instantiate inchi_InputINCHI
     */
    const inchiInputINCHI = new inchi_InputINCHI({
      szInChI: "some-string",
      szOptions: "some-string",
    });
    expect(inchiInputINCHI.szInChI).toBe("some-string");
    expect(inchiInputINCHI.szOptions).toBe("some-string");
  });

  test("check inchi_Output", () => {
    /**
     * Instantiate inchi_Output
     */
    const inchiOutput = new inchi_Output({
      szInChI: "some-string",
      szAuxInfo: "some-string",
      szMessage: "some-string",
      szLog: "some-string",
    });
    expect(inchiOutput.szInChI).toBe("some-string");
    expect(inchiOutput.szAuxInfo).toBe("some-string");
    expect(inchiOutput.szMessage).toBe("some-string");
    expect(inchiOutput.szLog).toBe("some-string");
  });

  test("check inchi_OutputStructure", () => {
    /**
     * Instantiate inchi_OutputStruct
     */
    const inchiOutputStruct = new inchi_OutputStruct({
      atom: [new inchi_Atom()],
      stereo0D: [new inchi_Stereo0D()],
      num_atoms: 1,
      num_stereo0D: 2,
      szMessage: "some-string",
      szLog: "some-string",
      WarningFlags: [
        [1, 2],
        [3, 4],
      ],
    });
    expect(inchiOutputStruct.atom[0].x).toBe(0);
    expect(inchiOutputStruct.stereo0D[0].parity).toBe(0);
    expect(inchiOutputStruct.num_atoms).toBe(1);
    expect(inchiOutputStruct.num_stereo0D).toBe(2);
    expect(inchiOutputStruct.szMessage).toBe("some-string");
    expect(inchiOutputStruct.szLog).toBe("some-string");
    expect(inchiOutputStruct.WarningFlags[0][0]).toBe(1);
  });

  test("check inchi_OutputStructEx", () => {
    /**
     * Instantiate inchi_OutputStructEx
     */
    const inchiOutputStructEx = new inchi_OutputStructEx({
      atom: [new inchi_Atom()],
      stereo0D: [new inchi_Stereo0D()],
      num_atoms: 1,
      num_stereo0D: 2,
      szMessage: "some-string",
      szLog: "some-string",
      WarningFlags: [
        [1, 2],
        [3, 4],
      ],
      polymer: new inchi_Input_Polymer().ref(),
      v3000: new inchi_Input_V3000().ref(),
    });
    expect(inchiOutputStructEx.atom[0].x).toBe(0);
    expect(inchiOutputStructEx.stereo0D[0].parity).toBe(0);
    expect(inchiOutputStructEx.num_atoms).toBe(1);
    expect(inchiOutputStructEx.num_stereo0D).toBe(2);
    expect(inchiOutputStructEx.szMessage).toBe("some-string");
    expect(inchiOutputStructEx.szLog).toBe("some-string");
    expect(inchiOutputStructEx.WarningFlags[0][0]).toBe(1);
    expect(inchiOutputStructEx.polymer.deref().n).toBe(0);
    expect(inchiOutputStructEx.v3000.deref().n_non_star_atoms).toBe(0);
  });

  test("check inchi_InputData", () => {
    /**
     * Instantiate InchiInpData
     */
    const InchiInpData1 = new InchiInpData({
      pInp: new inchi_Input().ref(),
      bChiral: 1,
      szErrMsg: new Array(STR_ERR_LEN).fill(0),
    });
    expect(InchiInpData1.pInp.deref().num_atoms).toBe(0);
    expect(InchiInpData1.bChiral).toBe(1);
    expect(InchiInpData1.szErrMsg.toArray().length).toBe(STR_ERR_LEN);
  });

  test("check NORM_ATOM", () => {
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
    expect(NORMATOM.elname.length).toBe(ATOM_EL_LEN);
    expect(NORMATOM.el_number).toBe("1".charCodeAt(0));
    expect(NORMATOM.neighbor.length).toBe(MAXVAL);
    expect(NORMATOM.orig_at_number).toBe(1);
    expect(NORMATOM.orig_compt_at_numb).toBe(1);
    expect(NORMATOM.bond_type.toArray().length).toBe(MAXVAL);
    expect(NORMATOM.bond_stereo.toArray().length).toBe(MAXVAL);
    expect(NORMATOM.valence).toBe("1".charCodeAt(0));
    expect(NORMATOM.chem_bonds_valence).toBe("1".charCodeAt(0));
    expect(NORMATOM.num_H).toBe("1".charCodeAt(0));
    expect(NORMATOM.num_iso_H.toArray().length).toBe(NUM_H_ISOTOPES);
    expect(NORMATOM.iso_atw_diff).toBe("1".charCodeAt(0));
    expect(NORMATOM.radical).toBe("3".charCodeAt(0)); // ASCII code
    expect(NORMATOM.charge).toBe(-2);
    expect(NORMATOM.bAmbiguousStereo).toBe("1".charCodeAt(0));
    expect(NORMATOM.cFlags).toBe("1".charCodeAt(0));
    expect(NORMATOM.at_type).toBe(1);
    expect(NORMATOM.component).toBe(1);
    expect(NORMATOM.endpoint).toBe(1);
    expect(NORMATOM.c_point).toBe(1);
    expect(NORMATOM.x).toBe(1.1);
    expect(NORMATOM.y).toBe(2.2);
    expect(NORMATOM.z).toBe(3.3);
    expect(NORMATOM.bUsed0DParity).toBe("1".charCodeAt(0));
    expect(NORMATOM.p_parity).toBe("1".charCodeAt(0));
    expect(NORMATOM.p_orig_at_num.toArray().length).toBe(MAX_NUM_STEREO_ATOM_NEIGH);
    expect(NORMATOM.sb_ord.toArray().length).toBe(MAX_NUM_STEREO_BONDS);
    expect(NORMATOM.sn_ord.toArray().length).toBe(MAX_NUM_STEREO_BONDS);
    expect(NORMATOM.sb_parity.toArray().length).toBe(MAX_NUM_STEREO_BONDS);
    expect(NORMATOM.sn_orig_at_num.toArray().length).toBe(MAX_NUM_STEREO_BONDS);
  });

  test("check NORM_ATOMS", () => {
    /**
     * Instantiate NORM_ATOMS
     */
    const NORMATOMS = new NORM_ATOMS({
      at: new NORM_ATOM().ref(),
      at_fixed_bonds: new NORM_ATOM().ref(),
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
    expect(NORMATOMS.at.deref().num_H).toBe(0);
    expect(NORMATOMS.at_fixed_bonds.deref().num_H).toBe(0);
    expect(NORMATOMS.num_at).toBe(1);
    expect(NORMATOMS.num_removed_H).toBe(1);
    expect(NORMATOMS.num_bonds).toBe(1);
    expect(NORMATOMS.num_isotopic).toBe(1);
    expect(NORMATOMS.bExists).toBe(1);
    expect(NORMATOMS.bDeleted).toBe(1);
    expect(NORMATOMS.bHasIsotopicLayer).toBe(1);
    expect(NORMATOMS.bTautomeric).toBe(1);
    expect(NORMATOMS.bTautPreprocessed).toBe(1);
    expect(NORMATOMS.nNumRemovedProtons).toBe(1);
    expect(NORMATOMS.nNumRemovedProtonsIsotopic.toArray().length).toBe(NUM_H_ISOTOPES);
    expect(NORMATOMS.num_iso_H.toArray().length).toBe(NUM_H_ISOTOPES);
    expect(NORMATOMS.bTautFlags).toBe(1);
    expect(NORMATOMS.bTautFlagsDone).toBe(1);
    expect(NORMATOMS.bNormalizationFlags).toBe(1);
  });

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

  test("check INCHIGEN_DATA", () => {
    /**
     * Instantiate INCHIGEN_DATA
     */
    const INCHIGENDATA = new INCHIGEN_DATA({
      pStrErrStruct: new Array(STR_ERR_LEN).fill(0),
      num_components: new Array(INCHI_NUM).fill(new NORM_ATOMS()),
      NormAtomsNontaut: new NORM_ATOM().ref(),
      NormAtomsTaut: new NORM_ATOM().ref(),
    });

    expect(INCHIGENDATA.pStrErrStruct).toHaveLength(STR_ERR_LEN);
    expect(INCHIGENDATA.num_components).toHaveLength(INCHI_NUM);
    expect(INCHIGENDATA.NormAtomsNontaut.deref().toArray()).toHaveLength(INCHI_NUM);
    // expect(INCHIGENDATA.NormAtomsTaut).toHaveLength(INCHI_NUM);
  });
});
