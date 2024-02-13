import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

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

const buttonStyle = {
  marginTop: '2px',
  color: 'black', 
};

export default function BasicModal({ isOpen, onClose }) {
  const [inquiry_title, setInquiry_title] = React.useState('');
  const [inquiry_content, setInquiry_content] = React.useState('');
  const [inquiry_pw, setInquiry_pw] = React.useState('');
  const [user_idx] = React.useState(null);

  const handleClose = (event, reason) => {
    if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
      return;
    }
    onClose();
  };

  const title = (e) => {
    setInquiry_title(e.target.value);
  };

  const content = (e) => {
    setInquiry_content(e.target.value);
  };

  const b_pw = (e) => {
    setInquiry_pw(e.target.value);
  };

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8089/A_Eye',
    withCredentials: true,
  });

  const complete = async () => {
    try {
      var storedLoginVO = JSON.parse(sessionStorage.getItem('loginVO'));
      console.log(storedLoginVO.user_idx);
      console.log(user_idx);
      const boardData = {
        user_idx: storedLoginVO.user_idx,
        inquiry_content,
        inquiry_title,
        inquiry_pw,
      };
      console.log(boardData);
      const response = await axiosInstance.post('/api/profile', boardData);
      console.log(response.data);
      alert('완료');

    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  return (
      <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            variant="outlined"
            color="primary"
            style={{ position: 'absolute', top: 0, right: 0, color:'black'}}
            onClick={handleClose}
          >닫기
          </Button>
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="작성자"
            onChange={title}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="제목"
            onChange={content}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            multiline
            rows={7}
            fullWidth
            sx={{ mb: 2 }}
            label="내용"
            onChange={b_pw}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" color="primary" style={buttonStyle} onClick={complete}>
            작성
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
