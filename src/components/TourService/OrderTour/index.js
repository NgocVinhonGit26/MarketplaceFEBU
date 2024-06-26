import TourLayout from "layouts/CustomerLayout/TourLayout"
import "./style.scss"
import OrderTourTable from "./OrderTourTable"
import OrderTourTotal from "./OrderTourTotal"
import { useState } from "react"



const OrderTour = () => {
    const [totalPrice, setTotalPrice] = useState(0);

    return (
        <div>
            <TourLayout>
                <div className="Container-OrderTour">
                    <div className="OrderTour">
                        <div className="Content-OrderTour">
                            <div className="Table-OrderTour">
                                <OrderTourTable
                                    totalPrice={totalPrice}
                                    setTotalPrice={setTotalPrice}
                                />
                                <OrderTourTotal
                                    totalPrice={totalPrice}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </TourLayout>
        </div>
    )
}

export default OrderTour