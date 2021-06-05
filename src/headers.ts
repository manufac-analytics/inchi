import Enum from "enum";
import refNAPI from "ref-napi";
import StructType from "ref-struct-di";
import ArrayType from "ref-array-di";

const NAPIStructType = StructType(refNAPI);
const NAPIArrayType = ArrayType(refNAPI);

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
  INCHI_RADICAL_TRIPLET: 3,
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
  INCHI_BOND_TYPE_ALTERN: 4 /* avoid by all means */,
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
  INCHI_BOND_STEREO_DOUBLE_EITHER: 3 /* unknown stereobond geometry */,
});

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

/*************************************************
 *
 *
 *  A T O M S   a n d   C O N N E C T I V I T Y
 *
 *
 *************************************************/

//  typedef struct tagInchiAtom {
//     /* atom coordinates */
//     double x;
//     double y;
//     double z;
//     /* connectivity */
//     AT_NUM  neighbor[MAXVAL];     /* adjacency list: ordering numbers of */
//                                   /*            the adjacent atoms, >= 0 */
//     S_CHAR  bond_type[MAXVAL];    /* inchi_BondType */
//     /* 2D stereo */
//     S_CHAR  bond_stereo[MAXVAL];  /* inchi_BondStereo2D; negative if the */
//                                   /* sharp end points to opposite atom */
//     /* other atom properties */
//     char    elname[ATOM_EL_LEN];  /* zero-terminated chemical element name:*/
//                                   /* "H", "Si", etc. */
//     AT_NUM  num_bonds;            /* number of neighbors, bond types and bond*/
//                                   /* stereo in the adjacency list */
//     S_CHAR  num_iso_H[NUM_H_ISOTOPES + 1]; /* implicit hydrogen atoms */
//                                   /* [0]: number of implicit non-isotopic H
//                                        (exception: num_iso_H[0]=-1 means INCHI
//                                        adds implicit H automatically),
//                                      [1]: number of implicit isotopic 1H (protium),
//                                      [2]: number of implicit 2H (deuterium),
//                                      [3]: number of implicit 3H (tritium) */
//     AT_NUM  isotopic_mass;        /* 0 => non-isotopic; isotopic mass or  */
//                                   /* ISOTOPIC_SHIFT_FLAG + mass - (average atomic mass) */
//     S_CHAR  radical;              /* inchi_Radical */
//     S_CHAR  charge;               /* positive or negative; 0 => no charge */
// }inchi_Atom;

/*****************************************************************************
 * Notes: 1. Atom ordering numbers (i, k, and atom[i].neighbor[j] below)
 *           start from zero; max. ordering number is (num_atoms-1).
 *        2. inchi_Atom atom[i] is connected to the atom[atom[i].neighbor[j]]
 *           by a bond that has type atom[i].bond_type[j] and 2D stereo type
 *           atom[i].bond_stereo[j] (in case of no stereo
 *           atom[i].bond_stereo[j] = INCHI_BOND_STEREO_NONE)
 *           Index j is in the range 0 <= j <= (atom[i].num_bonds-1)
 *        3. Any connection (represented by atom[i].neighbor[j],
 *           atom[i].bond_type[j], and atom[i].bond_stereo[j])
 *           should be present in one or both adjacency list:
 *             if k = atom[i].neighbor[j] then i may or may not be present in
 *           atom[k].neighbor[] list. For example, the adjacency lists may be
 *           populated with only such neighbors that atom[i].neighbor[j] < i
 *           All elements of an adjacency list must be different, that is,
 *           a bond must be specified in an adjacency list only once.
 *        4. in Molfiles usually
 *           (number of implicit H) = Valence - SUM(bond_type[])
 *        5. Seemingly illogical order of the inchi_Atom members was
 *           chosen in an attempt to avoid alignment problems when
 *           accessing inchi_Atom from unrelated to C programming
 *           languages such as Visual Basic.
 ******************************************************************************/

export const inchi_Atom = NAPIStructType({
  x: refNAPI.types.double,
  y: refNAPI.types.double,
  z: refNAPI.types.double,
  neighbor: NAPIArrayType(refNAPI.types.short, MAXVAL),
  bond_type: NAPIArrayType(refNAPI.types.char, MAXVAL),
  bond_stereo: NAPIArrayType(refNAPI.types.char, MAXVAL),
  elname: NAPIArrayType(refNAPI.types.char, ATOM_EL_LEN),
  num_bonds: refNAPI.types.short,
  num_iso_H: NAPIArrayType(refNAPI.types.char, NUM_H_ISOTOPES + 1),
  isotopic_mass: refNAPI.types.short,
  radical: refNAPI.types.char,
  charge: refNAPI.types.char,
});
