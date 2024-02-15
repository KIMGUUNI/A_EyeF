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
import ReactPlayer from 'react-player';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const columns = [
  { id: 'ad_idx', label: '광고번호', minWidth: 170 },
  {
    id: 'ad_name',
    label: '광고이름',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'user_idx',
    label: '광고소유자',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'ad_target_age', label: '광고 타겟 연령', minWidth: 100 },
  {
    id: 'ad_target_gender',
    label: '광고 타겟 성별',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(ad_idx, ad_name, user_idx, ad_target_age, ad_target_gender) {
  return { ad_idx, ad_name, user_idx, ad_target_age, ad_target_gender };
}

export default function StickyHeadTable() {
  const style = {
    display: 'flex',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [row, setRow] = React.useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8089/A_Eye",
    withCredentials: true,
  });

  React.useEffect(() => {
    fetchDataFromDB();
  }, []);

  const fetchDataFromDB = async () => {
    try {
      const response = await axiosInstance.post("/api/SelectVd");
      const adData = response.data;
      const newRows = adData.map(data => createData(data.ad_idx, data.ad_name, data.user_idx, data.ad_target_age, data.ad_target_gender));
      setRows(newRows);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRowClick = async (rowData) => {
    setRow(rowData);
    try {
      const response = await axiosInstance.post("/api/GetVideoUrl", rowData);
      const videoUrl = response.data;
      setSelectedVideoUrl(videoUrl);
      setOpenModal(true);
    } catch (error) {
      console.error('Error fetching video URL:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseModal = () => {
    setSelectedVideoUrl(null);
    setRow(null);
    setOpenModal(false);
  };
  const handleApprove = async () => {
    try {
      const requestData = {
        ad_idx: row.ad_idx,
        ad_name: row.ad_name,
        user_idx: row.user_idx,
        ad_target_age: row.ad_target_age,
        ad_target_gender: row.ad_target_gender,
        file_s3_path: selectedVideoUrl,
      };
      const response = await axiosInstance.post("/api/Approval", requestData);
      if (response) {
        setOpenModal(false);
        fetchDataFromDB();
        alert("승인 완료");
      }
    } catch (error) {
      console.error('Error approving:', error);
    }
  };
  const handleRefuse = async () => {
    try {
      const requestData = {
        ad_idx: row.ad_idx
      };
      const response = await axiosInstance.post("/api/Refuse", requestData);
      if (response) {
        setOpenModal(false);
        fetchDataFromDB();
      }
    } catch (e) {
      e
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ display: 'contents' }}>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={() => handleRowClick(row)}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal} style={{ fontSize: '30px', cursor: 'pointer' }}>&times;</span>
              <ReactPlayer url={selectedVideoUrl} playing />
              <MDBox height="200%" mt={0.5} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  <p>광고이름 : {row?.ad_name}</p>
                </MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  <p>타겟 연령 : {row?.ad_target_age}</p>
                  <p>타겟 성별 : {row?.ad_target_gender}</p>
                </MDTypography>
              </MDBox>
              <MDBox height="300%" mt={2} lineHeight={1} textAlign="center">
                <MDButton color="info" onClick={handleApprove}>승인</MDButton>
                <MDButton color="warning" onClick={handleRefuse} style={{ marginLeft: '10px' }}>거절</MDButton>
              </MDBox>
            </div>
          </div>
        </Box>
      </Modal>
    </Paper>
  );
}