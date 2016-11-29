
function Circle(){
    createjs.Shape.call(this);
    //设置颜色
    this.setCircleType = function(type){
        this._circleType = type;
        switch (type){
            case Circle.unselected:
                this.setColor('#ccc');
                break;
            case Circle.selected:
                this.setColor('#f60');
                break;
            case Circle.cat:
                this.setColor('#000');
                break;
        }
    }
    //绘制点
    this.setColor = function (colorString){
        this.graphics.beginFill(colorString);
        this.graphics.drawCircle(0,0,25);
        this.graphics.endFill();
    }
    this.getCircleType = function(){
        return this._circleType;
    }
    //首先给所有的圆给个默认的灰色
    this.setCircleType(1);
}
Circle.prototype = new createjs.Shape();
Circle.unselected = 1;
Circle.selected = 2;
Circle.cat = 3;
