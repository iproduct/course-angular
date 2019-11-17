import '../node_modules/reflect-metadata/Reflect.js';
export var requiredMetadataKey = Symbol("required");
export var minLengthMetadataKey = Symbol("minLength");
export function required(target, propertyKey, parameterIndex) {
    var existingRequiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}
export function minLength(minLength) {
    return function (target, propertyKey, parameterIndex) {
        var existingMinLengthParameters = Reflect.getOwnMetadata(minLengthMetadataKey, target, propertyKey) || [];
        existingMinLengthParameters.push([parameterIndex, minLength]);
        Reflect.defineMetadata(minLengthMetadataKey, existingMinLengthParameters, target, propertyKey);
    };
}
export function validate(target, propertyName, descriptor) {
    var method = descriptor.value;
    descriptor.value = function () {
        var requiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        var minLengthParameters = Reflect.getOwnMetadata(minLengthMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (var _i = 0, requiredParameters_1 = requiredParameters; _i < requiredParameters_1.length; _i++) {
                var parameterIndex = requiredParameters_1[_i];
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined
                    || (arguments[parameterIndex] + '').length === 0) {
                    throw new Error("Missing required argument.");
                }
            }
        }
        if (minLengthParameters) {
            for (var _a = 0, minLengthParameters_1 = minLengthParameters; _a < minLengthParameters_1.length; _a++) {
                var _b = minLengthParameters_1[_a], paramIndex = _b[0], minLen = _b[1];
                if (paramIndex >= arguments.length || (arguments[paramIndex] + '').length < minLen) {
                    throw new Error("The argument [" + paramIndex + "]:" + arguments[paramIndex] + " should be a string with length at least " + minLen + " characters.");
                }
            }
        }
        return method.apply(this, arguments);
    };
}
//# sourceMappingURL=decorators.js.map