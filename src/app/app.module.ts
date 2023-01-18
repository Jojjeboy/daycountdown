import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { LocalStorageServiceService } from './local-storage-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [LocalStorageServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
