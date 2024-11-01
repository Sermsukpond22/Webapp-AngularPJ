import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-reserv',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './manage-reserv.component.html',
  styleUrl: './manage-reserv.component.scss'
})
export class ManageReservComponent {
  reservations: any[] = []; // เก็บข้อมูลการจองทั้งหมด
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReservations(); // ดึงข้อมูลการจองเมื่อเริ่มต้น component
  }

  // ฟังก์ชันดึงข้อมูลการจองทั้งหมดจาก API
  fetchReservations() {
    this.http.get<any[]>('https://wag6.bowlab.net/reservations')
      .subscribe(
        (data) => this.reservations = data,
        (error) => this.error = 'เกิดข้อผิดพลาดในการดึงข้อมูลการจอง'
      );
  }

  // ฟังก์ชันยืนยันการจอง
  confirmReservation(reservationId: number) {
    if (confirm('คุณต้องการยืนยันการจองนี้หรือไม่?')) {
      this.http.put(`https://wag6.bowlab.net/reservations/confirm/${reservationId}`, {})
        .subscribe(
          () => {
            alert('การจองยืนยันแล้ว');
            this.fetchReservations(); // รีเฟรชข้อมูลหลังจากยืนยัน
          },
          error => {
            console.error('Error confirming reservation:', error);
            this.error = 'เกิดข้อผิดพลาดในการยืนยันการจอง';
          }
        );
    }
  }

  // ฟังก์ชันลบการจอง
  deleteReservation(reservationId: number) {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบการจองนี้?')) {
      this.http.delete(`https://wag6.bowlab.net/reservations/cancel/${reservationId}`)
        .subscribe(
          () => {
            alert('ลบการจองสำเร็จ');
            this.fetchReservations(); // รีเฟรชข้อมูลหลังจากลบ
          },
          error => {
            console.error('Error deleting reservation:', error);
            this.error = 'เกิดข้อผิดพลาดในการลบการจอง';
          }
        );
    }
  }
}
