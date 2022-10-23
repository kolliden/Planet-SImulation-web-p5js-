class ClickHandler {
    constructor() {
        this.shooting = false;
        this.c_shooting = false;
        this.touchKey = false;
    }

    update = function () {
        /* This is checking if the mouse is outside of the HUD. */
        if (mouseX < 0 || mouseX > hud.x || mouseY < 0  || mouseY > hud.y) {

            for (const i in planets) {
                if(pointCircle(mouseX/sf, mouseY/sf, planets[i].pos.x, planets[i].pos.y, planets[i].radius)){
                    planets[i].R = planets[i].R-100;
                    planets[i].G = planets[i].G-100;
                    planets[i].B = planets[i].B-100;
                }

            }

            /* This is the code that allows the user to shoot a planet on a circular Orbit by clicking and
             dragging the mouse. */
            if ((!this.shooting) && (keyIsPressed) && (key == "o") && (!this.c_shooting) && (!this.touchKey)) {
                this.c_shooting = true;
                this.touchKey = true;
                shooter.startCircularOrbit(hud.nextMass);
            }

            if ((!this.shooting) && (keyIsPressed) && (key == "o") && (this.c_shooting) && (!this.touchKey)) {
                this.touchKey = true;
                shooter.setCOForces();
            }

            if ((!this.shooting) && (keyIsPressed) && (keyCode == ENTER) && (this.c_shooting) && (!this.touchKey)) {
                this.c_shooting = false;
                this.touchKey = true;
                shooter.shoot("circular");
                shooter.reset();
            }

            if ((!this.shooting) && (keyIsPressed) && (keyCode == ESCAPE) && (this.c_shooting) && (!this.touchKey)) {
                this.c_shooting = false;
                this.touchKey = true;
            }

            if (!keyIsPressed) {
                this.touchKey = false;
            }

            /* This is the code that allows the user to shoot a planet by clicking and dragging the
            mouse. */
            if ((!this.shooting) && (mouseIsPressed) && (!this.c_shooting)) {
                this.shooting = true;
                shooter.startMouseShooter(hud.nextMass);
            }

            if (this.shooting && mouseIsPressed) {
                shooter.updateMouseShooter();
            }

            if (!mouseIsPressed && this.shooting) {
                shooter.setMSForces();
                this.shooting = false;

                shooter.reset();
            }
        }
    }
}