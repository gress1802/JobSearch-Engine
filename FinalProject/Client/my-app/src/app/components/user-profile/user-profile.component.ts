import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ])
    ]),
  ],
})
export class UserProfileComponent implements OnInit{
  //used to communicate with parent component
  @Output() closeModalEvent = new EventEmitter<void>();

  user? : any;
  career? : string;
  skills? : string;

  constructor( private userService : UserService ) { }

  closeModal() {
    this.closeModalEvent.emit();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') ?? '{}');
    this.career = this.user.career;
    this.skills = this.user.skills;
  }

  //This is a function that will be used to save the changes made to the user's career and skills
  saveChanges() {
    if(this.career && this.skills) {
      this.userService.updateUserCareerAndSkills(this.career, this.skills).subscribe(() => {
        this.user.career = this.career;
        this.user.skills = this.skills;
        localStorage.setItem('user', JSON.stringify(this.user));
        window.location.reload();
        this.closeModal();
      });
    }
  }
}

