var ffi = require('ffi-napi');

var libm = ffi.Library('./libinchi.so.1.06.00', {
    'GetStringLength': [ 'int', [ 'string' ] ],
    'CheckINCHIKey': ['int', [ 'string' ]]
});

console.log(libm.GetStringLength("ddddkhhkjhkjhkjhkjhkjhkj"));
console.log(libm.CheckINCHIKey("ddddkhhkjhkjhkjhkjhkjhkj")); // Invalid length and format
console.log(libm.CheckINCHIKey("ddddkhhkjhkjhkjhkjhkjhkj111")); // Valid length and Invalid format
console.log(libm.CheckINCHIKey("VNWKTOKETHGBQD-UHFFFAOYSA-N")); // Valid length and valid format