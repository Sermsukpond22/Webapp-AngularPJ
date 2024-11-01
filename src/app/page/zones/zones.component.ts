import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // นำเข้า Router
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-zones',
  standalone: true,
  imports: [HttpClientModule, CommonModule, NavbarComponent],
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent implements OnInit {
  zones: any[] = [];  // ตัวแปรสำหรับเก็บข้อมูลโซน
  booths: any[] = [];  // ตัวแปรสำหรับเก็บข้อมูลบูธ
  errorMessage: string = '';  // ตัวแปรสำหรับเก็บข้อความข้อผิดพลาด

  constructor(private http: HttpClient, private router: Router) {} // เพิ่ม Router

  ngOnInit() {
    // เรียกข้อมูลจาก API เมื่อ Component ถูกสร้าง
    this.http.get('https://wag6.bowlab.net/zones').subscribe(
      (data: any) => {
        this.zones = data;  // เก็บข้อมูลลงในตัวแปร zones
        console.log('Zones loaded:', this.zones);  // ตรวจสอบข้อมูลที่โหลดได้
      },
      error => {
        this.errorMessage = 'Failed to load zones.';  // กำหนดข้อความข้อผิดพลาด
        console.error('Error loading zones:', error);  // แสดงข้อผิดพลาดใน Console
      }
    );
  }

  // ฟังก์ชันสำหรับโหลดข้อมูลบูธของโซนที่ระบุ
  loadBooths(zoneId: number) {
    this.http.get(`https://wag6.bowlab.net/booths?zoneId=${zoneId}`).subscribe(
      (data: any) => {
        this.booths = data;  // เก็บข้อมูลบูธของโซนนั้นลงในตัวแปร booths
        console.log('Booths loaded for zone', zoneId, ':', this.booths);  // ตรวจสอบข้อมูลบูธ
      },
      error => {
        this.errorMessage = `Failed to load booths for zone ${zoneId}.`;  // ข้อความข้อผิดพลาด
        console.error('Error loading booths:', error);  // แสดงข้อผิดพลาดใน Console
      }
    );
  }

  // ฟังก์ชันสำหรับนำทางไปยังหน้า Booths
  goToBooths(zoneId: number) {
    this.loadBooths(zoneId); // โหลดข้อมูลบูธเมื่อผู้ใช้เลือกโซน
    this.router.navigate(['/booths', zoneId]);  // นำทางไปยังหน้า Booths พร้อม zoneId
  }
}
