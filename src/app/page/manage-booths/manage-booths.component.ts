import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditBoothDialogComponent } from '../edit-booths/edit-booths.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-manage-booths',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './manage-booths.component.html',
  styleUrls: ['./manage-booths.component.scss'],
})
export class ManageBoothsComponent implements OnInit {
  booths: any[] = [];
  error: string = '';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadBooths();
  }

  loadBooths() {
    this.http.get<any[]>('https://wag6.bowlab.net/booths').subscribe(
      (data) => {
        this.booths = data;
        console.log('Booths loaded:', this.booths);
      },
      (error) => {
        this.error = 'Failed to load booths. Please try again later.';
      }
    );
  }

  // เปิด dialog เพื่อแก้ไขบูธ
  editBooth(booth: any) {
    const dialogRef = this.dialog.open(EditBoothDialogComponent, {
      width: '400px',
      data: booth
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // อัปเดตบูธในรายการหลังแก้ไขเสร็จ
        const index = this.booths.findIndex(b => b.booth_id === result.booth_id);
        if (index !== -1) {
          this.booths[index] = result;
        }
      }
    });
  }

  deleteBooth(boothId: number) {
    if (confirm('Are you sure you want to delete this booth?')) {
      this.http.delete(`https://wag6.bowlab.net/booths/delete/${boothId}`).subscribe(
        () => {
          this.booths = this.booths.filter((booth) => booth.booth_id !== boothId);
        },
        (error) => {
          this.error = 'Failed to delete booth. Please try again later.';
        }
      );
    }
  }
}
