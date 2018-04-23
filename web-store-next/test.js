Observable = require('rxjs').Observable;

var clicks = Rx.Observable.fromEvent(document, 'click');

Observable.interval(500)
.zip(Observable.of('Reactive', 'Extensions', 'c', 'd', 'e'))
.map(x => x[1])
.bufferTime(1000)
.startWith('Start')
.subscribe(x => console.log(x));
