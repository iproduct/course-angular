let fibonacci = {
    [Symbol.iterator]() {
      let pre = 0, cur = 1;
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { done: cur > 1000, value: cur }
        }
      }
    }
  }
  
  for (var n of fibonacci) {
    // truncate the sequence at 1000
    console.log(n);
  }