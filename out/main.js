var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var context2D = canvas.getContext("2d");
    var object = new DisplayObjectContainer();
    object.x = 500;
    object.y = 500;
    var te = new TextField();
    te.text = "Here we go!";
    te.x = 10;
    te.y = 10;
    te.draw(context2D);
    var shrimp = new Bitmap();
    shrimp.img.src = "shrimp.jpeg";
    shrimp.x = 200;
    shrimp.y = 200;
    shrimp.draw(context2D);
    //this.addchild(te);
    //this.addchild(shrimp);
    //object.draw(context2D);
};
var DisplayObject = (function () {
    function DisplayObject() {
    }
    DisplayObject.prototype.draw = function (context) {
    };
    return DisplayObject;
}());
var DisplayObjectContainer = (function () {
    function DisplayObjectContainer() {
        this.x = 0;
        this.y = 0;
        this.canvasarray = [];
    }
    DisplayObjectContainer.prototype.addchild = function (NewStage) {
        this.canvasarray.push();
    };
    DisplayObjectContainer.prototype.draw = function (context) {
        for (var _i = 0, _a = this.canvasarray; _i < _a.length; _i++) {
            var stage = _a[_i];
            stage.draw(context);
        }
    };
    return DisplayObjectContainer;
}());
var TextField = (function () {
    function TextField() {
        this.x = 0;
        this.y = 0;
    }
    TextField.prototype.draw = function (context) {
        context.fillText(this.text, this.x, this.y, 100);
    };
    return TextField;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.img = new Image();
        _this.x = 0;
        _this.y = 0;
        return _this;
    }
    Bitmap.prototype.draw = function (context) {
        var _this = this;
        this.img.onload = function () {
            setInterval(function () {
                context.clearRect(0, 0, 500, 500);
                context.drawImage(_this.img, _this.x, _this.y);
            }, 30);
        };
    };
    return Bitmap;
}(DisplayObject));
//# sourceMappingURL=main.js.map