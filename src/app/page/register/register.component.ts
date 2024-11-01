import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NavbarComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  fname: string = '';
  lname: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const registerData = {
      fname: this.fname,
      lname: this.lname,
      phone: this.phone,
      email: this.email,
      password: this.password,
      role: 'member' // ค่าเริ่มต้นสำหรับ role
    };

    this.http.post('https://wag6.bowlab.net/users/insert', registerData).subscribe(
      (response: any) => {
        console.log('Registration successful', response);
        
        if (response && response.rows_affected > 0) {
          this.successMessage = 'สมัครสมาชิกสำเร็จ! กำลังไปยังหน้าเข้าสู่ระบบ...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        } else {
          this.errorMessage = 'สมัครสมาชิกไม่สำเร็จ';
        }
      },
      error => {
        console.error('Registration failed', error);
        this.errorMessage = 'เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองใหม่';
      }
    );
  }
}
