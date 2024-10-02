import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonCard, IonAvatar, IonInfiniteScroll, IonInfiniteScrollContent, IonSearchbar } from '@ionic/angular/standalone';
import { RickAddMortyService } from 'src/app/service/rick-add-morty.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonSearchbar,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonAvatar,
    IonCard,
    IonRow,
    IonCol,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    SharedModule,
  ],
})
export class HomePage implements OnInit {
  characters: any[] = [];
  params = {} as any;

  constructor(
    private rickAndMortySvc: RickAddMortyService
  ) {}

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters();
  }

  //---OBTENER PERSONAJES DE LA API ----
  getCharacters(event?: any) {
    this.params.page += 1;

    this.rickAndMortySvc.getCharacters(this.params).subscribe({

      next: (res: any) => {
        this.characters.push(...res.results); //lo que pedimos a la api
        console.log(this.characters);

        if (event) event.target.complete();
      },
      error: (error: any) => {
        if (event) event.target.complete();
      },
    });
  }

  //Filtrador de personajes por el nombre.
  searchCharacters() {
    this.params.page = 1;

    this.rickAndMortySvc.getCharacters(this.params).subscribe({

      next: (res: any) => {
        this.characters = res.results;

      },
      error: (error: any) => {

      },
    });
  }


}
