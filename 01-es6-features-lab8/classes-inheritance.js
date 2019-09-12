class Shape {
  constructor(x, y, w, h, strokeColor, fillColor) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
    this.fillColor = fillColor || "#000000";
    this.strokeColor = strokeColor || "#000000";
  }
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
  toString() {
    return `x: ${this.x}, y: ${this.y}, width: ${this.w}, height: ${this.h}`;
  }
}

class Point extends Shape {
  constructor(x, y, color) {
    super(x, y, 0, 0, color, color);
  }
  toString() {
    return `Point: ${super.toString()}, color: ${this.strokeColor}`;
  }
}

const s1 = new Shape(2, 6, 5, 10, "#ff0000", "#00ff00");
console.log(s1.toString());

const p1 = new Point(15, 20, "#0000ff");
console.log(p1.toString());
p1.move(100, 100);
console.log(p1.toString());
