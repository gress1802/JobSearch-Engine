import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.css'],
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
export class UserDetailsModalComponent {
  @Input() user: any;
  @Output() closeModalEvent = new EventEmitter<void>();

  constructor( private userService : UserService) {}

  closeModal() {
    this.closeModalEvent.emit();
  }

  deleteUser(user : any){
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user._id).subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          console.error('Error deleting user', error);
        }
      );
    }
  }
}



