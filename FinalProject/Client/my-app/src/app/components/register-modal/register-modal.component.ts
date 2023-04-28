import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', [
        animate('300ms ease-in-out')
      ])
    ])
  ],
})
export class RegisterModalComponent {
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  username? : string;
  password? : string;
  confirmPassword? : string;
  email? : string;

  constructor( private userService : UserService ) { }

  closeModal() {
    this.closeModalEvent.emit();
  }

  registerUser() {
    if(!!this.username && !!this.password && !!this.email) {
      if (this.password != this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      this.userService.registerUser(this.username, this.password, this.email).subscribe(
        (data) => {
          this.closeModal();
        }
      )
    }
  }

}


