import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Itens por página:';

  customPaginatorIntl.nextPageLabel = 'Próxima página';

  customPaginatorIntl.previousPageLabel = 'Página anterior'

  customPaginatorIntl.getRangeLabel = function (page, pageSize, length) {
      if (length == 0 || pageSize == 0)  { 
        return `0 of ${length}`; 
      } 

      length = Math.max(length, 0);
      
      const startIndex = page * pageSize; 

      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize; 
      
      return `${startIndex + 1} – ${endIndex} de ${length}`; 
    }

  return customPaginatorIntl;
}