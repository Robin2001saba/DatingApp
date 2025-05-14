import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MemberDetailResolver } from './app/_resolvers/member-detail.resolver';
import { MemberListResolver } from './app/_resolvers/member-list.resolver';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MemberEditResolver } from './app/_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './app/_guards/prevent-unsaved-changes.guard';
import { FileDropDirective, FileSelectDirective, FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeAgoPipe } from 'time-ago-pipe';
import { TimeagoModule } from 'ngx-timeago';
import { ListsResolver } from './app/_resolvers/lists.resolver';
import { MessagesResolver } from './app/_resolvers/messages.resolver';
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    importProvidersFrom(
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      MemberDetailResolver,
      MemberListResolver,
      NgxGalleryModule,
      FileUploadModule,
      FileDropDirective, 
      FileSelectDirective,
      MemberEditResolver,
      ListsResolver,
      MessagesResolver,
      PreventUnsavedChanges,
      TimeAgoPipe,
      TimeagoModule.forRoot(),
      //BsDatepickerModule.forRoot(),
      
    )
  ]
}).catch(err => console.error(err));