import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton, IonAvatar, IonLabel, IonItem, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonSpinner } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { RickAddMortyService } from 'src/app/service/rick-add-morty.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { addIcons } from 'ionicons';
import { chevronDown, locationOutline, videocamOutline } from 'ionicons/icons';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonCardContent, IonCard, IonCol, IonRow, IonGrid,
    IonIcon,
    IonItem,
    IonLabel,
    IonAvatar,
    IonBackButton,
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    SharedModule,
  ],
})
export class CharacterDetailPage {
  characterId: string = '';
  character = null as any;
  episodes : any[] = [];

  constructor(
    private actRouter: ActivatedRoute,
    private rickAndMortySvc: RickAddMortyService //inyectar el servicio de rick y morty.
  ) {
    addIcons({ locationOutline, videocamOutline, chevronDown });

    this.characterId = this.actRouter.snapshot.paramMap.get('id') as string;
    console.log(this.characterId);
  }
  //ngOnInit() {}

  ionViewWillEnter() {
    this.getCharacter();
  }
  //Obtener Personaje tmb... id
  getCharacter() {
    this.rickAndMortySvc.getCharacterById(this.characterId).subscribe({
      next: (res: any) => {

        this.character = res;
        this.getEpisodes();
      },
      error: (error: any) => {},
    });
  }

  getEpisodes() {

    for(let url of this.character.episode){
      this.rickAndMortySvc.getByUrl(url).subscribe({

        next: (res: any) => {
          console.log(res);
          this.episodes.push(res);
      },
        error: (error: any) => {},
    });

    }

  }
}
