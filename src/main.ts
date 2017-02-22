window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");

    var stage = new DisplayObjectContainer();
    context2D.globalAlpha = 1;
    context2D.setTransform(1,0,0,1,50,50);
    setInterval(()=>{
            context2D.clearRect(0,0,canvas.width,canvas.height);
            stage.draw(context2D);
        },30)

    var text = new TextField();
    text.text = "Here we go!";
    text.x = 10;
    text.y = 10;
    text.alpha = 0.5;

    var shrimp = new Bitmap();
    shrimp.img.src = "chicken.jpeg";
    shrimp.x = 120;
    shrimp.y = 120;
    shrimp.transform(120,120);
    //shrimp.alpha = 0.5;
    
    stage.addChild(text);
    stage.addChild(shrimp);

/*
    var chicken = new Bitmap();
    chicken.img.src = "chicken.jpeg";
    chicken.x = 200;
    chicken.y = 200;
    chicken.alpha = 0.5;
    stage.addChild(text);
    stage.addChild(chicken);
*/
 
};

interface Drawable{
    draw(context:CanvasRenderingContext2D);
    transform(x:number,y:number);
}

class DisplayObject implements Drawable{

    x = 0;
    y = 0;
    tansMatrix : number[][];
    alpha = 1;

    /*constructor(x:number,y:number){
        this.x = x;
        this.y = y;
        //this.tansMatrix = math.matrixAppendMatrix(1,1,1,1,1,1);
    }*/

    draw(context:CanvasRenderingContext2D){

    }

    transform(x:number,y:number){
        this.tansMatrix[0][2]+=x;
        this.tansMatrix[1][2]+=y; 
    }
}

class DisplayObjectContainer extends DisplayObject{

    x : number = 0;
    y : number = 0;
    private context:CanvasRenderingContext2D;
    canvasarray : Drawable[] = [];

    addChild(drawSth:Drawable){
        this.canvasarray.push(drawSth);
    }

    draw(context:CanvasRenderingContext2D){
        for(let stage of this.canvasarray){
            stage.draw(context);
        }
    }

    getContext():CanvasRenderingContext2D{
        if(this.context){
            return this.context;
        }
    }
}

class TextField extends DisplayObject{
    text:string;
    x:number = 0;
    y:number = 0;
    draw(context:CanvasRenderingContext2D){
        context.fillText(this.text,this.x,this.y,100);
    }

}

class Bitmap extends DisplayObject{
    img = new Image();
    x : number = 0;
    y : number = 0;
    draw(context:CanvasRenderingContext2D){
        context.globalAlpha = this.alpha;
        context.drawImage(this.img,this.x,this.y);
    }
}
