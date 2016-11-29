
var stage = new createjs.Stage('gameView');
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener('tick',stage);

var gameView = new createjs.Container();
//调整容器的初始左上角坐标
gameView.x = 30;
gameView.y = 30;
stage.addChild(gameView);

var circleArr = [[],[],[],[],[],[],[],[],[]];
var cat;
var none = -1,left = 0,leftTop = 1,rightTop = 2,right = 3,rightBottom = 4,leftBottom = 5;

function getMoveDir(cat){
    var distanceMap = [];
    //left;
    var can = true;
    for(var x = cat.indexX; x > 0; x --){
        if(circleArr[x][cat.indexY].getCircleType() === Circle.selected ){
            can = false;
            distanceMap[left] = cat.indexX - x;
            break;
        }
    }
    if(can){
        return left;
    }
    //leftTop
    can = true; //重置
    var x = cat.indexX,
        y = cat.indexY;
    while(true){
        //循环遍历画布中的圆
        if(circleArr[x][y].getCircleType() === Circle.selected ){
            can = false;
            distanceMap[leftTop] = cat.indexY - y;
            break;
        }
        //注意一下小细节，画布中圆的布局是隔行缩进
        if(y%2 == 0){
            x--;
        }
        y--;
        if( y<0 || x<0 ){
            break;
        }
    }
    if(can){
        return leftTop;
    }

    //rightTop
    can = true; //重置
    x = cat.indexX;
    y = cat.indexY;
    while(true){
        //循环遍历画布中的圆
        if(circleArr[x][y].getCircleType() === Circle.selected ){
            can = false;
            distanceMap[rightTop] = cat.indexY - y;
            break;
        }
        //注意一下小细节，画布中圆的布局是隔行缩进
        if(y%2 == 1){
            x++;
        }
        y--;
        if( y<0 || x>8 ){
            break;
        }
    }
    if(can){
        return rightTop;
    }
    //right;
    var can = true;
    for(var x = cat.indexX; x < 9; x ++){
        if(circleArr[x][cat.indexY].getCircleType() === Circle.selected ){
            can = false;
            distanceMap[right] = x - cat.indexX;
            break;
        }
    }
    if(can){
        return right;
    }
    //rightBottom
    can = true; //重置
    x = cat.indexX;
    y = cat.indexY;
    while(true){
        //循环遍历画布中的圆
        if(circleArr[x][y].getCircleType() === Circle.selected ){
            can = false;
            distanceMap[rightBottom] = y - cat.indexY;
            break;
        }
        //注意一下小细节，画布中圆的布局是隔行缩进
        if(y%2 == 1){
            x++;
        }
        y--;
        if( y>8 || x>8 ){
            break;
        }
    }
    if(can){
        return rightBottom;
    }

    //leftBottom
    can = true; //重置
    x = cat.indexX;
    y = cat.indexY;
    while(true){
        //循环遍历画布中的圆
        if(circleArr[x][y].getCircleType() === Circle.selected ){
            can = false;
            distanceMap[leftBottom] = y - cat.indexY;
            break;
        }
        //注意一下小细节，画布中圆的布局是隔行缩进
        if(y%2 == 0){
            x--;
        }
        y++;
        if( y>8 || x<0 ){
            break;
        }
    }
    if(can){
        return leftBottom;
    }


}




function circleClicked(e){
    if(e.target.getCircleType()!== Circle.cat){
        e.target.setCircleType(Circle.selected);
    }
    if(cat.indexX === 0 || cat.indexX === 8 || cat.indexY === 0 || cat.indexY === 8 ){
        alert('游戏结束');
    }else{
        return;
    }
    var dir = getMoveDir(cat);
    switch(dir){
        case left:
            cat.setCircleType(Circle.unselected);
            cat = circleArr[cat.indexX-1][cat.indexY];
            cat.setCircleType(Circle.cat);
            break;
        case leftTop:
            cat.setCircleType(Circle.unselected);
            cat = circleArr[cat.indexY%2==0?cat.indexX-1:cat.indexX][cat.indexY-1];
            cat.setCircleType(Circle.cat);
            break;
        case rightTop:
            cat.setCircleType(Circle.unselected);
            cat = circleArr[cat.indexY%2==1?cat.indexX+1:cat.indexX][cat.indexY-1];
            cat.setCircleType(Circle.cat);
            break;
        case right:
            cat.setCircleType(Circle.unselected);
            cat = circleArr[cat.indexX+1][cat.indexY];
            cat.setCircleType(Circle.cat);
            break;
        case rightBottom:
            cat.setCircleType(Circle.unselected);
            cat = circleArr[cat.indexY%2==1?cat.indexX+1:cat.indexX][cat.indexY+1];
            cat.setCircleType(Circle.cat);
            break;
        case leftBottom:
            cat.setCircleType(Circle.unselected);
            cat = circleArr[cat.indexY%2==0?cat.indexX-1:cat.indexX][cat.indexY-1];
            cat.setCircleType(Circle.cat);
            break;
        default:
            alert('游戏结束');
    }

}


function addCircles(){
    for(var indexY = 0;indexY < 9; indexY++){
        for(var indexX = 0; indexX < 9 ; indexX++){
            var c =  new Circle();
            c.indexX = indexX;
            c.indexY = indexY;
            c.x = indexY %2 ==0?indexX*55+25:indexX*55;
            c.y = indexY*55;
            gameView.addChild(c);
            circleArr[indexX][indexY] = c;
            if(indexX == 4 && indexY == 4 ){
                c.setCircleType(3);
                cat = c;
            }else if(Math.random()<0.1){
                c.setCircleType(Circle.selected);
            }
            c.addEventListener('click',circleClicked);
        }
    }
}
addCircles();