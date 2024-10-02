import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RickAddMortyService } from '../service/rick-add-morty.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],

  providers: [RickAddMortyService],
})
export class SharedModule {}
