import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import ResultTable from '../resultTable';
import PaymentMethod from '../PaymentMethod';

export default function PayTable() {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8089/A_Eye',
    withCredentials: true,
  });

  const columns = [
    { field: '광고', headerName: '광고', width: 400 },
    { field: '금액', headerName: '금액', width: 300 },
    { field: '재생 횟수', headerName: '재생 횟수', width: 300 },
    { field: '시작 날짜', headerName: '시작 날짜', type: 'number', width: 300 },
    { field: '종료 날짜', headerName: '종료 날짜', type: 'number', width: 350 },
    {
      field: '결제상태',
      headerName: '결제 상태',
      sortable: false,
      width: 200,
      valueGetter: (params) => params.row['결제상태'],
    },
  ];

  const [rows, setRows] = useState([]);
  const [result, setResult] = useState([]);
  const loginVO = JSON.parse(sessionStorage.getItem('UserInfo'));
  const user_idx = loginVO.user_idx;
  const User_idx = {
    user_idx,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post('/api/adList', User_idx);
        const boardList = response.data;

        const modifiedAdList = boardList.map(row => ({
          id: row.ad_idx,
          광고: row.ad_name,
          금액: row.ad_play_number * 500,
          '재생 횟수': row.ad_play_number,
          '시작 날짜': row.ad_start_date,
          '종료 날짜': row.ad_end_date,
          '결제상태': row.pay_date ? '결제완료' : '미결제',
        }));
        setRows(modifiedAdList);
      } catch (error) {
        console.error('Error during data fetching:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ height: 500, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          onRowSelectionModelChange={(e) => {
            setResult(e.map(id => rows.find(row => row.id === id)))
          }}
        />
      </div>
      <br />
      <br />
      <br />
      <ResultTable result={result} />
      <br />
      <br />
      <br />
      <PaymentMethod result={result} />
    </>
  );
}
