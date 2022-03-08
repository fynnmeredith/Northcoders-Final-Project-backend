"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.requestKeyCheck = function (requestObj) {
    // First arg to be the object that requires testing, the following arguments to be a list of keys required in the object
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var reqKeys = __spreadArrays(keys);
    var reqObjKeys = Object.keys(requestObj);
    for (var i = 0; i < keys.length; i++) {
        if (reqObjKeys.indexOf(reqKeys[i]) == -1) {
            return false;
        }
    }
    return true;
};
