import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NavbarComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  showPopup: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  // ฟังก์ชันเช็คเงื่อนไขของรหัสผ่านเบื้องต้น
  private validatePassword(password: string): boolean {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordPattern.test(password);
  }

  login() {
    if (!this.validatePassword(this.password)) {
      this.errorMessage = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร รวมถึงตัวอักษรภาษาอังกฤษและตัวเลข';
      this.successMessage = '';
      return;
    }

    const loginData = { email: this.email, password: this.password };
    console.log('Sending login data:', loginData);

    this.http.post('https://wag6.bowlab.net/users/login', loginData).subscribe(
      (response: any) => {
        console.log('API Response:', response);

        if (response && response.status === 'success' && response.user) {
          // จัดเก็บข้อมูลผู้ใช้ใน localStorage
          localStorage.setItem('user_id', response.user.id);
          localStorage.setItem('user_role', response.user.role);
          localStorage.setItem('user_fname', response.user.fname);
          localStorage.setItem('user_lname', response.user.lname);

          this.successMessage = response.message || 'เข้าสู่ระบบสำเร็จ!';
          this.errorMessage = '';
          this.showPopup = true;

          // เปลี่ยนไปยังหน้า zones หลังจากแสดงข้อความสำเร็จ
          setTimeout(() => {
            this.showPopup = false;
            this.router.navigate(['/zones']);
          }, 1500);
        } else if (response && response.status === 'error') {
          this.errorMessage = response.message;
          this.successMessage = '';
        } else {
          this.errorMessage = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
          this.successMessage = '';
        }

        // ล้างข้อมูลฟอร์ม
        this.email = '';
        this.password = '';
      },
      error => {
        console.error('Login error:', error);
        this.errorMessage = 'เข้าสู่ระบบไม่สำเร็จ โปรดตรวจสอบข้อมูลและลองอีกครั้ง';
        this.successMessage = '';
        this.showPopup = false;

        this.email = '';
        this.password = '';
      }
    );
  }

  closePopup() {
    this.showPopup = false;
  }
}
