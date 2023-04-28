import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.css'],
})
export class ProfileManagementComponent implements OnInit {
  showUserProfileModal = false;

  user? : any;
  career? : string;
  skills? : string;

  constructor() { }

  openUserProfileModal() {
    this.showUserProfileModal = true;
  }

  closeUserProfileModal() {
    this.showUserProfileModal = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') ?? '{}');
    this.career = this.user.career;
    this.skills = this.user.skills;
  }
}




