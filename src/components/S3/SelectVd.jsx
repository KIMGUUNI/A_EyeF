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
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

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
  { id: 'ad_start_date', label: '시작날짜', minWidth: 170,align: 'right' },
  { id: 'ad_end_date', label: '종료날짜', minWidth: 170,align: 'right' },
];

function createData(ad_idx, ad_name, user_idx, ad_target_age, ad_target_gender,ad_start_date,ad_end_date) {
  return { ad_idx, ad_name, user_idx, ad_target_age, ad_target_gender,ad_start_date,ad_end_date};
}

export default function StickyHeadTable() {
  const navigate = useNavigate();
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
    baseURL: "http://43.201.117.185:8089/A_Eye",
    withCredentials: true,
  });

  React.useEffect(() => {
    fetchDataFromDB();
  }, []);

  const fetchDataFromDB = async () => {
    try {
      const response = await axiosInstance.post("/api/SelectVd");
      const adData = response.data;
      const newRows = adData.map(data => createData(data.ad_idx, data.ad_name, data.user_idx, data.ad_target_age, data.ad_target_gender,data.ad_start_date,data.ad_end_date));
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
    getUserInfo()
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
    getUserInfo()
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

  const getUserInfo = async () => {
    try {
      let token;

      const adminCookie = Cookies.get("Admin");
      const userCookie = Cookies.get("User");

      if (adminCookie) {
        token = adminCookie
      } else if (userCookie) {
        token = userCookie
      } else {
        // 쿠키가 없을 때 --> 로그인이 아예 안된 경우
        alert("로그인을 해 주세요.")
        navigate("/authentication/sign-in");
      }

       const config = {
        headers: {
          Authorization: `Bearer${token}`
        }
      };
 
       await axiosInstance.get("/api/prove", config);

    } catch (error) {
      //  토큰의 서명이 올바르지 않거나 토큰의 내용이 손상되었을 경우
      if (error.response.data == "토큰 검증에 실패했습니다.") {
        alert("다시 로그인 해주세요.")
        navigate("/authentication/sign-in");
        // 쿠키는 있지만 jwt가 만료되었을 때
      } else if (error.response.data == "토큰이 만료되었습니다.") {
        
        
        var jwtFromCookie = Cookies.get("reToken");
        if (jwtFromCookie) {
          const reTkken = {
            headers: {
              Authorization: `Bearer${jwtFromCookie}`
            }
          };

          try {
            // refresh 토큰을 이용해 access 토큰을 재발급
            const loginVO = JSON.parse(sessionStorage.getItem('UserInfo'));

            const queryParams = new URLSearchParams({
              user_name: loginVO.user_name,
              user_position: loginVO.user_position,
              user_idx: loginVO.user_idx
              //user_idx:loginVO.user_idx
            }).toString();

            const url = `/api/reProve?${queryParams}`;

            const response = await axiosInstance.get(url, reTkken);

            // const response = await axiosInstance.get("/api/reProve", reTkken, data);
            const newToken = response.data
            const adminCookie = Cookies.get("Admin");
            const userCookie = Cookies.get("User");
            if (adminCookie) {
              Cookies.set("Admin", newToken)
            } else if (userCookie) {
              Cookies.set("User", newToken)
            }

          } catch (error) {
            // refresh 토큰이 유효하지 않거나 발급 실패 등의 처리
            if (error.response.data == "다시 로그인 해주세요") {
              alert("다시 로그인 해주세요.")
              navigate("/authentication/sign-in");
            }
          }
        }

      }
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
                        <TableCell sx={{ fontWeight: 'normal' }} key={column.id} align={column.align}>
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