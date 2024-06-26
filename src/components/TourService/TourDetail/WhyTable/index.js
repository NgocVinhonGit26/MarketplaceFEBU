import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function WhyTable() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="card text-white  mb-3" style={{ maxWidth: "100%" }}>
      <div
        className="card-header"
        style={{
          backgroundColor: "#67A448",
          display: "flex",
          justifyContent: "center",
          fontSize: "1.3rem",
          fontWeight: "600",
        }}
      >
        Vì sao chọn Nụ cười cá chép
      </div>
      <div
        className="card-body text-black"
        style={{ backgroundColor: "#F7F7F7" }}
      >
        <div>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                1.Top công ty lữ hành nổi bật
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Năm 2019, Nụ cười Mê Kông được trao chứng nhận “Trip Advisor
                2019 Certificate of Excellence”.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                2.Bạn đồng hành đáng tin cậy
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Làm việc với phương châm luôn đặt mình vào vị trí khách hàng để
                lắng nghe và thấu hiểu từ những điều nhỏ nhất.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                3.Sản phẩm đa dạng chất lượng
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Ngoài các tour du lịch thông thường, chúng tôi còn hỗ trợ tổ
                chức các sự kiện, hoạt động teambuilding, du lịch hội thảo
                (MICE).
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                4.Luôn có mức giá tốt nhất
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Bất kể ngày thường hay mùa lễ Tết, Nụ cười Mê Kông luôn có mức
                giá tốt nhất với chất lượng dịch vụ không đổi.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5bh-content"
              id="panel5bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                5.Chương trình ưu đãi hấp dẫn
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Công ty thường xuyên ra mắt các gói ưu đãi, chương trình khuyến
                mãi, gia tăng tối đa quyền lợi dành cho khách hàng.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel6bh-content"
              id="panel6bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                6.Đội ngũ chuyên nghiệp
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nụ cười Mê Kông sở hữu đội ngũ lãnh đạo, nhân viên và hướng dẫn
                viên giỏi, thân thiện và tận tâm với công việc.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
