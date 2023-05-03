import { Component } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import {faTimes, faEdit} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'src/app/services/message.service';
import { Comment } from 'src/app/Comments';
import { CommentService } from 'src/app/services/comment.service';
import {FormGroup, FormControl, Validators, FormGroupDirective}from'@angular/forms';
@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent {
  moment?:Moment;
  baseApiUrl = environment.baseApiUrl;
  faTimes = faTimes;
  faEdit = faEdit;
  commentForm!: FormGroup;
  comment?:Comment;
  constructor(private momentService:MomentService,
     private activatedRoute : ActivatedRoute,
     private messageService:MessageService,
     private router:Router,
     private commentService : CommentService,
     ) {}
  ngOnInit():void{
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe((item)=>(this.moment = item.data));
    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }
  get text(){
    return this.commentForm.get('text')!;
  }
  get username(){
    return this.commentForm.get('username')!;
  }
  async removeHandler(id:number){
    await this.momentService.removeMoment(id).subscribe();
    this.messageService.add("Momento excluído com sucesso!");
    this.router.navigate(['/']);

  }
  async onSubmit(formDirective:FormGroupDirective){
    if(this.commentForm.invalid){
      return;
    }
    const data:Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);
    await this.commentService.createComment(data).subscribe((comment)=>{
      this.moment!.comments!.push(comment.data);
    });
    this.messageService.add("Comentário adicionado!");
    ///reset form
    this.commentForm.reset();
    formDirective.resetForm();
  }
}
