import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  boxShadow:
    'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
  border: 0,
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    border: 0,
    ':focus, :focus-within': {
      outline: 'none',
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    textTransform: 'uppercase',
    '& .MuiDataGrid-menuIcon': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      color: theme.palette.text.secondary,
    },
    '& .MuiDataGrid-columnHeader--sorted .MuiDataGrid-columnHeaderTitle': {
      color: theme.palette.text.primary,
    },
  },
  '& .MuiDataGrid-cell.MuiDataGrid-cell--editing:focus-within': {
    outline: 'none',
  },
}));
