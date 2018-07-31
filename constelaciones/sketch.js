let planet = [];
var postsIndex;
var labels = [];
var title;
var posts = [];
var r = 400;;
var val = 0;
var button;
var inside;
let pr;
var time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(25);
	inside = false;
  loadJSON('https://www.googleapis.com/blogger/v3/blogs/6719264076843274138/posts?key=AIzaSyDljSVan2cU0a0kq0iqF0cglFUzXnWgRP8', gotData);
  smooth();

  button = createButton('click me');
  button.position(50, 300);
  button.mousePressed(changebackground);

	pr = new Preview();
}

function changebackground() {
  val = random(lerpColor(255, 0, 0.5));
}

function gotData(data) {
  // console.log(data.items.length);
  postsIndex = data.items.length;
  posts = data.items;

  fill(255);
  textSize(25);
  text("posts: " + postsIndex, 50, 100);

  for (var i = 0; i < postsIndex; i++) {
    labels = data.items[i].labels;
    title = data.items[i].title;

    var radius = random(r);
    var a = random(TWO_PI);
    var x = width / 2 + cos(a) * radius;
    var y = height / 2 + sin(a) * radius;

    let p = new Planet(x, y, 3, labels, title, i);
    var overlapping = false;

    for (var j = 0; j < planet.length; j++) {
      var other = planet[j];
      var d = dist(p.v1.x, p.v1.y, other.v1.x, other.v1.y);
      if (d < p.r + other.r) {
        overlapping = true;
        break;
      }
    }
    if (!overlapping) {
      planet.push(p);
    }
  }

}

function draw() {
	frameRate(30);
  background(val);
	mouseInside(mouseX, mouseY);
  connected();
  // console.log(frameRate());

  stroke(255);
  textSize(10);
  text("v1.0", 50, 50);
  text("entradas: " + postsIndex, 50, 70);

	for(var i = 0; i < planet.length; i++){
		var p = planet[i];
		// console.log(p.labels);
		text(p.labels, 50, 90+i*20);  // arreglar si se repite borrar de la lista.
	}


	if(inside==true){
		fill(200, 25);
	}else{
		fill(25, 10);
	}

  push();
  translate(width / 2, height / 2);

  if(pr.open==true){

   time+=sin(0.1);
    if(time >=1){
      time = 1;
    }
    scale(lerp(1.0, 0.5, time));
  }else{
    time = 0;
    scale(1);
  }

  stroke(255);
  ellipse(0, 0, r * 2, r * 2);
  pop();


  for (var i = 0; i < planet.length; i++) {

    planet[i].isOver(mouseX, mouseY);
    planet[i].display(mouseX, mouseY);

		// planet[i].debug();
  }
}

 function mouseInside(px, py){
	let d = dist(px, py, width/2, height/2);

	if(d < r){
		inside = true;
	}else{
		inside = false;;
	}
}

function mousePressed() {

  for (var i = 0; i < planet.length; i++) {
    // planet[i].clicked(mouseX, mouseY);
    planet[i].isClicked();
    if(planet[i].isClicked()){
      pr.open = true;
    }else{
      pr.open = false;
    }
  }
}

function connected() {

  for (let p of planet) {
    var conectado = false;
    for (let other of planet) {
      if (p !== other && p.isConnected(other.labels)) {
        conectado = true;
        beginShape();
        stroke(25, 255, random(255));
        noFill();
        vertex(p.v1.x, p.v1.y);
        quadraticVertex(width/2, height/2,other.v1.x, other.v1.y);
        endShape();
      }
    }

  }

}

class Planet {

  constructor(x, y, r, labels, title, id) {

    this.v1 = createVector(x, y);
    this.r = r;
    this.labels = labels;
    this.title = title;
    this.over = false;
    this.brightness = 255;
    this.id = id;
    this.open = false;

  }


  display(px, py) {

    noStroke();
    strokeWeight(1);
    fill(this.brightness);
    stroke(255);
    ellipseMode(CENTER);
    ellipse(this.v1.x, this.v1.y, this.r * 2, this.r * 2);
    // console.log(this.over);

  }

  isClicked() {
    if (this.over) {
      console.log(this.id, this.title, this.labels);
      this.brightness = 0;
			this.open = true;
      return true;
    } else {
      this.brightness = 255;
			this.open = false;
      return false;
    }
  }



	isConnected( labels ) {
	  for (const label of labels)  if (this.labels.includes(label))  return true;
	  return false;
	}

  isOver(px, py) {
    let d = dist(px, py, this.v1.x, this.v1.y);
    if (d < this.r) {
      this.over = true;
      this.r = 40;
    } else {
      this.over = false;
      this.r = 3;
    }
  }

  debug() {
    console.log(labels);
		for(let l of this.labels){
			console.log(this.labels);
		}
  }
}

class Preview{

	constructor(){
		this.open = false;
	}

	scaleAndOpen(){
      for(let p of planet){
        this.open = true;
      }
	}

	scaleandClose(){
    for(let p of planet){
      this.open = false;
    }

}
}
