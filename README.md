### Info

---

![Structure is taken from ChemSpider. ID 4450907](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Morphine_ball-and-stick.png/640px-Morphine_ball-and-stick.png)

---

- NodeJS Port of [InChI 1.06](https://www.inchi-trust.org/downloads/). API documentation of the original C based library is present [here](https://www.inchi-trust.org/download/106/INCHI-1-DOC.zip). Derived some inspiration from [smikes/inchi](https://github.com/smikes/inchi).
- The Shared Object file, `libinchi.so.1.06.00`, contains all the InChI related business logic, is installed from [InChITRUST](https://www.inchi-trust.org/downloads/), and is licensed under [IUPAC/InChI Trust Licence](https://www.inchi-trust.org/download/106/LICENCE.pdf).
- Here's a cool overview of integrating native modules with NodeJS applications: [N-API - The new native in Node.JS by Atishay Jain](https://www.youtube.com/watch?v=E0w7Tc0f2fA). 
- This library uses foreign function interface to access the native InChI module. The decision was mainly taken to achieve an ease of development that ffi provides compared to using [nan](https://github.com/nodejs/nan), [Node-API](https://nodejs.org/api/n-api.html), or [node-addon-api](https://github.com/nodejs/node-addon-api).
- One can port the InChI library using the above tools also. These [examples](https://github.com/nodejs/node-addon-examples) may provide you a good idea on how to move forward.
- For using ffi, 2 libraries were considered: [ffi](https://www.npmjs.com/package/ffi) and [ffi-napi](https://www.npmjs.com/package/ffi-napi). `ffi-napi` was adopted because it supports the latest/recent versions of NodeJS; it is tested to run on Node 6 and above, whereas `ffi` is only tested to run on Node v0.6, v0.8, v0.9 and v0.10.

---

How to use this library?

- This library has a dependency on [ffi-napi](https://www.npmjs.com/package/ffi-napi). You may need to install [some necessary build tools](https://github.com/nodejs/node-gyp#installation) for it to work.
- Alternately, you can also use Docker to quickly set up your dev environment. [Here's](https://github.com/manufac-analytics/inchi/blob/main/.devcontainer/Dockerfile) the Dockerfile that we are using for the same.
- We are slowly working towards exposing all the InCHI functions. PRs welcome.

---

API Porting Status

A. Generation of InChI from structure
- [ ] GetINCHI
- [ ] GetINCHIEx
- [ ] FreeINCHI
- [ ] Free_inchi_Input
- [ ] Get_inchi_Input_FromAuxInfo
- [ ] GetStdINCHI
- [ ] FreeStdINCHI
- [ ] Free_std_inchi_Input
- [ ] Get_std_inchi_Input_FromAuxInfo

B. Generation of InChI from structure, step-by-step way
- [ ] INCHIGEN_Create
- [ ] INCHIGEN_Setup
- [ ] INCHIGEN_DoNormalization
- [ ] INCHIGEN_DoCanonicalization
- [ ] INCHIGEN_DoSerialization
- [ ] INCHIGEN_Reset
- [ ] INCHIGEN_Destroy
- [ ] STDINCHIGEN_Create
- [ ] STDINCHIGEN_Setup
- [ ] STDINCHIGEN_DoNormalization
- [ ] STDINCHIGEN_DoCanonicalization
- [ ] STDINCHIGEN_DoSerialization
- [ ] STDINCHIGEN_Reset
- [ ] STDINCHIGEN_Destroy

C. Generation of InChI directly from Molfile
MakeINCHIFromMolfileText

D. Restoring structure from InChI or AuxInfo
- [ ] GetStructFromINCHI
- [ ] GetStructFromINCHIEx
- [ ] FreeStructFromINCHI
- [ ] GetStructFromStdINCHI

E. InChIKey
- [ ] GetINCHIKeyFromINCHI
- [ ] CheckINCHIKey
- [ ] GetStdINCHIKeyFromStdINCHI

F. Test and utlity procedures
- [ ] GetINCHIfromINCHI
- [ ] CheckINCHI
- [ ] GetStringLength
- [ ] FreeStructFromStdINCHI

G. Status Objects
- [ ] IXA_STATUS_Create
- [ ] IXA_STATUS_Clear
- [ ] IXA_STATUS_Destroy
- [ ] IXA_STATUS_HasError
- [ ] IXA_STATUS_HasWarning
- [ ] IXA_STATUS_GetCount
- [ ] IXA_STATUS_GetSeverity
- [ ] IXA_STATUS_GetMessage

