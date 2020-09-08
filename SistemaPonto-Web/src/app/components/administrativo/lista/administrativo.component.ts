import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Guid } from 'guid-typescript';
import { ConfirmExclusionDialogComponent } from 'src/app/utilities/confirm-exclusion-dialog/confirm-exclusion-dialog.component';
import { Administrativo } from '../../../models/entidades/administrativo';
import { AdministrativoService } from '../../../services/administrativo.service';
import { NotificationService } from 'src/app/utilities/notification.service';

@Component({
  selector: 'app-administrativo',
  templateUrl: './administrativo.component.html',
  styleUrls: ['./administrativo.component.css']
})
export class AdministrativoComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'commands'];
  dataSource: MatTableDataSource<Administrativo>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private administrativoService: AdministrativoService, private dialog: MatDialog,
      private notification: NotificationService) {          
      this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAll(){
    this.administrativoService.get().subscribe((administradores: Administrativo[]) => {
      this.dataSource.data = administradores;
    },(response) => {
      this.notification.openSnackBarDanger(response.error);
    });
  }

  confirmExclusao(id: Guid){
    const dialogRef = this.dialog.open(ConfirmExclusionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delete(id);
      }
    });
  }

  delete(id: Guid){
    this.administrativoService.delete(id).subscribe((success) => {
      this.getAll();
    }, (response) => {
      this.notification.openSnackBarDanger(response.error);
    });
  }
}
