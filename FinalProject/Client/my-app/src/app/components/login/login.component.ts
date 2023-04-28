import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showRegisterModal : boolean = false;
  email : string = '';
  password : string = '';
  falseLogin : boolean = false;

  constructor( private userService : UserService, private router : Router) { }

  openRegisterModal() {
    this.showRegisterModal = true;
  }

  closeRegisterModal() {
    this.showRegisterModal = false;
  }

  login() {
    this.userService.login(this.email, this.password).subscribe(
      (user) => {
        this.falseLogin = false;
        this.router.navigate(['/dashboard']);
        localStorage.setItem('user', JSON.stringify(user));
      },
      (error) => {
        console.error('Error logging in:', error);
        this.falseLogin = true;
      }
    );
  }
}

