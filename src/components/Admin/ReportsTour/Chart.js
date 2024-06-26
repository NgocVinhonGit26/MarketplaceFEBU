import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { getQuantityOrderTourCompleteTodayByTimePeriod } from 'api/tourOrder';
import { useEffect } from 'react';
import { getQuantityOrderTourCompleteThisWeekByDayOfWeek } from 'api/tourOrder';
import { getQuantityOrderTourCompleteThisMonthByWeekOfMonth } from 'api/tourOrder';
import { getQuantityOrderTourCompleteThisYearByQuarter } from 'api/tourOrder';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}



export default function Chart({ value }) {
  const theme = useTheme();
  const accessToken = localStorage.getItem("accessToken");

  const [dataHour, setDataHour] = React.useState([
    createData('0h-3h', 0),
    createData('3h-6h', 0),
    createData('6h-9h', 0),
    createData('9h-12h', 0),
    createData('12h-15h', 0),
    createData('15h-18h', 0),
    createData('18h-21h', 0),
    createData('21h-24h', 0),
  ]);

  const [dataDay, setDataDay] = React.useState([
    createData('Chủ nhật', 0),
    createData('Thứ 2', 0),
    createData('Thứ 3', 0),
    createData('Thứ 4', 0),
    createData('Thứ 5', 0),
    createData('Thứ 6', 0),
    createData('Thứ 7', 0),

  ]);

  const [dataWeek, setDataWeek] = React.useState([
    createData('Tuần 1', 0),
    createData('Tuần 2', 0),
    createData('Tuần 3', 0),
    createData('Tuần 4', 0),
    createData('Tuần 5', 0),
  ]);

  const [dataMonth, setDataMonth] = React.useState([
    createData('T1', 0),
    createData('T2', 0),
    createData('T3', 0),
    createData('T4', 0),
    createData('T5', 0),
    createData('T6', 0),
    createData('T7', 0),
    createData('T8', 0),
    createData('T9', 0),
    createData('T10', 0),
    createData('T11', 0),
    createData('T12', 0),
  ]);

  const updateData = (categoryTime, totalPrices) => {
    if (value === 1) {
      setDataHour((prev) => {
        return prev.map((item) => {
          if (item.time === categoryTime) {
            return { ...item, amount: totalPrices };
          }
          return item;
        });
      });
    }
    if (value === 2) {
      setDataDay((prev) => {
        return prev.map((item) => {
          if (item.time === categoryTime) {
            return { ...item, amount: totalPrices };
          }
          return item;
        });
      });
    }
    if (value === 3) {
      setDataWeek((prev) => {
        return prev.map((item) => {
          if (item.time === categoryTime) {
            return { ...item, amount: totalPrices };
          }
          return item;
        });
      });
    }
    if (value === 4) {
      setDataMonth((prev) => {
        return prev.map((item) => {
          if (item.time === categoryTime) {
            return { ...item, amount: totalPrices };
          }
          return item;
        });
      });
    }
  }

  const fetchQuantityOrderTourCompleteInTimeSlot = async () => {
    if (value === 1) {
      try {
        const response = await getQuantityOrderTourCompleteTodayByTimePeriod(accessToken);
        if (response) {
          response.data.forEach((item) => {
            updateData(item[0], item[2]);
          })
        }
      }
      catch (error) {
        console.error(error)
      }
    }
    if (value === 2) {
      try {
        const response = await getQuantityOrderTourCompleteThisWeekByDayOfWeek(accessToken);
        if (response) {
          response.data.forEach((item) => {
            updateData(item[0], item[2]);
          })
        }
      }
      catch (error) {
        console.error(error)
      }
    }
    if (value === 3) {
      try {
        const response = await getQuantityOrderTourCompleteThisMonthByWeekOfMonth(accessToken);
        if (response) {
          response.data.forEach((item) => {
            updateData(item[0], item[2]);
          })
        }
      }
      catch (error) {
        console.error(error)
      }
    }
    if (value === 4) {
      try {
        const response = await getQuantityOrderTourCompleteThisYearByQuarter(accessToken);
        if (response) {
          response.data.forEach((item) => {
            updateData(item[0], item[2]);
          })
        }
      }
      catch (error) {
        console.error(error)
      }
    }

  }

  useEffect(() => {
    fetchQuantityOrderTourCompleteInTimeSlot();
  }, [value]);

  return (
    <React.Fragment>
      <Title>
        {
          value === 1 ? "Hôm nay" : value === 2 ? "Tuần này" : value === 3 ? "Tháng này" : "Năm nay"
        }
      </Title>
      <ResponsiveContainer>
        <LineChart
          data={value === 1 ? dataHour : value === 2 ? dataDay : value === 3 ? dataWeek : dataMonth}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Doanh thu (₫)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
