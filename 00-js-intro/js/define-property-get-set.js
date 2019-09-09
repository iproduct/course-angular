function PositionLogger(aPos) {
  var _position = aPos, positionsLog = [{ val: aPos }];
  // this.position = aPos;
  Object.defineProperty(this, 'position', {
    get: function () {
      // console.log('get position called');
      return _position;
    },
    set: function (val) {
      _position = val;
      positionsLog.push({ val: _position });
    },
    enumerable: true
  });

  this.getLog = function () { return positionsLog; };
}

var pl1 = new PositionLogger(5);
console.log('Value: ' + pl1.position);
pl1.position += 20;
console.log('Value: ' + pl1.position);
pl1.position -= 10;
console.log('Value: ' + pl1.position);

console.log(pl1.getLog());

// for (var key in pl1) {
//   if (pl1.hasOwnProperty(key)) {
//     var val = pl1[key];
//     console.log(key, '->', val);
//   }
// }