require("chai").should();

var contained = require("../");

var checker = contained([
    // will be compared to value
    5,
    // will be deeply compared with value
    ["a", "b", "c"],
    // will test value
    new RegExp("[a-z]+", "ig"),
    // will be called with value
    function(num){
        return typeof num === "number" && num > 5;
    }
]);

describe("contained", function(){
    it("should return a function which checks values passed", function(){
        checker.should.be.a("function");
        checker(5).should.equal(true);
    });

    it("should check a value if passed as the second argument", function(){
        contained([1, 2, 3], 1).should.equal(true);
    });
});

describe("contained.list", function(){
    it("should check multiple values", function(){
        contained.list([1, 2, 3], [1]).should.equal(true);
        contained.list([1, 2, 3], [1, 5]).should.equal(false);
    });
});

describe("checker", function(){
    it("should check if a value is contained", function(){
        checker(5).should.equal(true);
    });

    it("should deeply evaluate", function(){
        checker(["a", "b", "c"]).should.equal(true);
        checker(["a", "b", "c", "d"]).should.equal(false);
    });

    it("should test values against regexp comparators", function(){
        checker("word").should.equal(true);
    });

    it("should check if a value is contained", function(){
        checker(10).should.equal(true);
        checker(2).should.equal(false);
    });
});

describe("checker.list", function(){
    it("should check multiple values against a checker", function(){
        checker.list([5, 6, 7]).should.equal(true);
    })

    it("should fail if any values fail", function(){
        checker.list([5, "word", 2]).should.equal(false);
    });
});