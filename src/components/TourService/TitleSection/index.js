import "./style.scss"

const TitleSection = (props) => {

    const { title } = props
    return (
        <div className="container-title-section">
            <div className="header-tour">
                {title}
            </div>
        </div>
    )
}

export default TitleSection