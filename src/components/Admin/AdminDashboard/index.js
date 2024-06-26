import DashboardLayout from "../../../layouts/DashboardLayout";
import TextEditor from "components/Common/TextEditor";
import { useState } from "react";
import parse from "html-react-parser";
import ImageUpload from "components/ImageUpload";

const AdminDashboard = () => {
  const [value, setValue] = useState("");
  return (
    <DashboardLayout layoutRole={0}>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex' }}>
        <div>Hãy cập nhật mã QR tài khoản ngân hàng tại đây </div>
        <div
          style={{ width: '25px' }}
        ><img src="https://res.cloudinary.com/dkcetq9et/image/upload/v1717872873/icons8-arrow-down_zsw7s2.gif" /></div>
      </div>
      <ImageUpload />
    </DashboardLayout>
  );
};

export default AdminDashboard;
