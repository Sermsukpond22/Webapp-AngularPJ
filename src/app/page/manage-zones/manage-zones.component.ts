import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditZoneDialogComponent } from '../edit-zones/edit-zones.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-manage-zones',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './manage-zones.component.html',
  styleUrl: './manage-zones.component.scss'
})
export class ManageZonesComponent {
  zones: any[] = []; // เก็บข้อมูลโซนทั้งหมด
  error: string = '';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchZones(); // ดึงข้อมูลโซนเมื่อเริ่มต้น component
  }

  // ฟังก์ชันดึงข้อมูลโซนทั้งหมดจาก API
  fetchZones() {
    this.http.get<any[]>('https://wag6.bowlab.net/zones')
      .subscribe(
        (data) => this.zones = data,
        (error) => this.error = 'เกิดข้อผิดพลาดในการดึงข้อมูลโซน'
      );
  }

  // ฟังก์ชันเปิด dialog สำหรับแก้ไขโซน
  editZone(zone: any) {
    const dialogRef = this.dialog.open(EditZoneDialogComponent, {
      data: zone // ส่งข้อมูลโซนไปที่ dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchZones(); // รีเฟรชข้อมูลหลังจากแก้ไข
      }
    });
  }

  // ฟังก์ชันลบโซน
  deleteZone(zoneId: number) {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโซนนี้?')) {
      this.http.delete(`https://wag6.bowlab.net/zones/delete/${zoneId}`)
        .subscribe(
          () => this.fetchZones(), // รีเฟรชข้อมูลหลังจากลบ
          (error) => this.error = 'เกิดข้อผิดพลาดในการลบโซน'
        );
    }
  }
}
