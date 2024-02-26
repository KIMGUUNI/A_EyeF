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
import Modal from '../Modal';
import Tmodal from '../Tmodal';
import Umodal from '../Usmodal';
import BasicModal from '../Modal';
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

const columns = [
  { id: 'inquiry_indx', label: '글 번호', minWidth: 170 },
  { id: 'inquiry_title', label: '제목', minWidth: 100 },
  { id: 'inquiry_pw', label: '작성자', minWidth: 100 },
  {
    id: 'answerStatus',
    label: '답변 여부',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'inquiry_date',
    label: '작성날짜',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },

];
const axiosInstance = axios.create({
  baseURL: "http://43.201.117.185:8089/A_Eye",
  withCredentials: true,
});



export default function StickyHeadTable() {
const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [modalType, setModalType] = React.useState(null);
  const [user_position, setUser_position] = React.useState(null);

  React.useEffect(() => {
    let storedLoginVO;
    try {
      const storedLoginVOString = sessionStorage.getItem('user_idx');
      storedLoginVO = storedLoginVOString ? JSON.parse(storedLoginVOString) : null;
      setUser_position(storedLoginVO ? storedLoginVO.user_position : null);
    } catch (error) {
      storedLoginVO = null;
   
    }

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
    setSelectedRow(row);
    setModalType('rowClick');
  };

  const handleWriteButtonClick = async () => {
    await getUserInfo();
    setSelectedRow(null); // 새 글 작성 시 선택된 행 초기화
    setModalType('modal'); // Set modal type to 'modal' for general writing
};
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
      /*  if (response.status === 200) {
        alert("검증 성공")
      }  */

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
      <MDBox p={1} style={{ textAlign: 'left', marginBottom: '10px' }}>
        <MDTypography variant="h5">문의글</MDTypography>
      </MDBox>
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
        rowsPerPageOptions={[5,10,25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <MDButton variant="contained" color="info" onClick={handleWriteButtonClick}>
        글쓰기
      </MDButton>
      {modalType === 'rowClick' && selectedRow && (
        user_position === 0 ? <Umodal row={selectedRow} /> : <Tmodal row={selectedRow} setData={setData} />
      )}

      {modalType === 'modal' && (
        <BasicModal isOpen={true} onClose={() => setModalType(null)} data={data} setData={setData} />
      )}

      {modalType !== null && modalType !== 'rowClick' && modalType !== 'modal' && (
        <Modal />
      )}
    </Paper>
  );
}