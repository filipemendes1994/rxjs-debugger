import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { RxJSMonitor } from 'rxjs-monitor';
import { Observable } from 'rxjs';

if (environment.production) {
  enableProdMode();
} else {
  RxJSMonitor.init(Observable);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
