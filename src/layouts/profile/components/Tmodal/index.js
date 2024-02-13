import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect} from 'react';

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Tmodal({row}) {
  const [inquiry_title, setInquiry_title] = React.useState("");
  const [inquiry_content, setInquiry_content] = React.useState("");
  const [realAnswer_content, setRealAnswer_content] = React.useState("");
  const [answer_content, setAnswer_content] = React.useState("");
  const [inquiry_completed] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const { inquiry_indx } = row;
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8089/A_Eye",
    withCredentials: true,
  });

  // 페이지 로드하자마자 실행
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("/api/boardGet", inquiry_indx);
        const boardList = response.data;
  
        if (boardList) {
          console.log(inquiry_indx)
          console.log(boardList);
          setInquiry_title(boardList[0].inquiry_title);
          setInquiry_content(boardList[0].inquiry_content);
          setRealAnswer_content(boardList[0].answer_content);
          setOpen(true);

          
        }
      } catch (error) {
        console.error("Error during data fetching:", error);
      }
    };
  
    fetchData()
   
  }, [])
  console.log(answer_content);
  
  // 위에 함수에서 [inquiry_title, inquiry_content] 값이 바뀔때마다 실행
  useEffect(() => {
    console.log("제목1 : " + inquiry_title);
    console.log("내용1 : " + inquiry_content);
    console.log("아아아아아")
  }, [inquiry_title, inquiry_content]);



  // T모달창의 완료 버튼을 누를 때 실행
  const answer = async() => {
    try {

        const boardAnswer = {
          inquiry_indx,
           inquiry_completed: inquiry_completed !== null ? 1 : 0,
          answer_content
        }
      
      const response = await axiosInstance.post("/api/boardAnswer", boardAnswer);
      const boardList = response.data;

      if (boardList) {
        console.log(inquiry_indx);
        console.log(boardList);
        console.log(answer_content);
        setInquiry_title(boardList[0].inquiry_title);
        setInquiry_content(boardList[0].inquiry_content);
        setOpen(true);
      }
      
    } catch (error) {
      console.error("Error during data fetching:", error);
    }
  }

  return (
    <div>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* Input 태그 3개 추가 */}
            <TextField label="제목" fullWidth sx={{ mb: 2 }} value={inquiry_title} />
            <TextField label="내용" fullWidth sx={{ mb: 2 }} value={inquiry_content} />
            <TextField label="답변" fullWidth sx={{ mb: 2 }} value={realAnswer_content!==null?realAnswer_content:undefined} onChange={(e) => setAnswer_content(e.target.value)}/>
            {/* 완료 버튼 추가 */}
            <Button variant="contained" color="primary" onClick={() => { answer(); handleClose(); }}>
              완료
            </Button>
            <Button variant="contained" color="primary" onClick={() => { answer(); handleClose(); }}>
              삭제
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
}