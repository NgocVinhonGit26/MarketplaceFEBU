import './style.scss'
import TitleSection from '../TitleSection'
import CardReview from 'components/Market/Homepage/Review/CardReview'

const Review = () => {
    return (
        <div className="container-review">
            <div className="title-review">
                <TitleSection title={"NHẬN XÉT KHÁCH HÀNG"} />
            </div>
            <div className='card-review'>
                <CardReview />
                <CardReview />
                <CardReview />
                <CardReview />
            </div>
        </div>
    )
}

export default Review