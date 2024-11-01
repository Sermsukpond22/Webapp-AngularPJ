import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-booth-dialog',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './edit-booths.component.html',
  styleUrls: ['./edit-booths.component.scss'],
})
export class EditBoothDialogComponent {
  boothName: string;
  boothSize: string;
  boothStatus: string;
  price: number;
  error: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditBoothDialogComponent>,
    private http: HttpClient
  ) {
    // Initialize fields with data passed to dialog
    this.boothName = data.booth_name;
    this.boothSize = data.booth_size;
    this.boothStatus = data.booth_status;
    this.price = data.price;
  }

  // ฟังก์ชันสำหรับบันทึกข้อมูลที่แก้ไข
  saveChanges() {
    const updatedBooth = {
      booth_id: this.data.booth_id,
      booth_name: this.boothName,
      booth_size: this.boothSize,
      booth_status: this.boothStatus,
      price: this.price,
    };

    this.http.put(`https://wag6.bowlab.net/booths/update/${this.data.booth_id}`, updatedBooth)
      .subscribe(
        response => {
          console.log('Booth updated successfully:', response);
          this.dialogRef.close(updatedBooth); // ส่งข้อมูลที่แก้ไขกลับไป
        },
        error => {
          console.error('Error updating booth:', error);
          this.error = 'เกิดข้อผิดพลาดในการอัปเดตบูธ';
        }
      );
  }

  // ฟังก์ชันปิด dialog โดยไม่ส่งข้อมูล
  close() {
    this.dialogRef.close();
  }
}
