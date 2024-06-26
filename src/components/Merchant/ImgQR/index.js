import { getImgqrByIdSB } from "api/user";
import { getImgqrById } from "api/user";
import DashboardLayout from "layouts/DashboardLayout";
import { useEffect, useState } from "react";

export default function ImgQR() {
    const [img, setImg] = useState('')
    const accessToken = localStorage.getItem("accessToken");

    const fetchImgQr = async () => {
        try {
            const response = await getImgqrByIdSB(accessToken)
            setImg(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchImgQr()
    }, [])

    return (
        <DashboardLayout layoutRole={1}>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">

                                    <div style={{ display: 'flex' }}>
                                        <h4 className="card-title">Đóng phí tại đây</h4>
                                        <div
                                            style={{ width: '25px' }}
                                        ><img src="https://res.cloudinary.com/dkcetq9et/image/upload/v1717872873/icons8-arrow-down_zsw7s2.gif" /></div>
                                    </div>
                                    <div className="row" >
                                        <div className="col-12" style={{ display: "flex", justifyContent: 'center' }}>
                                            <img src={img} alt="QR" style={{ height: '500px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}