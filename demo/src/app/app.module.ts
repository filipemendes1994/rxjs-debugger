import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FakePipe } from './pipes/fake.pipe';
import { FakeDirective } from './directives/fake.directive';

@NgModule({
  declarations: [
    AppComponent,
    FakePipe,
    FakeDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
