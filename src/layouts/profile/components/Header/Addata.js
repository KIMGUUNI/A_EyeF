import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import axios from "axios";

function createData(ad_name, user_idx, ad_target_age, ad_target_gender, ad_play_number, ad_start_date, ad_end_date) {
    return {
        ad_name,
        user_idx,
        ad_target_age,
        ad_target_gender,
        ad_play_number,
        ad_start_date,
        ad_end_date,
        history: [],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'normal' }}> 
                    {row.ad_name}
                </TableCell>
                <TableCell sx={{ fontWeight: 'normal' }} align="right">{row.user_idx}</TableCell>
                <TableCell sx={{ fontWeight: 'normal' }} align="right">{row.ad_target_age}</TableCell>
                <TableCell sx={{ fontWeight: 'normal' }} align="right">{row.ad_target_gender}</TableCell>
                <TableCell sx={{ fontWeight: 'normal' }} align="right">{row.ad_play_number}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>시작 날짜</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{row.ad_start_date}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>종료 날짜</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{row.ad_end_date}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>결제할 금액 ($)</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{`${row.ad_play_number * 500}원`}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowsData, setRowsData] = useState([]);

    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: "http://43.201.117.185:8089/A_Eye",
            withCredentials: true,
        });

        const fetchData = async () => {
            const requestdata = JSON.parse(sessionStorage.getItem("UserInfo"))
            const response = await axiosInstance.post("/api/Addata",requestdata )
            const adData = response.data;
            const newRows = adData.map(data => createData(data.ad_name, data.user_idx, data.ad_target_age, data.ad_target_gender, data.ad_play_number, data.ad_start_date, data.ad_end_date));
            setRowsData(newRows);
        };

        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead sx={{ display: 'contents' }}>
                    <TableRow>
                        <TableCell />
                        <TableCell>광고 이름</TableCell>
                        <TableCell align="right">사용자 ID</TableCell>
                        <TableCell align="right">광고 대상 연령</TableCell>
                        <TableCell align="right">광고 대상 성별</TableCell>
                        <TableCell align="right">광고 재생 횟수</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <Row key={row.ad_name} row={row} />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rowsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
                    }