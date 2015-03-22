var is = require("is"),
    equal = require("deep-equal");

/**
 * Checks if values are contained in a comparison array.
 * If regexps are included, values are tested against them instead of compared against.
 * If functions are included, they are called with the value and should return a boolean.
 *
 * @param   {Array}             comparators    List of mixed values, regexps will be tested
 *                                             against values.
 * @param   {*}                 value          Optionally pass a value to check.
 * @return  {Boolean|Function}                 If comparison is passed, returns result.
 *                                             Otherwise returns checker function.
 */
var contained = module.exports = function(comparators, value){
    // Check if a value is contained
    var checker = function(value){
        // Check value against comparators until one matches, or return false.
        for(var i = 0; i < comparators.length; i++){
            var comp = comparators[i];

            if((is.string(value) || is.number(value)) && is.regexp(comp) && comp.test(value))
                return true;

            if(is.fn(comp) && comp.call(this, value))
                return true;

            if(equal(comp, value))
                return true;
        }

        // Return false if not contained
        return false;
    }

    // Check an array of values
    // All values must pass to be truthy
    checker.list = function(list){
        list = Array.isArray(list) ? list : [list];
        for(var i = 0; i < list.length; i++){
            if(!checker(list[i]))
                return false;
        }

        return true;
    }

    // If value is passed, check and return
    // Otherwise return checker function
    return arguments.length > 1 ? checker(value) : checker;
}

// Directly compare a list of comparators and a list of values
contained.list = function(comparators, values){
    return contained(comparators).list(values);
}