import { Component } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent {
  moment!: Moment;
  btnText!:string;
  constructor(private momentService: MomentService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private messageService:MessageService) { }
  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.btnText = 'Editar';
    this.momentService.getMoment(id).subscribe((item) => {
      return this.moment = item.data;
    
    });
  }
  async editHandler(momentData:Moment){
    const id = this.moment.id;
    const formData = new FormData();
    formData.append('title', momentData.title);
    formData.append('description', momentData.description);
    if(momentData.image){
      formData.append('description', momentData.image);
    }
    await this.momentService.updateMoment(id!, formData).subscribe();
    this.messageService.add(`Moment ${momentData.id}: ${momentData.title} foi atualizado com sucesso!`);
    await this.router.navigate(['/'])
  }
}
