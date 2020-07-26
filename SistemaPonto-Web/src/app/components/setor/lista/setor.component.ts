import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SetorService } from  '../../../services/setor.service';
import { Setor } from '../../../models/setor';
import { Guid } from 'guid-typescript';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmExclusionDialogComponent } from 'src/app/utilities/confirm-exclusion-dialog/confirm-exclusion-dialog.component';

export interface UserData {
  id: string;
  nome: string;
}

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.css']
})
export class SetorComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'commands'];
  dataSource: MatTableDataSource<Setor>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private setorService: SetorService, private dialog: MatDialog) {          
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
     this.setorService.get().subscribe((setores: Setor[]) => {
      this.dataSource.data = setores;
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
    this.setorService.delete(id).subscribe((success) => {
      this.getAll();
    })    
  }
}