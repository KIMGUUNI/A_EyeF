import React, {useEffect} from 'react';
import MaterialTable from 'material-table';

import {forwardRef} from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};


export default function Board() {
    const [state, setState] = React.useState({
        columns: [
            {title: '작성자', field: 'name'},
            {title: 'Surname', field: 'surname'},
            {title: 'Birth Year', field: 'birthYear', type: 'numeric'},
            {
                title: 'Birth Place',
                field: 'birthCity',
                lookup: {34: 'İstanbul', 63: 'Şanlıurfa'},
            },
        ],
        data: [
            {name: 'Mehmet', surname: '안녕하세요 ^^ 5-1', birthYear: 1987, birthCity: 63},
            {name: 'Zerya Betül', surname: '글 제목입니다.', birthYear: 2017, birthCity: 34},
            {name: 'Bread', surname: '게시판 테스트', birthYear: 2011, birthCity: 34},
            {name: 'Jonny', surname: 'Material-table 이용하기', birthYear: 2012, birthCity: 17},
            {name: 'Sera', surname: '페이징 처리 이용하기', birthYear: 2007, birthCity: 17},
            {name: 'Simson', surname: '테스트 데이터 5-2', birthYear: 1999, birthCity: 8},
            {name: 'Cerry', surname: '야호 ㅋㅋ!!', birthYear: 1997, birthCity: 53},
            {name: 'Zebra', surname: '잘 넘어가나요?', birthYear: 1987, birthCity: 15},
            {name: 'M.J.', surname: '오키오키 ', birthYear: 1999, birthCity: 54},
            {name: 'K.Son', surname: 'ㅋ아니..', birthYear: 2002, birthCity: 37},
            {name: 'Json', surname: '넵 열심히 하겠습니다 5-3', birthYear: 2015, birthCity: 98},
            {name: 'Merry', surname: 'MacBook Pro 팔아요', birthYear: 2017, birthCity: 11},
            {name: 'Mehmet', surname: '안녕하세요 ^^', birthYear: 1987, birthCity: 63},
            {name: 'Zerya Betül', surname: '글 제목입니다.', birthYear: 2017, birthCity: 34},
            {name: 'Bread', surname: '게시판 테스트', birthYear: 2011, birthCity: 34},
            {name: 'Jonny', surname: 'Material-table 이용하기 5-4', birthYear: 2012, birthCity: 17},
            {name: 'Sera', surname: '페이징 처리 이용하기', birthYear: 2007, birthCity: 17},
            {name: 'Simson', surname: '테스트 데이터', birthYear: 1999, birthCity: 8},
            {name: 'Cerry', surname: '야호 ㅋㅋ!!', birthYear: 1997, birthCity: 53},
            {name: 'Zebra', surname: '잘 넘어가나요?', birthYear: 1987, birthCity: 15},
            {name: 'M.J.', surname: '오키오키 5-5', birthYear: 1999, birthCity: 54},
            {name: 'K.Son', surname: 'ㅋ아니..', birthYear: 2002, birthCity: 37},
            {name: 'Json', surname: '넵 열심히 하겠습니다', birthYear: 2015, birthCity: 98},
            {name: 'Merry', surname: 'MacBook Pro 팔아요', birthYear: 2017, birthCity: 11},
            {name: 'Mehmet', surname: '안녕하세요 ^^', birthYear: 1987, birthCity: 63},
            {name: 'Zerya Betül', surname: '글 제목입니다. 5-6', birthYear: 2017, birthCity: 34},
            {name: 'Bread', surname: '게시판 테스트', birthYear: 2011, birthCity: 34},
            {name: 'Jonny', surname: 'Material-table 이용하기', birthYear: 2012, birthCity: 17},
            {name: 'Sera', surname: '페이징 처리 이용하기', birthYear: 2007, birthCity: 17},
            {name: 'Simson', surname: '테스트 데이터', birthYear: 1999, birthCity: 8},
            {name: 'Cerry', surname: '야호 ㅋㅋ!! 5-7', birthYear: 1997, birthCity: 53},
            {name: 'Zebra', surname: '잘 넘어가나요?', birthYear: 1987, birthCity: 15},
            {name: 'M.J.', surname: '오키오키 ', birthYear: 1999, birthCity: 54},
            {name: 'K.Son', surname: 'ㅋ아니..', birthYear: 2002, birthCity: 37},
            {name: 'Json', surname: '넵 열심히 하겠습니다', birthYear: 2015, birthCity: 98},
            {name: 'Merry', surname: 'MacBook Pro 팔아요 5-8', birthYear: 2017, birthCity: 11},
            {name: 'Mehmet', surname: '안녕하세요 ^^', birthYear: 1987, birthCity: 63},
            {name: 'Zerya Betül', surname: '글 제목입니다.', birthYear: 2017, birthCity: 34},
            {name: 'Bread', surname: '게시판 테스트', birthYear: 2011, birthCity: 34},
            {name: 'Jonny', surname: 'Material-table 이용하기', birthYear: 2012, birthCity: 17},
            {name: 'Sera', surname: '페이징 처리 이용하기 5-9', birthYear: 2007, birthCity: 17},
            {name: 'Simson', surname: '테스트 데이터', birthYear: 1999, birthCity: 8},
            {name: 'Cerry', surname: '야호 ㅋㅋ!!', birthYear: 1997, birthCity: 53},
            {name: 'Zebra', surname: '잘 넘어가나요?', birthYear: 1987, birthCity: 15},
            {name: 'M.J.', surname: '오키오키 ', birthYear: 1999, birthCity: 54},
            {name: 'K.Son', surname: 'ㅋ아니.. 5-10', birthYear: 2002, birthCity: 37},
            {name: 'Json', surname: '넵 열심히 하겠습니다', birthYear: 2015, birthCity: 98},
            {name: 'Merry', surname: '마지막 데이터입니다!!!!!!!', birthYear: 2017, birthCity: 11}
        ],
    });

    const [pageNumber, setPageNumber] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(5);
    const [selectedData, setSelectedData] = React.useState(state.data.slice(pageNumber * pageSize, (pageNumber * pageSize + pageSize)));

    const changePage = (pageNumber) => {
        setPageNumber(pageNumber);
    }

    const changeRowsPerPage = (rowSize) => {
        setPageSize(rowSize);
    }

    useEffect(() => {
        let prevFakeData = createPrevFakeData(pageSize * pageNumber);
        let nextFakeData = createNextFakeData(pageSize);

        if (isFirstPage()) {
            let realData = state.data.slice(pageNumber * pageSize, pageSize);
            setSelectedData(realData.concat(nextFakeData));
        } else if (isLastPage()) {
            let realData = state.data.slice(pageNumber * pageSize, state.data.length);
            setSelectedData(prevFakeData.concat(realData));
        } else {
            let realData = state.data.slice(pageNumber * pageSize, (pageNumber * pageSize) + pageSize);
            setSelectedData(prevFakeData.concat(realData).concat(nextFakeData));
        }
    }, [pageSize, pageNumber]);

    const createPrevFakeData = size => {
        let fakeData = Array.apply(null, new Array(size)).map(Object.prototype.valueOf, new Object());
        return fakeData.map((currentValue, index) => setFakeData(index));
    }

    const createNextFakeData = size => {
        let fakeData = Array.apply(null, new Array(size)).map(Object.prototype.valueOf, new Object());
        return fakeData.map((currentValue, index) => setFakeData(index + (pageNumber + 1) * pageSize));
    }

    const setFakeData = id => {
        let fakeData = new Object();
        fakeData.tableData = {id: id};
        return fakeData;
    }

    const isFirstPage = () => {
        return pageNumber == 0;
    }

    const isLastPage = () => {
        return state.data.length <= pageNumber * pageSize + pageSize;
    }

    return (
        <MaterialTable
            onChangePage={changePage}
            onChangeRowsPerPage={changeRowsPerPage}
            icons={tableIcons}
            title="게시판"
            columns={state.columns}
            data={selectedData}
            options={{
                paginationType: "stepped"
            }}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return {...prevState, data};
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return {...prevState, data};
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return {...prevState, data};
                            });
                        }, 600);
                    }),
            }}
        />
    );
}
