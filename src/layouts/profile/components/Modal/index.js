import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
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
  textAlign: 'center',
};

export default function BasicModal({ isOpen, onClose }) {
  const [inquiry_title, setInquiry_title] = React.useState('');
  const [inquiry_pw, setInquiry_pw] = React.useState('');
  const [inquiry_content, setInquiry_content] = React.useState('');
  const [user_idx] = React.useState(null);

  const handleClose = (event, reason) => {
    if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
      return;
    }
    onClose();
  };

  const complete = async () => {
    try {
      if (!inquiry_title || !inquiry_pw || !inquiry_content ) {
        // Check if any of the required fields is empty
        alert('모든 필드를 작성해주세요.');
        return;
      }
  
      var storedLoginVO = JSON.parse(sessionStorage.getItem('UserInfo'));
  
      console.log(storedLoginVO.user_idx);
      const boardData = {
        user_idx: storedLoginVO.user_idx,
        inquiry_title,
        inquiry_pw,
        inquiry_content,
      };
      console.log(user_idx);
      console.log(boardData);
      const response = await axios.post('http://localhost:8089/A_Eye/api/profile', boardData);
      console.log(response.data);
      alert('완료');
      onClose();
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
          <MDBox p={1} style={{ textAlign: 'left', marginBottom: '10px' }}>
            <MDTypography variant="h5">게시글 작성</MDTypography>
          </MDBox>
          <MDButton
            variant="outlined"
            color="info"
            style={{ position: 'absolute', top: 0, right: 0, color: 'black' }}
            onClick={handleClose}
          >
            닫기
          </MDButton>
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="제목"
            onChange={(e) => setInquiry_title(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="작성자"
            onChange={(e) => setInquiry_pw(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            multiline
            rows={7}
            fullWidth
            sx={{ mb: 2 }}
            label="내용"
            onChange={(e) => setInquiry_content(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
           <MDButton variant="contained" color="info" onClick={complete} sx={{ mt: 3, width: '70%' }}>
            작성
          </MDButton>
        </Box>
      </Modal>
    </div>
  );
}
