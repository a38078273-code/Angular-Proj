import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MemberService } from '../../services/member-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';



/** @title Basic use of `<table mat-table>` */
@Component({
  selector: 'app-member',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './member.html',
  styleUrl: './member.css',
})
export class Member implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'cin', 'type', '5'];
  //Injection des dépendances
  constructor(private MS: MemberService, private dialog: MatDialog){ }
  //saisir tableau des membres
  dataSource: any[] = []
  
  //display;;;
  ngOnInit() {
    this.fetchMembers();
  }

  fetchMembers() {
    this.MS.getAllMembers().subscribe((members: any[]) => {
      this.dataSource = members;
    });
  }

  delete(id: string) {
    //ouvrir la boîte
    let dialogRef = this.dialog.open(ConfirmDialog)

    //Attendre le click
    dialogRef.afterClosed().subscribe((v) => {
      if (v) {
        this.MS.deleteMember(id).subscribe(() => {
        this.ngOnInit()
      })
    }
    });
  }
}
