import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-zone-dialog',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './edit-zones.component.html',
  styleUrls: ['./edit-zones.component.scss']
})
export class EditZoneDialogComponent {
  zoneName: string;
  zoneInfo: string;
  numberOfBooths: number;
  error: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditZoneDialogComponent>,
    private http: HttpClient
  ) {
    this.zoneName = data.zone_name;
    this.zoneInfo = data.zone_info;
    this.numberOfBooths = data.number_of_booths;
  }

  // ฟังก์ชันบันทึกการแก้ไขโซน
  saveChanges() {
    const updatedZone = {
      zone_id: this.data.zone_id,
      zone_name: this.zoneName,
      zone_info: this.zoneInfo,
      number_of_booths: this.numberOfBooths
    };

    this.http.put(`https://wag6.bowlab.net/zones/update/${this.data.zone_id}`, updatedZone)
      .subscribe(
        response => {
          console.log('Zone updated successfully:', response);
          this.dialogRef.close(updatedZone); // ส่งข้อมูลที่แก้ไขกลับไป
        },
        error => {
          console.error('Error updating zone:', error);
          this.error = 'เกิดข้อผิดพลาดในการอัปเดตโซน';
        }
      );
  }

  // ฟังก์ชันปิด dialog
  close() {
    this.dialogRef.close();
  }
}
