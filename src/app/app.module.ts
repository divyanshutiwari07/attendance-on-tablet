import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './shared/guard';
import { LoginComponent } from './component/login/login.component';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { HeaderComponent } from './component/attendance/header/header.component';
import { PersonComponent } from './component/attendance/person/person.component';
import { LiveStreamComponent } from './component/attendance/live-stream/live-stream.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    LiveStreamComponent,
    LoginComponent,
    HeaderComponent,
    AttendanceComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
