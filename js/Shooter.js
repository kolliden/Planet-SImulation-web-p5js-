class Shooter {
    constructor() {
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.R = 255;
        this.G = 255;
        this.B = 255;
        this.force = 0;
        this.force_x = 0;
        this.force_y = 0;
    }

    startCircularOrbit = function(mass) {
        this.R = floor(random(100, 255));
        this.G = floor(random(100, 255));
        this.B = floor(random(100, 255));
        this.force = 0;
        this.force_x = 0;
        this.force_y = 0;
        this.mass = mass;

        if (abs(mouseX / sf - generalOffset.x) < abs(mouseY / sf - generalOffset.y)) {
            this.x1 = biggestMass.pos.x;
            this.y1 = mouseY / sf - generalOffset.y;
            this.y2 = mouseY / sf - generalOffset.y;
            this.force = sqrt(G * biggestMass.mass / dist(biggestMass.pos.x, biggestMass.pos.y, this.x1, this.y1));
            this.force_x = this.force;
            this.x2 = this.x1 - (10 * this.force_x);

        } else {
            this.x1 = mouseX / sf - generalOffset.x;
            this.x2 = mouseX / sf - generalOffset.x;
            this.y1 =  biggestMass.pos.y;
            this.force = sqrt(G * biggestMass.mass / dist(biggestMass.pos.x, biggestMass.pos.y, this.x1, this.y1));
            this.force_y = this.force;
            this.y2 = this.y1 - (10 * this.force_y);
        }
    }

    setCOForces = function(){
        if (this.x1 == windowWidth / 2) {
            this.force_x = -this.force_x;
            this.x2 = this.x1 - (10 * this.force_x);

        } else if (this.y1 == windowHeight / 2) {
            this.force_y = -this.force_y;
            this.y2 = this.y1 - (10 * this.force_y);

        }
    }

    startMouseShooter = function(mass){
        this.mass = mass;
        this.x1 = (mouseX / sf) - generalOffset.x;
        this.y1 = (mouseY / sf) - generalOffset.y;
        this.R = floor(random(255));
        this.G = floor(random(255));
        this.B = floor(random(255));
    }

    updateMouseShooter = function(){
        this.x2 = (mouseX/sf) - generalOffset.x;
        this.y2 = (mouseY/sf) - generalOffset.y;
        this.force = int(dist(this.x1, this.y1, this.x2, this.y2)) / 10;
    }

    setMSForces = function(){
        var alpha = 0;
        var x_dir = 0;
        var y_dir = 0;

        if (this.force > 1) {
            if (this.x1 != this.x2) {
                alpha = atan(abs((this.y2 - this.y1)) / abs((this.x2 - this.x1)));
                this.force_x = this.force * cos(alpha);
                this.force_y = this.force * sin(alpha);
            } else {
                this.force_x = 0;
                this.force_y = this.force;
            }

            if (this.x2 < this.x1) {
                if (this.y2 < this.y1) {
                    x_dir = 1;
                    y_dir = 1;
                } else {
                    x_dir = 1;
                    y_dir = -1;
                }
            } else {
                if (this.y2 < this.y1) {
                    x_dir = -1;
                    y_dir = 1;
                } else {
                    x_dir = -1;
                    y_dir = -1;
                }
            }
        }
        this.shoot("mouse", x_dir, y_dir);
    }

    shoot = function (type = 0, x_dir = 0, y_dir = 0){
        switch (type) {
            case "circular":
                append(planets, new Planet(planets.length + 1, this.x1, this.y1, this.force_x + biggestMass.vel.x, this.force_y + biggestMass.vel.y, this.R, this.G, this.B, this.mass));
                break;

            case "mouse":
                append(planets, new Planet(planets.length + 1, this.x2, this.y2, (x_dir * this.force_x), (y_dir * this.force_y), this.R, this.G, this.B, this.mass));
                break;

            default:
                append(planets, new Planet(planets.length + 1, this.x1, this.y1, this.force_x, this.force_y, this.R, this.G, this.B, this.mass));
                break;
        }
    }

    reset = function(){
        this.x1 = null;
        this.y1 = null;
        this.x2 = null;
        this.y2 = null;
        this.R = 255;
        this.G = 255;
        this.B = 255;
        this.force = 0;
        this.force_x = 0;
        this.force_y = 0;
    }

    draw = function () {
        if(!this.x1 || !this.y1 && !this.x2 || !this.y2){return;}
        /* Draw the line and the arraow */
        fill(255)
        stroke(0);
        line(this.x1 - 5, this.y1, this.x1 + 5, this.y1);
        line(this.x1, this.y1 - 5, this.x1, this.y1 + 5);
        line(this.x1, this.y1, this.x2, this.y2);

        /* Draw the futur planet */
        noStroke();
        fill(this.R, this.G, this.B);
        ellipse(this.x2, this.y2, pow(this.mass, 0.8), pow(this.mass, 0.8));

        push();
        fill(255);
        translate((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2);
        if (this.x2 > this.x1) {
            rotate(atan2(this.y2 - this.y1, this.x2 - this.x1));
        } else {
            rotate(atan2(this.y1 - this.y2, this.x1 - this.x2));
        }
        text(nfc(this.force, 0), 0, -5);
        pop();
    }
}
