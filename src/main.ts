window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");
   
    var image = new Image ();
    image.src = "shrimp.jpeg";
    image.onload = () => {
        var stage = new DisplayObjectContainer();
         stage.x = 500;
         stage.y = 500;
        setInterval(()=>{
            context2D.clearRect(0,0,canvas.width,canvas.height);
            stage.draw(context2D);
        },100);
   

    var text = new TextField();
    text.text = "AHA we go!";
    text.x = 100;
    text.y = 90;
    text.alpha = 0.5;
    
    var shrimp = new Bitmap();
    shrimp.imgage = image;
    shrimp.x = 100;
    shrimp.y = 100;
    shrimp.alpha = 0.5;

    stage.addchild(text);
    stage.addchild(shrimp);
    }
};

interface Drawable{
    draw(context:CanvasRenderingContext2D);
}

class DisplayObject implements Drawable{
    x = 0;
    y = 0;
    alpha = 1;
    tansMatrix : number[][];

    draw(context:CanvasRenderingContext2D){

    }

    transform(x:number,y:number){
        this.tansMatrix[0][2]+=x;
        this.tansMatrix[1][2]+=y; 
    }
}

class DisplayObjectContainer implements Drawable{

    x : number = 0;
    y : number = 0;
    canvasarray : Drawable[] = [];

    addchild(newContext:Drawable){
        this.canvasarray.push(newContext);
    }

    draw(context:CanvasRenderingContext2D){
        for(let drawable of this.canvasarray){
            drawable.draw(context);
        }
    }
}

class TextField extends DisplayObject{
    
    text:string;
    x:number = 0;
    y:number = 0;
    draw(context:CanvasRenderingContext2D){
        context.globalAlpha = this.alpha;
        context.fillText(this.text,this.x,this.y,100);
    }

}

class Bitmap extends DisplayObject{
    imgage:HTMLImageElement;

    draw(context:CanvasRenderingContext2D){
        context.globalAlpha = this.alpha;
        context.drawImage(this.imgage,this.x,this.y);
    }
}