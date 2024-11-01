import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-booths',
  standalone: true,
  imports: [HttpClientModule, CommonModule, NavbarComponent],
  templateUrl: './booths.component.html',
  styleUrls: ['./booths.component.scss']
})
export class BoothsComponent implements OnInit, OnDestroy {
  booths: any[] = [];  // ตัวแปรสำหรับเก็บข้อมูลบูธ
  zoneId: number | null = null;  // zoneId เริ่มต้นเป็น null
  errorMessage: string = '';  // ข้อความข้อผิดพลาด
  private routeSub: Subscription | undefined;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // รับ zoneId จาก URL
    this.routeSub = this.route.params.subscribe(params => {
      const zoneIdParam = params['zoneId'];
      this.zoneId = Number(zoneIdParam);

      // ตรวจสอบ zoneId
      if (!isNaN(this.zoneId) && this.zoneId > 0) {
        this.loadBooths();
      } else {
        this.errorMessage = 'Invalid zone ID.';
        console.error('Invalid zone ID:', zoneIdParam);
      }
    });
  }

  loadBooths() {
    // เรียกข้อมูลบูธจาก API
    this.http.get(`https://wag6.bowlab.net/booths?zone_id=${this.zoneId}`).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.booths = data.map((booth: any) => {
            // แปลงสถานะเป็นภาษาท้องถิ่น หาก API ใช้คำอื่น
            booth.booth_status = this.translateStatus(booth.booth_status);
            return booth;
          });
          console.log('Booths loaded:', this.booths);
        } else {
          this.errorMessage = 'Unexpected response format.';
          console.error('Unexpected response:', data);
        }
      },
      error => {
        this.errorMessage = 'Failed to load booths. Please try again later.';
        console.error('Error loading booths:', error);
      }
    );
  }

  reserveBooth(booth: any) {
    const userId = localStorage.getItem('user_id');
    
    if (!userId) {
      this.errorMessage = 'กรุณาเข้าสู่ระบบก่อนจองบูธ';
      return;
    }

    // อัปเดตสถานะบูธเป็น "อยู่ระหว่างตรวจสอบ"
    booth.booth_status = 'อยู่ระหว่างตรวจสอบ';

    const reservationData = {
      user_id: userId,
      booth_id: booth.booth_id
    };

    this.http.post('https://wag6.bowlab.net/reservations/insert', reservationData).subscribe(
      response => {
        console.log('Reservation successful', response);
        alert('จองบูธสำเร็จ!');
        booth.booth_status = 'จองแล้ว';  // อัปเดตสถานะบูธเป็นจองแล้ว
      },
      error => {
        console.error('Error reserving booth:', error);
        alert('จองบูธไม่สำเร็จ กรุณาลองอีกครั้ง.');
        // หากการจองล้มเหลว กลับสถานะเป็น "ว่าง"
        booth.booth_status = 'ว่าง';
      }
    );
  }

  // ฟังก์ชันแปลงสถานะจาก API เป็นภาษาไทย
  private translateStatus(status: string): string {
    switch (status) {
      case 'available':
        return 'ว่าง';
      case 'booked':
        return 'จองแล้ว';
      case 'under_review':
        return 'อยู่ระหว่างตรวจสอบ';
      default:
        return status;
    }
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}
