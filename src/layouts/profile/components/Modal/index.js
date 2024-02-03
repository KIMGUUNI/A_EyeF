import * as React from 'react';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [inquiry_title, setInquiry_title] = React.useState();
  const [inquiry_content, setInquiry_content] = React.useState();
  const [inquiry_pw, setInquiry_pw] = React.useState();
  const [user_idx] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  React.useEffect(() => {
    // 컴포넌트가 마운트되면 모달을 열기
    handleOpen();
  }, []); // 빈 배열은 마운트될 때 한 번만 실행됨

  const title = (e) => {
    setInquiry_title(e.target.value)
  }

  const content = (e) => {
    setInquiry_content(e.target.value)
  }

  const b_pw = (e) => {
    setInquiry_pw(e.target.value)
  }

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8089/A_Eye",
    withCredentials: true,
  });

  const complete= async() => {
    try {
      var storedLoginVO = JSON.parse(sessionStorage.getItem('loginVO'))
      console.log(storedLoginVO.user_idx);
      console.log(user_idx);
      const boardData = {
        user_idx:storedLoginVO.user_idx,
        inquiry_content,
        inquiry_title,
        inquiry_pw
      };
      console.log(boardData);
      const response = await axiosInstance.post("/api/profile", boardData);
      console.log(response.data);
      alert("완료")
    } catch(error) {
      console.error("Error during sign in:", error);
    }
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Input 태그 3개 추가 */}
          <TextField label="Input 1" fullWidth sx={{ mb: 2 }} onChange={title} />
          <TextField label="Input 2" fullWidth sx={{ mb: 2 }} onChange={content} />
          <TextField label="Input 3" fullWidth sx={{ mb: 2 }} onChange={b_pw} />
          <button onClick={complete}>완료</button>
        </Box>
      </Modal>
    </div>
  );
}
