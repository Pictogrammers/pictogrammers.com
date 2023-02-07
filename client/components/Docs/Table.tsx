import { FunctionComponent } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableFooter,
  TableHead,
  TableProps,
  TableRow,
  TableRowProps
} from '@mui/material';

interface ITable extends TableProps {
  node?: any;
}

interface ITableRow extends TableRowProps {
  node?: any;
  isHeader?: boolean;
}

interface ITableCell extends TableCellProps {
  node?: any;
  isHeader?: boolean;
}

const TableWrapper: FunctionComponent<ITable> = ({ children, node, ...rest }) => {
  return (
    <TableContainer>
      <Table {...rest}>{children}</Table>
    </TableContainer>
  );
};

const TableRowWrapper: FunctionComponent<ITableRow> = ({ children, isHeader, node, ...rest }) => {
  return <TableRow {...rest}>{children}</TableRow>;
};

const TableCellWrapper: FunctionComponent<ITableCell> = ({ children, isHeader, node, ...rest }) => {
  return <TableCell variant={isHeader ? 'head' : 'body'} {...rest}>{children}</TableCell>;
};

export {
  TableWrapper as Table,
  TableRowWrapper as TableRow,
  TableCellWrapper as TableCell,
  TableBody,
  TableHead,
  TableFooter
};
