import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Movimentacao } from '../../../models/entidades/movimentacao';
import { MovimentacaoService } from '../../../services/movimentacao.service';
import { NotificationService } from 'src/app/utilities/notification.service';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.css']
})
export class MovimentacaoComponent implements OnInit {
  displayedColumns: string[] = ['dataMovimentacao', 'commands'];
  dataSource: MatTableDataSource<Movimentacao>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private movimentacaoService: MovimentacaoService, private notification : NotificationService) {          
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
    this.movimentacaoService.get().subscribe((movimentacoes: Movimentacao[]) => {
      this.dataSource.data = movimentacoes;
    }, (response) => {
      this.notification.openSnackBarDanger(response.error);
    });
  } 
}
