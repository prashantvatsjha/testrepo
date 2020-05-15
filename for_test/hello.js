//console.log("Hello World!");
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["BLUE"] = 1] = "BLUE";
    Color[Color["GREEN"] = 2] = "GREEN";
})(Color || (Color = {}));
//console.log(Color.RED);
var User = /** @class */ (function () {
    function User(a, b) {
        this.a = a;
        this.b = b;
    }
    User.prototype.addNumber = function () {
        var result = this.a + this.b;
        console.log(result);
    };
    return User;
}());
var u = new User(1, 2);
u.addNumber();
