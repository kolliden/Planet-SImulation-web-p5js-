/* Declaring variables. */
let sun;
let planets = [];
let clickHandler;
let hud;
let count = 0;
let paused = false;
let totalVel = 0;
let biggestMass;
let currentPlanetIndex = 0;
let debug = false;


/* Camera Vars */
let offsets;
let generalOffset;
let cameraPos;
let sf = 0.1;

//Simulation Constants
const G = 1;

function setup() {
    offsets = createVector(0, 0);

    clickHandler = new ClickHandler();

    shooter = new Shooter();

    hud = new Hud();
    hud.init();

    createCanvas(windowWidth, windowHeight);

    sun = new Planet(0, 0, 0, 10, 10, 255, 255, 255, 6000, "Sun", false);
    biggestMass = sun;
    append(planets, sun);
}

function draw() {
    background(100);

    if (keyIsDown(LEFT_ARROW)) {
        offsets.x += pow(50, sf);
    }
    if (keyIsDown(RIGHT_ARROW)) {
        offsets.x -= pow(50, sf);
    }
    if (keyIsDown(UP_ARROW)) {
        offsets.y += pow(50, sf);
    }
    if (keyIsDown(DOWN_ARROW)) {
        offsets.y -= pow(50, sf);
    }

    cameraPos = createVector(
        windowWidth/2/sf  - planets[currentPlanetIndex].pos.x - planets[currentPlanetIndex].vel.x + offsets.x,
        windowHeight/2/sf - planets[currentPlanetIndex].pos.y - planets[currentPlanetIndex].vel.y + offsets.y
    );

    scale(sf);
	translate(cameraPos.x, cameraPos.y);

    generalOffset = createVector(
        cameraPos.x,
        cameraPos.y
    );

    /* Check if a planet is out of bounds */
    var bound = 10000000000000;
    var to_splice = [];
    for (var i = 0; i < planets.length; i++) {
        if ((planets[i].pos.x > bound) ||
            (planets[i].pos.x < (0 - bound)) ||
            (planets[i].pos.y > bound) ||
            (planets[i].pos.y < (0 - bound))) {
            append(to_splice, i);
        }
    }
    for (var i = 0; i < to_splice.length; i++) {
        planets.splice(to_splice[i], 1);
    }

    /* Render planets */
    for (var i = 0; i < planets.length; i++) {
        if (!paused) {
            for (var j = 0; j < planets.length; j++) {
                if (i != j) {
                    /* Calculating the gravitational force between the two planets. */
                    planets[i].orbit(planets[j]);

                    /* Checking if two planets are colliding. If they are, it adds the index of the
                    planet to the to_splice array. */
                    if (!to_splice.includes(i)){
                        if (planets[i].collide(planets[j])) {
                            append(to_splice, j);
                        }
                    }
                }
            }
            /* Finding the biggest mass in the simulation. */
            if(planets[i].mass > biggestMass.mass){
                biggestMass = planets[i];
            }
            /* Updating the position of the planet. */
            planets[i].newton();
        }
        totalVel += planets[i].getTotalVel();
        planets[i].draw();

        /* Checking if the debug variable is true, if it is, it will draw the debug info for each
        planet. */
        if(debug){
            planets[i].drawDebugInfo();
        }
    }
    /* Removing planets that are out of bounds. */
    for (var i = 0; i < to_splice.length; i++) {
        planets.splice(to_splice[i], 1);
    }
    /* Render and Update */
    hud.update();
    clickHandler.update();
    shooter.draw();
    totalVel = 0;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseReleased(event) {
    clickHandler.mouseReleased = true;
}

window.addEventListener("wheel", function(e) {
    if (e.deltaY > 0)
      sf *= 1.05;
    else
      sf *= 0.95;
  });