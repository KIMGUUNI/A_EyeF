import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PayResult from '../components/PayResult';

export default function ResultTable({ result }) {
  // 금액 합계를 저장할 상태 변수 선언
  const [totalAmount, setTotalAmount] = useState(0);

  // result 배열이 변경될 때마다 금액 합계 업데이트
  useEffect(() => {
    if (result) {
      let sum = 0;
      result.forEach(row => {
        // 금액이 숫자인 경우에만 합산
        if (!isNaN(row.금액)) {
          sum += parseInt(row.금액);
        }
      });
      setTotalAmount(sum);
    }
  }, [result]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ display: 'contents' }}>
          <TableRow>
            <TableCell>광고</TableCell>
            <TableCell align="right">시작 날짜</TableCell>
            <TableCell align="right">종료 날짜</TableCell>
            <TableCell align="right">재생 횟수</TableCell>
            <TableCell align="right">가격</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result && result.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.광고}</TableCell>
              <TableCell align="right">{row['시작 날짜']}</TableCell>
              <TableCell align="right">{row['종료 날짜']}</TableCell>
              <TableCell align="right">{row['재생 횟수']}</TableCell>
              <TableCell align="right">{row.금액}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
      {/* PayResult 컴포넌트에 금액 합계 전달 */}
      <PayResult totalAmount={totalAmount} result = { result }/>
    </TableContainer>
  );
}
