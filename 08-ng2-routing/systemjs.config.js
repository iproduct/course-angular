/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the dist folder
      'app': 'dist',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs': 'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      'app': {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      }
    }
  });

  // Stub out `app/main.ts` so System.import('app') doesn't fail if called in the index.html
  // System.set(System.normalizeSync('app/main.ts'), System.newModule({}));


  // bootstrap();

  // Bootstrap with a default `AppModule`
  // ignore an `app/app.module.ts` and `app/main.ts`, even if present
  // This function exists primarily (exclusively?) for the QuickStart
  function bootstrap() {
    console.log('Auto-bootstrapping');

    // Stub out `app/main.ts` so System.import('app') doesn't fail if called in the index.html
    System.set(System.normalizeSync('app/main.ts'), System.newModule({}));

    // bootstrap and launch the app (equivalent to standard main.ts)
    Promise.all([
      System.import('@angular/platform-browser-dynamic'),
      getAppModule()
    ])
      .then(function (imports) {
        var platform = imports[0];
        var app = imports[1];
        platform.platformBrowserDynamic().bootstrapModule(app.AppModule);
      })
      .catch(function (err) { console.error(err); });
  }

  // Make the default AppModule
  // returns a promise for the AppModule
  function getAppModule() {
    console.log('Making a bare-bones, default AppModule');

    return Promise.all([
      System.import('@angular/core'),
      System.import('@angular/platform-browser'),
      System.import('app/app.component')
    ])
      .then(function (imports) {

        var core = imports[0];
        var browser = imports[1];
        var appComp = imports[2].AppComponent;

        var AppModule = function () { }

        AppModule.annotations = [
          new core.NgModule({
            imports: [browser.BrowserModule],
            declarations: [appComp],
            bootstrap: [appComp]
          })
        ]
        return { AppModule: AppModule };
      })
  }
})(this);
