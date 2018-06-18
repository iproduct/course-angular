Observable = require('rxjs').Observable;


const data$ = Observable.of("Reactive", "Extensions", "are", "fun", "ins't", "it", "?")

// var clicks$ = Observable.fromEvent(document, 'click');

data$
  .startWith('Start') 
  .flatMap(w => Observable.from(w.split('')))
  .zip(Observable.interval(500))
  .map(t => t[0])
  // .zip(clicks$)
  // .map(t => t[0])
  .bufferTime(2100)
  .subscribe(x => console.log(x))
