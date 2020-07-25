import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SetorService } from  '../../services/setor.service';
import { Setor } from '../../models/setor';
import { Observable } from 'rxjs';

export interface UserData {
  id: string;
  nome: string;
}

const NOMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.css']
})
export class SetorComponent implements OnInit {
  displayedColumns: string[] = ['nome'];
  dataSource: MatTableDataSource<Setor>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private setorService: SetorService) {          
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
     this.setorService.getAll().subscribe((setores: Setor[]) => {
      this.dataSource.data = setores;
     });
  }
}

function createNewUser(id: number): UserData {
  const nome = NOMES[Math.round(Math.random() * (NOMES.length - 1))] + ' ' +
  NOMES[Math.round(Math.random() * (NOMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    nome: nome
  };
}
