// Class used as a "narrowing" interface that exposes a minimal logger
// Other members of the actual implementation are invisible
export abstract class MinimalLogger {
  logs: string[];
  logInfo: (msg: string) => void;
}

/*
// Transpiles to:
  var MinimalLogger = (function () {
    function MinimalLogger() {}
    return MinimalLogger;
  }());
  exports("MinimalLogger", MinimalLogger);
*/

// See http://stackoverflow.com/questions/43154832/unexpected-token-export-in-angular-app-with-systemjs-and-typescript/
export const _ = 0;
