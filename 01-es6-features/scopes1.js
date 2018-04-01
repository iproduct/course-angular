'use strict';

// var i;
var callbacks = [];
for (var i = 0; i < 10; i++) {
  callbacks[i] = function(j) {
    console.log(j);
  }
  setTimeout(callbacks[i], i * 1000, i);
}