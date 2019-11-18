var counter = (function countWithClosure() { //IIFE - Module pattern
  var count = 0; //private state
  function inc() {
    return ++count;
  }
  return { //public API
    increment: function () {
      return inc();
    },
    decrement: function () {
      return --count;
    }
  };
})();


console.log(counter.increment());
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.decrement());
console.log(counter.decrement());
console.log(counter.decrement());
       