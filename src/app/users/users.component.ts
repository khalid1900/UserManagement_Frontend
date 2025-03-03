import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true, // ✅ Standalone component
  imports: [CommonModule], // ✅ Import CommonModule for *ngFor
  templateUrl: './users.component.html',
})
export class UsersComponent {
  users = [
    { username: 'JohnDoe', role: 'Admin' },
    { username: 'JaneSmith', role: 'User' },
  ];
}
