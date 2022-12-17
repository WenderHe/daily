window.onload = function () {

    function main() {

        this.bunum = 0;
        this.hasCreatEnemyNum = 0;
        // var that=this;
        this.bulletdirection = 1;
        this.index = 0;
        this.bricksCollation = [];
        this.mybulletCollection = [];
        this.enemyCollection = [];
        this.enemyBulletCollection = [];

        this.direction = 0;
        this.enemyNum = 0;
        this.mapwindow = document.querySelector(".map")
        this.Mytank = document.querySelector(".Mytank");
        this.Mytank.style.display = "block";
        this.victory = document.querySelector("#victory");
        this.defect = document.querySelector("#defeat");
        this.cover = document.querySelector(".cover");
        this.scorebar = document.querySelector(".score");
        this.lifebar = document.querySelector(".mylife");
        this.score = 0;
        this.isCanshot = true;
        this.timer1 = setInterval(function () {

            for (let i = 0; i < this.mybulletCollection.length; i++) {
                let m = this.mybulletCollection[i];
                m.num = i;
                m.move();
                m.hit();
                if (m.x < 0 || m.x > 650 || m.y < 0 || m.y > 650) {
                    this.mybulletCollection.splice(i, 1);
                    this.mapwindow.removeChild(m.bullet);

                }


            }


            for (let i = 0; i < this.enemyCollection.length; i++) {
                let e = this.enemyCollection[i];
                e.move();
                e.shot();
            }


            for (let i = 0; i < this.enemyBulletCollection.length; i++) {
                let ene = this.enemyBulletCollection[i];
                ene.num = i;
                if (ene.x < 0 || ene.x > 650 || ene.y < 0 || ene.y > 650) {
                    ene.isalive = false;
                    console.log("编号为" + ene.bullet.bunum + "删除了");
                    continue;
                }
                ene.move();
                ene.hit2();


            }

            let t
            for (let i = 0; i < this.enemyBulletCollection.length; i++) {
                t = this.enemyBulletCollection[i];
                if (typeof (t) == "undefined") {
                    break;

                }
                if (!t.isalive) {
                    t.bullet.remove();
                    this.enemyBulletCollection.splice(i, 1);


                }


            }

            let t2;
            for (let i = 0; i < this.bricksCollation.length; i++) {
                t2 = this.bricksCollation[i];
                if (typeof (t2) == "undefined") {
                    break;
                }
                if (!t2.isalive) {
                    t2.remove();
                    this.bricksCollation.splice(i, 1);
                    // i--;
                }

            }

        }.bind(this), 10);


        this.timer2 = setInterval(function () {           //随机生成坦克

            if (this.enemyNum < 10) {
                let temp = true;
                let x = parseInt(Math.random() * 13 + "px", 10);
                let y = parseInt(Math.random() * 13 + "px", 10);
                console.log(x)
                console.log(y)

                for (let i = 0; i < this.bricksCollation.length; i++) {
                    let bri = this.bricksCollation[i];
                    if (this.intersects(x * 50, y * 50, 40, 40, bri.x, bri.y, bri.width, bri.height) && bri.type !== 3) {
                        temp = false;
                        break;
                    }

                }
                for (let i = 0; i < this.enemyCollection.length; i++) {
                    let bri = this.enemyCollection[i];

                    if (this.intersects(x * 50, y * 50, 40, 40, bri.x, bri.y, bri.width, bri.height)) {
                        temp = false;

                        break;
                    }
                }
                if (typeof (this.my) != "undefined" && this.intersects(x * 50, y * 50, 40, 40, this.my.x, this.my.y, this.my.width, this.my.height)) {
                    temp = false;


                }


                if (map[y][x] === 0 && temp) {
                    let ene = new enemy(this, x, y);
                    this.enemyCollection.push(ene);
                    this.enemyNum++;
                    this.hasCreatEnemyNum++;
                    // console.log(main.enemyNum)
                    console.log(this.enemyCollection.length)
                }


            }

            if (this.hasCreatEnemyNum === 30) {

                clearInterval(this.timer2);

            }
        }.bind(this), 10);


        function inition(main) {
            var number;
            for (var i = 0; i < 13; i++) {
                for (var j = 0; j < 13; j++) {
                    number = map[i][j];
                    switch (number) {
                        case 1:
                            creatElement("div", j, i, "Brick", 1, main);

                            break;
                        case 2:

                            creatElement("div", j, i, "ironBrick", 2, main);
                            break;
                        case 3:
                            creatElement("div", j, i, "Grass", 3, main);

                            break;
                        case 4: //老巢
                            creatElement("div", j, i, "Base", 4, main);

                            break;


                    }

                }
            }


        }

        this.intersects = function (x1, y1, w1, h1, x2, y2, w2, h2) {
            let tw = w1;
            let th = h1;
            let rw = w2;
            let rh = h2;
            if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
                return false;
            }
            let tx = x1;
            let ty = y1;
            let rx = x2;
            let ry = y2;
            rw += rx;
            rh += ry;
            tw += tx;
            th += ty;
            //      overflow || intersect
            return ((rw < rx || rw > tx) &&
                (rh < ry || rh > ty) &&
                (tw < tx || tw > rx) &&
                (th < ty || th > ry));
        }


        function creatElement(name, x, y, classname, type, main) {
            if (type === 4) {
                let ele = document.createElement(name);
                ele.isalive = true;
                ele.className = classname;
                ele.x = x * 50;
                ele.y = y * 50;
                ele.width = 50;
                ele.height = 50;
                ele.style.left = x * 50 + "px";
                ele.style.top = y * 50 + "px";
                ele.type = type;
                ele.life = 3;
                main.mapwindow.appendChild(ele);
                main.bricksCollation.push(ele);

            } else {
                let ele = document.createElement(name);
                ele.isalive = true;
                ele.className = classname;
                ele.x = x * 50;
                ele.y = y * 50;
                ele.width = 50;
                ele.height = 50;
                ele.style.left = x * 50 + "px";

                ele.style.top = y * 50 + "px";
                ele.type = type;

                main.mapwindow.appendChild(ele);

                main.bricksCollation.push(ele);

            }


        }


//


        inition(this);

        this.my = new mytank(this);
        this.p = new player(this);


    }

    // main();
    var a = document.querySelector("#play");

    a.addEventListener("click", function () {


        main();
        a.style.display = "none";
    })


}