window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");
   
    var image = new Image ();
    image.src = "chicken.jpeg";
    image.onload = () => {
        var stage = new DisplayObjectContainer();
         stage.x = 500;
         stage.y = 500;
        setInterval(()=>{
            context2D.clearRect(0,0,canvas.width,canvas.height);
            stage.draw(context2D);
        },1000);
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
    }
};

interface Drawable{
    draw(context:CanvasRenderingContext2D);
}

class DisplayObject implements Drawable{
    x = 0;
    y = 0;
    alpha = 1;
    globalAlpha = 1;
    parent:DisplayObjectContainer;
    tansMatrix : number[][];

    draw(context:CanvasRenderingContext2D){
        if(this.parent){
            //有父亲，那么globalAlpha就等于自己的alpha乘以父亲的globalAlpha
            this.globalAlpha = this.alpha * this.parent.globalAlpha;
            //console.log(this.globalAlpha);
            //console.log(this.parent.globalAlpha);
            //console.log(this.parent.alpha);
        }
        else{
            //舞台没有父亲，让自己的alpha等于gloabalAlpha
            this.globalAlpha = this.alpha;
            //console.log(this.globalAlpha);
            //console.log(this.alpha);
            //console.log(this.parent.globalAlpha);
            //console.log(this.parent.alpha);
        }
       
        context.globalAlpha = this.globalAlpha;
        this.render(context);
    }

    render(context:CanvasRenderingContext2D){

    }

    transform(x:number,y:number){
        this.tansMatrix[0][2]+=x;
        this.tansMatrix[1][2]+=y; 
    }
}

class DisplayObjectContainer extends DisplayObject{

    x : number = 0;
    y : number = 0;
    canvasarray : Drawable[] = [];

    addchild(child:DisplayObject){
        this.canvasarray.push(child);
        child.parent = this;
    }

    render(context:CanvasRenderingContext2D){
        for(let drawable of this.canvasarray){
            drawable.draw(context);
        }
    }
}

class TextField extends DisplayObject{
    
    text:string;
    x:number = 0;
    y:number = 0;
    render(context:CanvasRenderingContext2D){
        //context.globalAlpha = this.alpha;
        context.fillText(this.text,this.x,this.y,100);
    }

}

class Bitmap extends DisplayObject{
    imgage:HTMLImageElement;

    render(context:CanvasRenderingContext2D){
        //context.globalAlpha = this.alpha;
        context.drawImage(this.imgage,this.x,this.y);
    }
}