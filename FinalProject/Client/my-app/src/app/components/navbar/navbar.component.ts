import { Component } from '@angular/core';
import { UserService } from '../../services/user.service'; // Adjust the import path if necessary
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin$: Observable<boolean>;

  constructor(private userService: UserService, private router: Router) {
    this.isAdmin$ = this.userService.checkLogin().pipe(map(user => user?.role === 'admin'));
  }

  logout() {
    this.userService.logout().subscribe( () => {
      this.router.navigate(['/login']);
      localStorage.removeItem('user');
    } );
  }
}
