let blocks = [
  {
    x: 100,
    y: 500,
    w: 600,
    h: 20
  },
  {
    x: 390,
    y: 420,
    w: 20,
    h: 82
  },
  {
    x: 85,
    y: 400,
    w: 30,
    h: 70
  },
  {
    x: 685,
    y: 400,
    w: 30,
    h: 70
  }
];

let G = 0.098;

let ball = {
  x: 200,
  y: 300,
  r: 8,
  v: {
    x: 0,
    y: 0
  }
};

function physics(circle, box, velocity) {
  if(circle.x + circle.r < box.x) {
    return;
  }
  if(circle.y + circle.r < box.y) {
    return;
  }
  if(circle.x - circle.r > box.x + box.w) {
    return;
  }
  if(circle.y - circle.r > box.y + box.h) {
    return;
  }

  if(Math.abs(box.x + box.w / 2 - circle.x) > box.w / 2 && Math.abs(box.y + box.h / 2 - circle.y) > box.h / 2) {

    let intersectionPoint = {
      x: circle.x < box.x ? box.x : box.x + box.w,
      y: circle.y < box.y ? box.y : box.y + box.h
    };

    if(Math.hypot(circle.x - intersectionPoint.x, circle.y - intersectionPoint.y) < circle.r) {
      let norm = {
        x: circle.x - intersectionPoint.x,
        y: circle.y - intersectionPoint.y
      };

      let vs = Math.hypot(norm.x, norm.y);
      norm = {
        x: norm.x / vs,
        y: norm.y / vs
      };

      let dotn = velocity.x * norm.x + velocity.y * norm.y;

      velocity.x = velocity.x - 2 * dotn * norm.x;
      velocity.y = velocity.y - 2 * dotn * norm.y;
      return 1;
    }
    return;
  }

  if(circle.y + circle.r > box.y + box.h) {
    circle.y = box.y + box.h + circle.r;
    velocity.y *= -1;
    return;
  }
  if(circle.y - circle.r < box.y) {
    circle.y = box.y - circle.r;
    velocity.y *= -1;
    return 1;
  }
  if(circle.x + circle.r > box.x + box.w) {
    circle.x = box.x + box.w + circle.r;
    velocity.x *= -1;
    return 1;
  }
  if(circle.x - circle.r < box.x) {
    circle.x = box.x - circle.r;
    velocity.x *= -1;
    return 1;
  }
}

function setup() {
  createCanvas(800, 800);
  blocks[0].color = color(150, 180, 230);
  blocks[1].color = color(255);
  blocks[2].color = color(255, 0, 0);
  blocks[3].color = color(0, 0, 255);
}

function draw() {
  cursor('none');

  background(255);

  ball.v.y += G;

  ball.x += ball.v.x;
  ball.y += ball.v.y;

  blocks[2].x = mouseX;
  blocks[2].y = mouseY;
  blocks[3].y = ball.y - 50;


  for(let i=0;i<blocks.length;i++){
    if(physics(ball, blocks[i], ball.v)){
      if(i == 2){
        ball.v.x += mouseX - pmouseX;
        ball.v.y += mouseY - pmouseY;
        ball.x += ball.v.x;
        ball.y += ball.v.y;
      }
      ball.x += ball.v.x;
      ball.y += ball.v.y;
    }
  }

  for(let i=0;i<blocks.length;i++){
    fill(blocks[i].color);
    rect(blocks[i].x, blocks[i].y, blocks[i].w, blocks[i].h);
  }



  ellipse(ball.x, ball.y, ball.r*2, ball.r*2);
}

function keyPressed(){
  ball = {
  x: 200,
  y: 300,
  r: 8,
  v: {
    x: 0,
    y: 0
  }
};

}
