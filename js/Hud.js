class Hud{
    constructor(){
        this.x = 170;
        this.y = 300;
        this.div = createDiv('').size(100, 150).position(0, 0).style("width", "150px");
        this.div1 = createDiv('').size(100, 150).position(0, 40).style("width", "190px");
        this.div2 = createDiv('').size(100, 150).position(0, 60).style("width", "190px");
        this.slider = createSlider(1, 100000, 30, 1).position(10, 90).style('width', '130px');
        this.button = createButton('Pause Simulation').position(7, 110).style('width', '150px');
        this.button1 = createButton('Show Debug Info').position(7, 130).style('width', '150px');
        this.button2 = createButton('Teleport random').position(7, 150).style('width', '150px');
        this.div3 = createDiv('').size(100, 150).position(0, 170).style("width", "190px");
        this.div4 = createDiv('').size(100, 150).position(0, 260).style("width", "190px");



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
            currentPlanetIndex = Math.floor(Math.random()*planets.length);
        });
    }

    update = function(){
        this.nextMass = this.slider.value();
        this.button.html(paused? "Unpause": "Pause ");
        this.div.html("Amount of total Planets:" + planets.length.toString());
        this.div1.html("Total Vel: " + int(totalVel) + " px per sec");
        this.div2.html("Mass of next planet:" + this.nextMass.toString());
        this.div3.html("MouseX: " + -generalOffset.x + mouseX/sf + " " + "MouseY: " + -generalOffset.y + mouseY/sf);
        this.div4.html("PlanetX: " + planets[currentPlanetIndex].pos.x + " " + "PlanetY: " + planets[currentPlanetIndex].pos.y);

    }
}