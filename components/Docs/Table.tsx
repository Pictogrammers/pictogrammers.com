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

const TableWrapper = (props: ITable) => {
  const { children, node, ...rest } = props;

  return (
    <TableContainer>
      <Table {...rest}>{children}</Table>
    </TableContainer>
  );
};

const TableRowWrapper = (props: ITableRow) => {
  const { children, isHeader, node, ...rest } = props;
  return <TableRow {...rest}>{children}</TableRow>;
};

const TableCellWrapper = (props: ITableCell) => {
  const { children, isHeader, node, ...rest } = props;
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
