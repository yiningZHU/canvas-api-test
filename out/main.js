var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var context2D = canvas.getContext("2d");
    var stage = new DisplayObjectContainer();
    context2D.globalAlpha = 0.5;
    context2D.setTransform(1, 0, 0, 1, 50, 50);
    setInterval(function () {
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context2D);
    }, 30);
    var text = new TextField();
    text.text = "Here we go!";
    text.x = 10;
    text.y = 10;
    //text.alpha = 1;
    var shrimp = new Bitmap();
    shrimp.img.src = "shrimp.jpeg";
    shrimp.x = 120;
    shrimp.y = 120;
    //shrimp.alpha = 0.5;
    stage.addChild(text);
    stage.addChild(shrimp);
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.alpha = 1;
    }
    DisplayObject.prototype.draw = function (context) {
    };
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = 0;
        _this.y = 0;
        _this.canvasarray = [];
        return _this;
    }
    DisplayObjectContainer.prototype.addChild = function (drawSth) {
        this.canvasarray.push(drawSth);
    };
    DisplayObjectContainer.prototype.draw = function (context) {
        for (var _i = 0, _a = this.canvasarray; _i < _a.length; _i++) {
            var stage = _a[_i];
            stage.draw(context);
        }
    };
    return DisplayObjectContainer;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = 0;
        _this.y = 0;
        return _this;
    }
    TextField.prototype.draw = function (context) {
        context.fillText(this.text, this.x, this.y, 100);
    };
    return TextField;
}(DisplayObject));
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
        context.globalAlpha = this.alpha;
        context.drawImage(this.img, this.x, this.y);
    };
    return Bitmap;
}(DisplayObject));
//# sourceMappingURL=main.js.map