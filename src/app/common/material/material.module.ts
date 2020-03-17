import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

const Material = [
  MatButtonModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  DragDropModule
];

@NgModule({

  imports: [ Material ],
  exports: [ Material ]
})
export class MaterialModule { }
