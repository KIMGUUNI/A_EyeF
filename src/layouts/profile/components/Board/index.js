import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
  { field: '광고', headerName: '광고', width: 100 },
  { field: '금액', headerName: '금액', width: 200 },
  { field: '재생 횟수', headerName: '재생 횟수', width: 130 },
  { field: '시작 날짜', headerName: '시작 날짜', type: 'number', width: 300 },
  { field: '종료 날짜', headerName: '종료 날짜', type: 'number', width: 300 },
  {
    field: '결제 상태',
    headerName: '결제 상태',
    sortable: false,
    width: 200,
    valueGetter: (params) => `${params.row.answerStatus}`,
  },
];

export default function PayTable() {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8089/A_Eye',
    withCredentials: true,
  });

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post('/api/adList');
        const boardList = response.data;
        const modifiedAdList = boardList.map(row => ({
          id: row.ad_idx,
          광고: row.ad_name,
          금액: row.ad_price,
          '재생 횟수': row.play_count,
          '시작 날짜': row.start_date,
          '종료 날짜': row.end_date,
          answerStatus: row.inquiry_completed === 1 ? '답변완료' : '미등록',
        }));
        setRows(modifiedAdList);
      } catch (error) {
        console.error('Error during data fetching:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 500, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
