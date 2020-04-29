import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule, MatButton } from "@angular/material/button";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule
  ]
})
export class MaterialModule { }
