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
        var enterFrame = function () {
            context2D.clearRect(0, 0, canvas.width, canvas.height);
            context2D.save();
            stage.draw(context2D);
            context2D.restore();
            window.requestAnimationFrame(enterFrame);
        };
        //每一帧进行刷新：告诉显卡：“我准备好了，可以开始画了～～～”
        window.requestAnimationFrame(enterFrame);
        var text = new TextField();
        text.text = "Headache!!!!!";
        text.x = 100;
        text.y = 90;
        text.alpha = 0.5;
        //text.scaleX = 2;
        var crunchingBrother = new Bitmap();
        crunchingBrother.imgage = image;
        crunchingBrother.x = 100;
        crunchingBrother.y = 100;
        crunchingBrother.alpha = 0.5;
        //crunchingBrother.scaleX = 2;
        //crunchingBrother.roatation = 20;
        stage.addchild(text);
        stage.addchild(crunchingBrother);
    };
};
var DisplayObject = (function () {
    function DisplayObject() {
        //坐标
        this.x = 0;
        this.y = 0;
        //旋转
        this.roatation = 0;
        //缩放
        this.scaleX = 1;
        this.scaleY = 1;
        //透明度
        this.alpha = 1;
        this.globalAlpha = 1;
        //坐标要转换成矩阵
        this.localMatrix = new Matrix(); //相对矩阵
        this.globalMatrix = new Matrix(); //绝对矩阵
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
        //将数字转换成矩阵
        this.localMatrix.convertFromDisplayObjectProperties(this.x, this.y, this.scaleX, this.scaleY, this.roatation);
        if (this.parent) {
            //有父亲，那么globalMatrix就等于自己的localMatrix乘以父亲的globalMatrix
            this.globalMatrix = matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
        }
        else {
            //舞台没有父亲，让自己的localMatrix等于gloabalMatrix
            this.globalMatrix = this.localMatrix;
        }
        context.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
        this.render(context);
    };
    DisplayObject.prototype.render = function (context) {
    };
    DisplayObject.prototype.hitTest = function () {
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
        context.fillText(this.text, 0, 0, 100);
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
        context.drawImage(this.imgage, 0, 0);
    };
    return Bitmap;
}(DisplayObject));
//矩阵类
var Matrix = (function () {
    function Matrix() {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
    }
    Matrix.prototype.convertFromDisplayObjectProperties = function (x, y, scaleX, scaleY, rotation) {
        this.tx = x;
        this.ty = y;
        var skewX, skewY;
        skewX = skewY = rotation / 180 * Math.PI;
        var u = Math.cos(skewX);
        var v = Math.sin(skewX);
        this.a = Math.cos(skewY) * scaleX;
        this.b = Math.sin(skewY) * scaleX;
        this.c = -v * scaleY;
        this.d = u * scaleY;
    };
    return Matrix;
}());
//矩阵相乘
function matrixAppendMatrix(m1, m2) {
    var result = new Matrix();
    result.a = m1.a * m2.a + m1.b * m2.c;
    result.b = m1.a * m2.b + m1.b * m2.d;
    result.c = m2.a * m1.c + m2.c * m1.d;
    result.d = m2.b * m1.c + m1.d * m2.d;
    result.tx = m2.a * m1.tx + m2.c * m1.ty + m2.tx;
    result.ty = m2.b * m1.tx + m2.d * m1.ty + m2.ty;
    return result;
}
//# sourceMappingURL=main.js.map