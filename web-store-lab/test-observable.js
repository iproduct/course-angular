Observable = require('rxjs').Observable;

const data$ = Observable.of("Reactive", "Extensions", "are", "fun", "ins't", "it", "?")

var clicks$ = Rx.Observable.fromEvent(document, 'click');

data$
  .flatMap(w => Observable.from(w.split('')))
  .zip(Observable.interval(500))
  // .zip(clicks$)
  .map(t => t[0])
  .bufferTime(2000)
  .startWith('Start')
  .subscribe(x => console.log(x))
