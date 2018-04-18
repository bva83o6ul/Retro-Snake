(function(){
    //所有的代码都写在闭包里，利用window对象暴露唯一的Game类。
    //好处是能关住作用域，和其他JS文件中的变量不冲突。
    var game = window.Game = function(){
        this.rowAmount = 16;//行数
        this.colAmount = 20;//列数
        //初始化UI界面，创建表格
        this.init();
        //实例化小蛇类
        this.snake = new Snake();
        //实例化食物
        this.food = new Food(this);

        //开启游戏定时器
        this.start();
        //监听键盘事件
        this.bindEvent();
    }
    //初始化UI界面，创建表格
    Game.prototype.init = function(){
        this.dom = document.createElement('table');
        document.getElementById("app").appendChild(this.dom);
        var tr,td;
        for (var i = 0; i < this.rowAmount; i++) {
            tr = document.createElement('tr');//遍历行上树
            this.dom.appendChild(tr);
            for (var j = 0; j <this.colAmount; j++) {
                 td = document.createElement('td');//遍历列上树
                 tr.appendChild(td);
            };
        };
    }
    //设置蛇身的颜色
    Game.prototype.setColor = function(row,col,color){
        this.dom.getElementsByTagName("tr")[row].getElementsByTagName('td')[col].style.background = color;
    }
    //设置食物
    Game.prototype.setHTML = function(row,col,html){
        this.dom.getElementsByTagName("tr")[row].getElementsByTagName('td')[col].innerHTML = html;
    }

    //清屏，遍历行和列，设为白色
    Game.prototype.clear = function(){
        for (var i = 0; i < this.rowAmount; i++) {
            for (var j = 0; j <this.colAmount; j++) {
                 this.dom.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].style.background = "white";
                 this.dom.getElementsByTagName("tr")[i].getElementsByTagName('td')[j].innerHTML = "";
            };
        };
    }
    //游戏定时器
    Game.prototype.start = function(){
        var self = this;
        this.f = 0;// 帧频
        this.timer = setInterval(function(){
            self.f++;
            document.getElementById('info').innerHTML = "帧编号" + self.f;
            //先清屏
            self.clear();
            //再渲染蛇的方法
            self.snake.render();
            //渲染食物
            self.food.render();
            //渲染蛇
            var s = self.snake.body.length < 15 ? 20 : 3;
            self.f % s == 0 && self.snake.update();
        },20)
    }

    //绑定键盘监听，调用direction()方法更改方向
    Game.prototype.bindEvent = function(){
        var self = this;
        document.onkeydown = function(event){
            if(event.keyCode == 37){
                //按左箭头，如果写在是往右走，不允许调用
                if(self.snake.direction == "R") return;
                self.snake.changeDirection("L");
            }else if(event.keyCode == 38){
                if(self.snake.direction == "D") return;
                self.snake.changeDirection("U");
            }else if(event.keyCode == 39){
                if(self.snake.direction == "L") return;
                self.snake.changeDirection("R");
            }else if(event.keyCode == 40){
                if(self.snake.direction == "U") return;
                self.snake.changeDirection("D");
            }
            console.log(self.snake.direction)
        }
    }
})();