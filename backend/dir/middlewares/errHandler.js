"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errHandler(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    };
}
exports.default = errHandler;
