window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");

    var image = new Image();
    image.src = "chicken.jpeg";
    image.onload = () => {
        
        var stage = new DisplayObjectContainer();

        let enterFrame = () => {
            context2D.clearRect(0, 0, canvas.width, canvas.height);
            context2D.save();
            stage.draw(context2D);
            context2D.restore();
            window.requestAnimationFrame(enterFrame);
        }

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
    }
};

interface Drawable {
    draw(context: CanvasRenderingContext2D);
}

class DisplayObject implements Drawable {

    parent: DisplayObjectContainer;

    //坐标
    x = 0;
    y = 0;
    //旋转
    roatation = 0;
    //缩放
    scaleX = 1;
    scaleY = 1;
    //透明度
    alpha = 1;
    globalAlpha = 1;

    //坐标要转换成矩阵
    localMatrix: Matrix = new Matrix();//相对矩阵
    globalMatrix: Matrix = new Matrix();//绝对矩阵

    draw(context: CanvasRenderingContext2D) {
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
        context.setTransform(this.globalMatrix.a,
            this.globalMatrix.b,
            this.globalMatrix.c,
            this.globalMatrix.d,
            this.globalMatrix.tx,
            this.globalMatrix.ty);
        this.render(context);
    }

    render(context: CanvasRenderingContext2D) {

    }

    hitTest(x:number,y:number) {
    }
}

class DisplayObjectContainer extends DisplayObject {

    x: number = 0;
    y: number = 0;
    canvasarray: Drawable[] = [];

    addchild(child: DisplayObject) {
        this.canvasarray.push(child);
        child.parent = this;
    }

    render(context: CanvasRenderingContext2D) {
        for (let drawable of this.canvasarray) {
            drawable.draw(context);
        }
    }
}

class TextField extends DisplayObject {
    
    text: string;
    x: number = 0;
    y: number = 0;
    render(context: CanvasRenderingContext2D) {
        //context.globalAlpha = this.alpha;
        context.fillText(this.text, 0, 0, 100);
    }

}

class Bitmap extends DisplayObject {
    imgage: HTMLImageElement;

    render(context: CanvasRenderingContext2D) {
        //context.globalAlpha = this.alpha;
        context.drawImage(this.imgage, 0, 0);
    }
}

//矩阵类
class Matrix {

    a = 1;
    b = 0;
    c = 0;
    d = 1;
    tx = 0;
    ty = 0;

    convertFromDisplayObjectProperties(x: number, y: number, scaleX: number, scaleY: number, rotation: number) {
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
    }



}

//矩阵相乘
function matrixAppendMatrix(m1: Matrix, m2: Matrix) {
     var result = new Matrix();
        result.a = m1.a * m2.a + m1.b * m2.c;
        result.b = m1.a * m2.b + m1.b * m2.d;
        result.c = m2.a * m1.c + m2.c * m1.d;
        result.d = m2.b * m1.c + m1.d * m2.d;
        result.tx = m2.a * m1.tx + m2.c * m1.ty + m2.tx;
        result.ty = m2.b * m1.tx + m2.d * m1.ty + m2.ty;
        return result;
}