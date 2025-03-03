import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


interface User {
  password: string;
  id: string;
  userName: string;
  email: string;
  role: string;
}

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TranslateModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  error: string | null = null;
  
  // Modal properties
  showEditModal: boolean = false;
  editUserForm: FormGroup;
  currentUserId: string | null = null;
  
  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    // Initialize the form
    this.editUserForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]]
    });
  }
  
  ngOnInit(): void {
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.loading = true;
    // Replace with your actual API endpoint
    this.http.get<User[]>('https://localhost:7247/api/User/userlist?page=1&pageSize=10')
      .subscribe({
        next: (data) => {
          this.users = data;
          this.loading = false;
        },
        error: (err) => { 
          this.error = 'Failed to load users. Please try again.';
          this.loading = false;
          console.error('Error loading users:', err);
        }
      });
  }
  
  editUser(userId: string): void {
    this.currentUserId = userId;
    const user = this.users.find(u => u.id === userId);
    
    if (user) {
      // Reset the form before patching values
      this.editUserForm.reset();
      
      // Populate the form with user data
      this.editUserForm.patchValue({
        userName: user.userName,
        email: user.email,
        role: user.role
      });
      
      // Show the modal
      this.showEditModal = true;
    } else {
      console.error('User not found');
    }
  }
  
  closeModal(): void {
    this.showEditModal = false;
    this.currentUserId = null;
    this.editUserForm.reset();
  }
  
  saveUser(): void {
    if (this.editUserForm.invalid || !this.currentUserId) {
      return;
    }
  
    // Get the existing user data
    const existingUser = this.users.find(user => user.id === this.currentUserId);
  
    if (!existingUser) {
      alert('User not found');
      return;
    }
  
    // Merge existing data with updated fields
    const updatedUser: any = { 
      id: this.currentUserId,
      ...this.editUserForm.value,
      password: "string" // Hardcoded password
    };
  
    this.http.put(`https://localhost:7247/api/User/update/${this.currentUserId}`, updatedUser)
      .subscribe({
        next: () => {
          // Update the local user array
          this.users = this.users.map(user => 
            user.id === this.currentUserId ? { ...user, ...updatedUser } : user
          );
          
          this.closeModal();
          alert('User updated successfully');
        },
        error: (err) => {
          alert('Failed to update user. Please try again.');
          console.error('Error updating user:', err);
        }
      });
  }
  
  
  
  
  
  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      // Replace with your actual API endpoint
      this.http.delete(`https://localhost:7247/api/User/delete/${userId}`)
        .subscribe({
          next: () => {
            this.users = this.users.filter(user => user.id !== userId);
            alert('User deleted successfully');
          },
          error: (err) => {
            alert('Failed to delete user. Please try again.');
            console.error('Error deleting user:', err);
          }
        });
    }
  }
}