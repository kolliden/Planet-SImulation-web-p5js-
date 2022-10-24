class Hud{
    constructor(){
        this.x = 170;
        this.y = 300;
        this.div = createDiv('').size(100, 150).position(0, 0).style("width", "190px");
        this.div01 = createDiv('').size(100, 150).position(0, 20).style("width", "190px");
        this.div11 = createDiv('').size(100, 150).position(0, 40).style("width", "190px");
        this.div21 = createDiv('').size(100, 150).position(0, 60).style("width", "190px");
        this.slider = createSlider(1, 100000, 30, 1).position(10, 90).style('width', '130px');
        this.button = createButton('Pause Simulation').position(7, 110).style('width', '150px');
        this.button1 = createButton('Show Debug Info').position(7, 130).style('width', '150px');
        this.button2 = createButton('Teleport random').position(7, 150).style('width', '150px');
        this.inp = createInput('Planet Xvel:').position(7, 170).style('width', '150px');
        this.inp1 = createInput('Planet Yvel:').position(7, 190).style('width', '150px');
        this.button3 = createButton('Set Vel').position(7, 210).style('width', '150px');


        this.nextMass = 10;
    }

    init(){
        this.button.mousePressed(() =>{
            paused ? paused = false: paused = true;
        });
        this.button1.mousePressed(() =>{
            debug ? debug = false: debug = true;
        });
        this.button2.mousePressed(() =>{
            currentPlanetIndex == planets.length-1 ? currentPlanetIndex = 0 : currentPlanetIndex++; // Or Math.floor(Math.random()*planets.length);
        });
        this.button3.mousePressed(() =>{
            planets[currentPlanetIndex].vel = createVector(int(this.inp.value), int(this.inp1.value));
        });
    }

    update = function(){
        this.nextMass = this.slider.value();
        this.button.html(paused? "Unpause": "Pause ");
        this.div.html("Selected Planet: " + planets[currentPlanetIndex].name);
        this.div01.html("Amount of total Planets:" + planets.length.toString());
        this.div11.html("Total Vel: " + int(totalVel) + " px per sec");
        this.div21.html("Mass of next planet:" + this.nextMass.toString());


    }
}