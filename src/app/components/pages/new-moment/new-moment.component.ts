import { Component } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  btnText = "Compartilhar!"
  constructor(private momentServie:MomentService, 
    private messageService:MessageService, 
    private router:Router,
    ){}

  async createHandler(moment:Moment){
    const formData = new FormData()
    formData.append('title', moment.title);
    formData.append('description', moment.description);
    if(moment.image){
      formData.append('image', moment.image);
    }
    //toDO
    await this.momentServie.createMoment(formData).subscribe();
    await this.messageService.add("Mensagem adicionada com sucesso!");
    this.router.navigate(["/"]);
  }
}
