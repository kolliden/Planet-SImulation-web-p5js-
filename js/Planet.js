class Planet {
	constructor(index, x, y, accx, accy, R, G, B, mass, name, isStatic) {
		this.name = name || "Planet " + index;
		this.traj = [];
		this.count = 0;
		this.Ro = R || 0;
		this.Go = G || 0;
		this.Bo = B || 0;
		this.R = R || 0;
		this.G = G || 0;
		this.B = B || 0;
		this.mass = mass || 10;
		this.radius = this.calculateRadius(this.mass)
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(accx, accy);
		this.tempAcc = this.acc.copy();
		this.isStatic = isStatic || false;
	}

	getTotalVel(){
		return Math.sqrt(sq(this.vel.x) + sq(this.vel.y));
	}

	calculateRadius(m){
		return pow(m, 0.8);
	}

	collide = function (body) {
		if(!this.isStatic){
			let d = dist(this.pos.x, this.pos.y, body.pos.x, body.pos.y);
			if (d < this.radius + body.radius){ //(m 1 ⋅ v 1 + m 2 ⋅ v 2) / ( m 1 + m 2 ) = v
				let a = createVector(this.mass * this.vel.x, this.mass * this.vel.y)
				let b = createVector(body.mass * body.vel.x, body.mass * body.vel.y)
				let c = this.mass + body.mass;
				let newVel = createVector((a.x + b.x)/c, (a.y + b.y)/ c);
				this.vel = newVel;
				this.mass += body.mass;
				this.radius = this.calculateRadius(this.mass);

				return true
			}
			// console.log("No  collision");
			return false
		}
	}

	applyForce = function (force) {
		this.acc.add(force);
	}

	newton = function () {
		if(!this.isStatic){
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.tempAcc = this.acc.copy();
			this.acc.mult(0);
		}
	}

	orbit = function (body) {
		if(!this.isStatic){
			var gravity_force = 0;
			var gravity_force_x = 0;
			var gravity_force_y = 0;
			var x_dir = 0;
			var y_dir = 0;
			var alpha = 0;


			/* Gravitational force */
			var g_dist = dist(this.pos.x, this.pos.y, body.pos.x, body.pos.y)
			gravity_force = ((G * body.mass) / (sq(g_dist)));
			if (body.pos.x != this.pos.x) {
				alpha = atan(abs((body.pos.y - this.pos.y)) / abs((body.pos.x - this.pos.x)));
				gravity_force_x = gravity_force * cos(alpha);
				gravity_force_y = gravity_force * sin(alpha);
			} else {
				gravity_force_x = 0;
				gravity_force_y = gravity_force;
			}

			/* Gravitational force direction */
			if (this.pos.x < body.pos.x) {
				if (this.pos.y < body.pos.y) {
					x_dir = 1;
					y_dir = 1;
				} else {
					x_dir = 1;
					y_dir = -1;
				}
			} else {
				if (this.pos.y < body.pos.y) {
					x_dir = -1;
					y_dir = 1;
				} else {
					x_dir = -1;
					y_dir = -1;
				}
			}

			/* Apply gravitational force */
			this.applyForce(createVector((x_dir * gravity_force_x), (y_dir * gravity_force_y)));
		}
	}

	draw = function () {
		/* Draw planet */
		noStroke();
		fill(this.R, this.G, this.B, 250);
		ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);

		/* Draw trajectory */
		strokeWeight(3);
		beginShape(LINES);
		if (255 == this.count) { //TODO: make traj longer in proportion to speed
			for (var i = 0; i < this.count - 1; i++) {
				this.traj[i] = this.traj[i + 1];
			}
			this.traj[this.count - 1] = createVector(this.pos.x, this.pos.y);
		} else {
			this.traj[this.count] = createVector(this.pos.x, this.pos.y);
			this.count++;
		}
		for (var i = 1; i < this.traj.length; i++) {

			stroke(this.R, this.G, this.B, i);
			vertex(this.traj[i-1].x, this.traj[i-1].y);
			vertex(this.traj[i].x, this.traj[i].y)
		}
		endShape();

		push();
		strokeWeight(1);
		stroke(255);
		translate(this.pos.x + this.radius, this.pos.y);
		scale(1/sf*2);
		text(nfc(this.mass, 0), 0, -5)
		text(nfc(this.name, 0), 0, -20)

		pop();

		this.R = this.Ro;
		this.G = this.Go;
		this.B = this.Bo;
	}


	drawDebugInfo = function(){
		if(this.vel.x || this.vel.y){
			stroke(constrain(this.R + 50, 0, 255), constrain(this.G + 50, 0, 255), constrain(this.B + 50, 0, 255));
			line(this.pos.x, this.pos.y, this.pos.x + this.vel.x, this.pos.y + this.vel.y);

			stroke(255, constrain(this.G - 150, 0, 255), constrain(this.B - 150, 0, 255));
			line(this.pos.x, this.pos.y, this.pos.x + this.tempAcc.x * 10, this.pos.y + this.tempAcc.y * 10);
		}
	}
}