var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var context2D = canvas.getContext("2d");
    var image = new Image();
    image.src = "chicken.jpeg";
    image.onload = function () {
        var stage = new DisplayObjectContainer();
        stage.x = 500;
        stage.y = 500;
        setInterval(function () {
            context2D.clearRect(0, 0, canvas.width, canvas.height);
            stage.draw(context2D);
        }, 1000);
        stage.alpha = 0.5;
        var text = new TextField();
        text.text = "Headache!!!!!";
        text.x = 100;
        text.y = 90;
        text.alpha = 1;
        var shrimp = new Bitmap();
        shrimp.imgage = image;
        shrimp.x = 100;
        shrimp.y = 100;
        shrimp.alpha = 0.5;
        stage.addchild(text);
        stage.addchild(shrimp);
    };
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.alpha = 1;
        this.globalAlpha = 1;
    }
    DisplayObject.prototype.draw = function (context) {
        if (this.parent) {
            //有父亲，那么globalAlpha就等于自己的alpha乘以父亲的globalAlpha
            this.globalAlpha = this.alpha * this.parent.globalAlpha;
        }
        else {
            //舞台没有父亲，让自己的alpha等于gloabalAlpha
            this.globalAlpha = this.alpha;
        }
        context.globalAlpha = this.globalAlpha;
        this.render(context);
    };
    DisplayObject.prototype.render = function (context) {
    };
    DisplayObject.prototype.transform = function (x, y) {
        this.tansMatrix[0][2] += x;
        this.tansMatrix[1][2] += y;
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
    DisplayObjectContainer.prototype.addchild = function (child) {
        this.canvasarray.push(child);
        child.parent = this;
    };
    DisplayObjectContainer.prototype.render = function (context) {
        for (var _i = 0, _a = this.canvasarray; _i < _a.length; _i++) {
            var drawable = _a[_i];
            drawable.draw(context);
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
    TextField.prototype.render = function (context) {
        //context.globalAlpha = this.alpha;
        context.fillText(this.text, this.x, this.y, 100);
    };
    return TextField;
}(DisplayObject));
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bitmap.prototype.render = function (context) {
        //context.globalAlpha = this.alpha;
        context.drawImage(this.imgage, this.x, this.y);
    };
    return Bitmap;
}(DisplayObject));
//# sourceMappingURL=main.js.map