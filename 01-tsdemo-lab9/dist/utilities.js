export function resolvePromiseAfterTimeout(result, timeout) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { return resolve(result); }, timeout);
    });
}
//# sourceMappingURL=utilities.js.map