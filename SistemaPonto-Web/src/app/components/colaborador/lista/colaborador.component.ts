import { Component, OnInit, ViewChild } from '@angular/core';
import { Guid } from 'guid-typescript';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmExclusionDialogComponent } from 'src/app/utilities/confirm-exclusion-dialog/confirm-exclusion-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Colaborador } from '../../../models/entidades/colaborador';
import { ColaboradorService } from  '../../../services/colaborador.service';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'commands'];
  dataSource: MatTableDataSource<Colaborador>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private colaboradorService: ColaboradorService, private dialog: MatDialog) {          
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
     this.colaboradorService.get().subscribe((colaboradores: Colaborador[]) => {
      this.dataSource.data = colaboradores;
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
    this.colaboradorService.delete(id).subscribe((success) => {
      this.getAll();
    })    
  }
}
