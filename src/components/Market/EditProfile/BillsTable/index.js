import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { getOrderProductByCustomer } from 'api/user';
import BillDetail from './BillDetail';

function createData(id, donhang, ngay, trangthai, tong, thaotac) {
    return { id, donhang, ngay, trangthai, tong, thaotac };
}

const columns = [
    {
        width: 120,
        label: 'Đơn hàng',
        dataKey: 'donhang',
    },
    {
        width: 120,
        label: 'Ngày',
        dataKey: 'ngay',
    },
    {
        width: 120,
        label: 'Trạng thái',
        dataKey: 'trangthai',
    },
    {
        width: 120,
        label: 'Tổng',
        dataKey: 'tong',
    },
    {
        width: 140,
        label: 'Thao tác',
        dataKey: 'thaotac',
        numeric: true,
    },
];

const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric || false ? 'right' : 'left'}
                    style={{ width: column.width }}
                    sx={{
                        backgroundColor: 'background.paper',
                    }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

export default function BillsTable() {
    const idUser = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');
    const [dataLength, setDataLength] = useState(0);
    const [data, setData] = useState([]);
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    function rowContent(index, row) {
        return (
            <React.Fragment>
                {columns.map((column) => (
                    column.dataKey === 'thaotac' ? (
                        <TableCell key={column.dataKey} align="right">
                            <Button variant="contained" color="success"
                                onClick={() => {
                                    setIsShowDetail(true);
                                    setSelectedRow(data[index]);
                                }}
                            >
                                Xem
                            </Button>
                        </TableCell>
                    ) : (
                        <TableCell
                            key={column.dataKey}
                            align={column.numeric || false ? 'right' : 'left'}
                        >
                            {row[column.dataKey]}
                        </TableCell>
                    )
                ))}
            </React.Fragment>
        );
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const newOrder = [0, 5, 1, 3, 2, 4, 6];
            try {
                const response = await getOrderProductByCustomer(Number(idUser), accessToken);
                const reorderedArray = response.data.map(subArray => {
                    return newOrder.map(index => {
                        const value = subArray[index];
                        if (typeof value === 'number' && value.toString().length === 13) {
                            return formatDate(value);
                        } else if (value === 'pending') {
                            return 'Đang xử lý';
                        } else if (value === 'completed') {
                            return 'Hoàn thành';
                        }
                        return value;
                    });
                });
                setDataLength(response.data.length);
                setData(reorderedArray);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const rows = Array.from({ length: dataLength }, (_, index) => {
        const selection = data[index];
        return createData(index, ...selection);
    });

    return (
        isShowDetail ? (
            <BillDetail data={selectedRow} />
        ) : (
            <Paper style={{ height: 400, width: '100%' }}>
                <TableVirtuoso
                    data={rows}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
        )
    );
}
