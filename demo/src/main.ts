import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { RxJSDebugger } from 'rxjs-debugger';
import { Observable } from 'rxjs';

if (environment.production) {
  enableProdMode();
} else {
  RxJSDebugger.init(Observable);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
