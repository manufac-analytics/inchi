import Enum from "enum";

// radical definitions
// typedef enum tagINCHIRadical {
//     INCHI_RADICAL_NONE = 0,
//     INCHI_RADICAL_SINGLET = 1,
//     INCHI_RADICAL_DOUBLET = 2,
//     INCHI_RADICAL_TRIPLET = 3
// } inchi_Radical;

export const inchi_Radical = new Enum({
    INCHI_RADICAL_NONE: 0,
    INCHI_RADICAL_SINGLET: 1,
    INCHI_RADICAL_DOUBLET: 2,
    INCHI_RADICAL_TRIPLET: 3
});

// bond type definitions
// typedef enum tagINCHIBondType {
//     INCHI_BOND_TYPE_NONE = 0,
//     INCHI_BOND_TYPE_SINGLE = 1,
//     INCHI_BOND_TYPE_DOUBLE = 2,
//     INCHI_BOND_TYPE_TRIPLE = 3,
//     INCHI_BOND_TYPE_ALTERN = 4  /* avoid by all means */
// } inchi_BondType;

export const inchi_BondType = new Enum({
    INCHI_BOND_TYPE_NONE: 0,
    INCHI_BOND_TYPE_SINGLE: 1,
    INCHI_BOND_TYPE_DOUBLE: 2,
    INCHI_BOND_TYPE_TRIPLE: 3,
    INCHI_BOND_TYPE_ALTERN: 4  /* avoid by all means */
});

// typedef enum tagINCHIBondStereo2D {
//     /* stereocenter-related; positive: the sharp end points to this atom  */
//      INCHI_BOND_STEREO_NONE = 0,
//      INCHI_BOND_STEREO_SINGLE_1UP = 1,
//      INCHI_BOND_STEREO_SINGLE_1EITHER = 4,
//      INCHI_BOND_STEREO_SINGLE_1DOWN = 6,
//      /* stereocenter-related; negative: the sharp end points to the opposite atom  */
//      INCHI_BOND_STEREO_SINGLE_2UP = -1,
//      INCHI_BOND_STEREO_SINGLE_2EITHER = -4,
//      INCHI_BOND_STEREO_SINGLE_2DOWN = -6,
//      /* stereobond-related */
//      INCHI_BOND_STEREO_DOUBLE_EITHER = 3 /* unknown stereobond geometry */
//  } inchi_BondStereo2D;

export const inchi_BondStereo2D = new Enum({
    /* stereocenter-related; positive: the sharp end points to this atom  */
    INCHI_BOND_STEREO_NONE: 0,
    INCHI_BOND_STEREO_SINGLE_1UP: 1,
    INCHI_BOND_STEREO_SINGLE_1EITHER: 4,
    INCHI_BOND_STEREO_SINGLE_1DOWN: 6,
    /* stereocenter-related; negative: the sharp end points to the opposite atom  */
    INCHI_BOND_STEREO_SINGLE_2UP: -1,
    INCHI_BOND_STEREO_SINGLE_2EITHER: -4,
    INCHI_BOND_STEREO_SINGLE_2DOWN: -6,
    /* stereobond-related */
    INCHI_BOND_STEREO_DOUBLE_EITHER: 3 /* unknown stereobond geometry */
})

/*************************************************************************
 * Notes on using INCHI_BOND_STEREO_SINGLE_*  from inchi_BondStereo2D    *
 *                                                                       *
 * These stereo markings are used by InChI to characterize a stereogenic *
 * atom if and only if all neighbors of this atom have same z-coordinate *
 * as this atom (that is, in case of 2D fragment).                       *
 * The only exception is INCHI_BOND_STEREO_SINGLE_?EITHER marking which  *
 * always assigns to the atom an "unknown" parity (u).                   *
 *                                                                       *
 * Note the behavior which is default for InChI software v.1.04/03/02std *
 * (at -NEWPSOFF option is not supplied) 2D stereo interpretation:       *
 * only bonds that have sharp end pointing to the stereogenic atom are   *
 * considered as being out of plane and only sharp ends of               *
 * INCHI_BOND_STEREO_SINGLE_?EITHER bonds are considered to determine    *
 * whether the stereochemistry is unknown.                               *
 *************************************************************************/

// sizes definitions
// #define MAXVAL                   20 /* max number of bonds per atom                 */
// #define ATOM_EL_LEN               6 /* length of ASCIIZ element symbol field        */
// #define NUM_H_ISOTOPES            3 /* number of hydrogen isotopes: protium, D, T   */
// #define ISOTOPIC_SHIFT_FLAG   10000 /* add to isotopic mass if isotopic_mass =      */
//                                     /* (isotopic mass - average atomic mass)        */
// #define ISOTOPIC_SHIFT_MAX      100 /* max abs(isotopic mass - average atomic mass) */

export const MAXVAL = 20; // max number of bonds per atom 
export const ATOM_EL_LEN = 6; // length of ASCIIZ element symbol field 
export const NUM_H_ISOTOPES = 3; // number of hydrogen isotopes: protium, D, T
export const ISOTOPIC_SHIFT_FLAG = 10000; // add to isotopic mass if isotopic_mass = (isotopic mass - average atomic mass)                             /* (isotopic mass - average atomic mass)        */
export const ISOTOPIC_SHIFT_MAX = 100; // max abs(isotopic mass - average atomic mass)