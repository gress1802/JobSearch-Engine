import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  selectedUser : any;
  users? : any[];
  searchQuery? : string;

  constructor( private userService : UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  viewDetails(user : any) {
    this.selectedUser = user;
  }

  searchUsers() {
    if (this.searchQuery) {
      this.userService.searchUsers(this.searchQuery).subscribe((users) => {
        this.users = users;
      });
    } else {
      this.ngOnInit();
    }
  }
}

