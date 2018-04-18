(function(){
    var snake = window.Snake = function(){
        //蛇的身体，此时可以让蛇动起来，数组头插尾删
        this.body = [
            {"row":3,"col":7},
            {"row":3,"col":6},
            {"row":3,"col":5},
            {"row":3,"col":4},
            {"row":3,"col":3},
        ];
        //蛇当前动态的方向
        this.direction = "R";
        //即将设置的昂新，这里是为了防止用户按很快出bug
        this.willDirection = "R";
    }
    //渲染蛇身体的方法
    Snake.prototype.render = function(){
        //蛇头
        game.setColor(this.body[0].row,this.body[0].col,"green");
        //遍自己每一个身体的小格，在table中对应的小格染色。
        for (var i = 1; i < this.body.length; i++) {
            //蛇身
            game.setColor(this.body[i].row,this.body[i].col,"red");
        };
    }
    //更新方法，让蛇运动，这个方法很关键
    Snake.prototype.update = function(){
        this.direction = this.willDirection;
        //头插
        switch(this.direction){ //判断方向，根据方向尾删头插
            case "R":
                var toucha = {"row":this.body[0].row,"col":this.body[0].col+1};
                this.body.unshift(toucha);
                break;
            case "D":
                var toucha = {"row":this.body[0].row+1,"col":this.body[0].col};
                this.body.unshift(toucha);
                break;
            case "L":
                var toucha = {"row":this.body[0].row,"col":this.body[0].col-1};
                this.body.unshift(toucha);
                break;
            case "U":
                var toucha = {"row":this.body[0].row-1,"col":this.body[0].col};
                this.body.unshift(toucha);
                break;
        }

        //吃到食物蛇变长。
        if(toucha.row == game.food.row && toucha.col == game.food.col){
             document.querySelectorAll("audio")[1].play();
             //当你吃到食物的时候，不需要删掉尾巴，需要重新new一个食物
             game.food = new Food(game); //记得传上下文，要中介者，中介者就是game
             //让帧编号清零，这是为了防止吃了食物突然蹿往前一下
             game.f = 0;
        }else{
            //当你没用吃到食物的时候，删尾巴一项
            this.body.pop();//尾删
        }

        //撞墙判断
        if(toucha.row<0 || toucha.col< 0 || toucha.row > game.rowAmount - 1 || toucha.col > game.colAmount - 1){
            document.querySelectorAll("audio")[2].play();
            alert("哈哈，你撞墙了！长度是：" + this.body.length);
            //撞墙后，还会头插一项就不合理了，应该删除一项，为了防止超出表格报错
            this.body.shift();
            clearInterval(game.timer);
        }

        //撞自己判断
        for (var i = 1; i < this.body.length; i++) {
            if(toucha.row == this.body[i].row && toucha.col == this.body[i].col){
                document.querySelectorAll("audio")[2].play();
                alert("哈哈，傻缺，撞自己啦！长度是：" + this.body.length);
                this.body.shift();
                clearInterval(game.timer);
            }
        };

    }

    //改变方向的方法
    Snake.prototype.changeDirection = function(str){
        //更改方向
        this.willDirection = str;
    }
})();