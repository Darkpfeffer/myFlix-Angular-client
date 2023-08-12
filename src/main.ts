import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

/** 
 * This is the main root of my project 
 * */
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
