import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'user-dashboard',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  users: any[] = [];

  constructor() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Filter only users with role 'user' (exclude admins)
    this.users = storedUsers.filter((user:any) => user.role === 'user');
  }
}
