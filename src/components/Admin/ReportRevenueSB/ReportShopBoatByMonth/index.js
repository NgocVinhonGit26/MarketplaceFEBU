import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import DashboardLayout from "layouts/DashboardLayout";
import './style.scss'
import { getTotalPriceOrderItemByShopBoatIdInMonth } from "api/productOrder";

export default function ReportShopBoatByMonth() {
    const [datas, setDatas] = useState([]);
    const accsessToken = localStorage.getItem("accessToken");

    const Datas = [
        {
            idShopBoat: 2,
            shopName: 'Marine Outfitters',
            revenue: 23456
        },
        {
            idShopBoat: 9,
            shopName: 'Sunset Boating',
            revenue: 34567
        },

    ];

    const createData = (response) => {
        return response.map((item) => ({

            idShopBoat: item[0],
            shopName: item[1],
            revenue: item[2]
        }));
    };



    useEffect(() => {
        const fetchTotalPriceOrderItemByShopBoatIdInMonth = async () => {
            try {
                const response = await getTotalPriceOrderItemByShopBoatIdInMonth(accsessToken);
                const transformedData = createData(response.data);
                setDatas(transformedData);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchTotalPriceOrderItemByShopBoatIdInMonth();
    }, []);

    useEffect(() => {
        console.log(datas);
    }, [datas]);

    const [chartData, setChartData] = useState({
        labels: datas.map((data) => data.shopName),
        datasets: [
            {
                label: "Revenue ",
                data: datas.map((data) => data.revenue),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    });

    useEffect(() => {
        if (datas.length > 0) {
            setChartData({
                labels: datas.map((data) => data.shopName),
                datasets: [
                    {
                        label: "Revenue",
                        data: datas.map((data) => data.revenue),
                        backgroundColor: [
                            "rgba(75,192,192,1)",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0"
                        ],
                        borderColor: "black",
                        borderWidth: 2
                    }
                ]
            });
        }
    }, [datas]);

    return (
        <DashboardLayout layoutRole={0}>
            <div className="chart-container" style={{ minWidth: '900px !important' }}>
                <h2 style={{ textAlign: "center" }}>Biểu đồ</h2>
                <Pie
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Tổng doanh thu của các thuyền buôn trong tháng 5/2024",
                            }
                        }
                    }}
                />
            </div>
        </DashboardLayout>
    );
}
