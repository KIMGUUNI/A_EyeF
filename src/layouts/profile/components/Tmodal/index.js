import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect } from 'react';
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 6,
};


export default function Tmodal({ row, setData }) {
  const [inquiry_title, setInquiry_title] = React.useState("");
  const [inquiry_pw, setInquiry_pw] = React.useState("");
  const [inquiry_content, setInquiry_content] = React.useState("");
  const [realAnswer_content, setRealAnswer_content] = React.useState("");
  const [answer_content, setAnswer_content] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { inquiry_indx } = row;
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8089/A_Eye",
    withCredentials: true,
  });
  const handleClose = () => {
    setOpen(false);
  };
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [deleteCancelled, setDeleteCancelled] = React.useState(false);

  const handleConfirmDeleteOpen = () => setConfirmDeleteOpen(true);

  const handleConfirmDeleteClose = () => {
    setConfirmDeleteOpen(false);

    if (!deleteCancelled) {
      return;
    }
    handleClose();
  };

  const deletePost = async () => {
    try {
      console.log("보내줄거", inquiry_indx);
      await axiosInstance.post("/api/deletePost", { inquiry_indx });

      // Fetch updated data after deletion
      const response = await axiosInstance.post("/api/boardList");
      const boardList = response.data;

      if (boardList) {
        const updatedBoardList = boardList.map((row) => ({
          ...row,
          answerStatus: row.inquiry_completed === 1 ? '답변완료' : '미등록',
        }));

        // Update the state with the new data using the prop
        setData(updatedBoardList);
      }

      handleClose();
    } catch (error) {
      console.error("Error during post deletion:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = ({
          inquiry_indx: inquiry_indx
        })
        const response = await axiosInstance.post("/api/boardGet", requestData);

        const boardList = response.data;

        if (boardList) {
          console.log("가져온데이터", boardList);
          setInquiry_title(boardList.inquiry_title);
          setInquiry_pw(boardList.inquiry_pw)
          setInquiry_content(boardList.inquiry_content);
          setRealAnswer_content(boardList.answer_content);
          setOpen(true);
        }
      } catch (error) {
        console.error("Error during data fetching:", error);
      }
    };

    fetchData();

  }, [inquiry_indx]);


  // T모달창의 완료 버튼을 누를 때 실행
  const answer = async () => {
    try {
      const boardAnswer = {
        inquiry_indx,
        inquiry_completed: 1, // Assuming 1 means answered, you might want to adjust this based on your logic
        answer_content,
      };

      // Send the answer to the server
      await axiosInstance.post("/api/boardAnswer", boardAnswer);

      // Fetch the updated data after answering
      const response = await axiosInstance.post("/api/boardList");
      const boardList = response.data;

      if (boardList) {
        const updatedBoardList = boardList.map((row) => ({
          ...row,
          answerStatus: row.inquiry_completed === 1 ? '답변완료' : '미등록',
        }));

        // Update the state with the new data
        setData(updatedBoardList);
      }

      // Close the modal
      handleClose();
    } catch (error) {
      console.error("Error during data fetching:", error);
    }
  };


  return (
    <div>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          BackdropProps={{ onClick: null }}
          disableBackdropClick
          disableEscapeKeyDown
        >
          <Box sx={style}>
            <MDBox p={1} style={{ textAlign: 'left', marginBottom: '10px' }}>
              <MDTypography variant="h5">문의 내역</MDTypography>
            </MDBox>
            <MDButton
              variant="outlined"
              color="info"
              style={{ position: 'absolute', top: 0, right: 0, color: 'black' }}
              onClick={handleClose}
              BackdropProps={{ onClick: null }}
            >닫기
            </MDButton>
            {/* Input 태그 3개 추가 */}
            <TextField label="제목" fullWidth sx={{ mb: 2 }} value={inquiry_title} InputLabelProps={{ shrink: true }} />
            <TextField fullWidth sx={{ mb: 2 }} label="작성자" value={inquiry_pw} InputLabelProps={{ shrink: true }} />
            <TextField multiline rows={7} label="내용" fullWidth sx={{ mb: 2 }} value={inquiry_content} InputLabelProps={{ shrink: true }} />
            <TextField multiline rows={5} label="답변" fullWidth sx={{ mb: 2 }} value={realAnswer_content !== null ? realAnswer_content : undefined} onChange={(e) => setAnswer_content(e.target.value)} InputLabelProps={{ shrink: true }} />
            {/* 완료 버튼 추가 */}
            <MDButton variant="contained" color="info" onClick={() => { answer(); handleClose(); }} sx={{ mb: 1 }}>
              완료
            </MDButton>
            <MDButton variant="contained" color="info" onClick={handleConfirmDeleteOpen} sx={{ mb: 1, ml: 1 }}>
              삭제
            </MDButton>
            <Modal
              open={confirmDeleteOpen}
              onClose={handleConfirmDeleteClose}
              aria-labelledby="confirm-delete-modal-title"
              aria-describedby="confirm-delete-modal-description"
            >
              <Box sx={style}>
                <MDTypography variant="h6" component="div" id="confirm-delete-modal-title" sx={{ mb: 2 }}>
                  게시글을 삭제하시겠습니까?
                </MDTypography>
                <MDButton
                  variant="contained"
                  color="info"
                  onClick={() => {
                    deletePost();
                    handleClose();
                    handleConfirmDeleteClose();
                  }}
                >
                  확인
                </MDButton>
                <MDButton
                  variant="outlined"
                  color="info"
                  onClick={() => {
                    setDeleteCancelled(true);
                    handleConfirmDeleteClose();
                  }}
                >
                  취소
                </MDButton>


              </Box>
            </Modal>
          </Box>
        </Modal>
      )}
    </div>
  );
}