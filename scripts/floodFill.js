FloodFill = function(imageData, imageWidth, imageHeight) {
  this.stack = [];
  this.imageData = imageData;
  this.imageWidth = imageWidth;
  this.imageHeight = imageHeight;
}

FloodFill.prototype.fill = function(x, y, fillColor) {
  var newFillColor = FloodFill.hexToRgb(fillColor);
  var oldFillColor = this.getPixelColorData(x, y);
  this.checkAndFillAdjacentPixels(x, y, oldFillColor, newFillColor);

  while(this.stack.length > 0) {
    var toFill = this.stack.pop();
    this.checkAndFillAdjacentPixels(toFill[0], toFill[1], oldFillColor, newFillColor);
  }
}

FloodFill.prototype.checkAndFillAdjacentPixels = function(x, y, oldFillColor, newFillColor) {
  if (this.isPixelNeedToBeFilled(x, y, oldFillColor, newFillColor)) { this.fillPixelWithColor(x, y, newFillColor); }

  if (this.isPixelNeedToBeFilled(x, y - 1, oldFillColor, newFillColor)) { this.stack.push([x, y - 1]); }
  if (this.isPixelNeedToBeFilled(x + 1, y, oldFillColor, newFillColor)) { this.stack.push([x + 1, y]); }
  if (this.isPixelNeedToBeFilled(x, y + 1, oldFillColor, newFillColor)) { this.stack.push([x, y + 1]); }
  if (this.isPixelNeedToBeFilled(x - 1, y, oldFillColor, newFillColor)) { this.stack.push([x - 1, y]); }
}

FloodFill.prototype.fillPixelWithColor = function(x, y, newFillColor) {
  var pixelPos = (y * this.imageWidth + x) * 4;

  this.imageData.data[pixelPos] = newFillColor.r;
  this.imageData.data[pixelPos + 1] = newFillColor.g;
  this.imageData.data[pixelPos + 2] = newFillColor.b;
  this.imageData.data[pixelPos + 3] = 255;
}

FloodFill.prototype.isPixelNeedToBeFilled = function(x, y, oldFillColor, newFillColor) {
  if (x < 0 || y < 0 || x > this.imageWidth || y > this.imageHeight) { return false; }
  var pixelPos = (y * this.imageWidth + x) * 4;

  if (FloodFill.isRgbEqual(oldFillColor, newFillColor)) {
    return false;
  }

  if ((this.imageData.data[pixelPos] == oldFillColor.r) && 
     (this.imageData.data[pixelPos + 1] == oldFillColor.g) &&
     (this.imageData.data[pixelPos + 2] == oldFillColor.b)) {
    return true;
  }      

  return false;
}

FloodFill.prototype.getPixelColorData = function(x, y) {
  var r, g, b, a;
  var pixelPos = (y * this.imageWidth + x) * 4;

  r = this.imageData.data[pixelPos];
  g = this.imageData.data[pixelPos + 1];
  b = this.imageData.data[pixelPos + 2];
  a = 255;

  return { r: r, g: g, b: b, a: a }
}

FloodFill.isRgbEqual = function(color1, color2) {
  return color1.r == color2.r && color1.g == color2.g && color1.b == color2.b; 
}

FloodFill.hexToRgb = function(hex) {
  if (hex.charAt(0) == "#") { hex = hex.slice(1); }//Remove the '#' char - if there is one.
  hex = hex.toUpperCase();
  var hex_alphabets = "0123456789ABCDEF";
  var value = new Array(3);
  var k = 0;
  var int1,int2;
  for (var i = 0; i < 6; i += 2) {
    int1 = hex_alphabets.indexOf(hex.charAt(i));
    int2 = hex_alphabets.indexOf(hex.charAt(i+1)); 
    value[k] = (int1 * 16) + int2;
    k++;
  }

  return { r: value[0], g: value[1], b: value[2] };
}
