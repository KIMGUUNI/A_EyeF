import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '../Modal';
import Tmodal from '../Tmodal';

const columns = [
  { id: 'inquiry_indx', label: 'No', minWidth: 170 },
  { id: 'inquiry_title', label: '제목', minWidth: 100 },
  {
    id: 'inquiry_date',
    label: '작성날짜',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'answerStatus',
    label: '답변 여부',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

const axiosInstance = axios.create({
  baseURL: "http://localhost:8089/A_Eye",
  withCredentials: true,
});

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [modalType, setModalType] = React.useState(null);
  const [inquiryIndex, setInquiryIndex] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("/api/boardList");
        const boardList = response.data;

        if (boardList) {
          const updatedBoardList = boardList.map(row => ({
            ...row,
            answerStatus: row.inquiry_completed === 1 ? '답변완료' : '미등록',
          }));

          setData(updatedBoardList);
        }
      } catch (error) {
        console.error("Error during data fetching:", error);
      }
    };

    // 페이지 로드 시에 실행
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSelectedRow(null); // 페이지 변경 시 선택된 행 초기화
    setModalType(null); // 페이지 변경 시 모달 종류 초기화
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setSelectedRow(null); // 페이지 변경 시 선택된 행 초기화
    setModalType(null); // 페이지 변경 시 모달 종류 초기화
  };

  const handleRowClick = (row) => {
    const { inquiry_indx } = row;
    setSelectedRow(row);
    setModalType('rowClick');
    setInquiryIndex(inquiry_indx);
  };

  const handleWriteButtonClick = () => {
    setSelectedRow(null); // 새 글 작성 시 선택된 행 초기화
    setModalType('writeButtonClick');
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ display: 'table-header-group' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.inquiry_indx}
                  onClick={() => handleRowClick(row)}
                  style={{ cursor: 'pointer', background: selectedRow === row ? '#f0f0f0' : 'white' }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof row[column.id] === 'number'
                        ? column.format(row[column.id])
                        : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Button variant="contained" color="primary" onClick={handleWriteButtonClick}>
        글쓰기
      </Button>
      {modalType === 'rowClick' && selectedRow && <Tmodal row={selectedRow} />}
      {modalType === 'writeButtonClick' && <Modal />}
    </Paper>
  );
}