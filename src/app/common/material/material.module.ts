import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

const Material = [
  MatButtonModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({

  imports: [ Material ],
  exports: [ Material ]
})
export class MaterialModule { }
