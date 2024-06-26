import './style.scss'
import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import CardBlog from './CardBlog';
import TitleSection from '../TitleSection';

const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
}));


const Blog = () => {
    const [listBlog, setListBlog] = React.useState([
        {
            id: 1,
            title: 'Chùm tour ghép miền Tây dịp lễ 2/9/2023 | Từ Cần Thơ và Sài Gòn',
            img: 'https://s3.nucuoimekong.com/ncmk/wp-content/uploads/cover-tour-le-2-9-2048x1152.jpg',
        },
        {
            id: 2,
            title: '1001+ Địa điểm du lịch Việt Nam nổi tiếng nhất (2023)',
            img: 'https://s3.nucuoimekong.com/ncmk/wp-content/uploads/dia-diem-du-lich-viet-nam-avt.jpg',
        },
        {
            id: 3,
            title: 'Phở Hà Nội – Top 16 quán phở gia truyền ngon, nổi tiếng',
            img: 'https://s3.nucuoimekong.com/ncmk/wp-content/uploads/pho-ha-noi-1.jpg',
        },
        {
            id: 4,
            title: 'Bánh mì Hội An | Top 12 quán ăn ngon nức tiếng',
            img: 'https://s3.nucuoimekong.com/ncmk/wp-content/uploads/banh-mi-hoi-an-1.jpg',
        },
        {
            id: 5,
            title: 'Món ngon miền Nam – Top 25+ đặc sản ngon nức tiếng miền Nam',
            img: 'https://s3.nucuoimekong.com/ncmk/wp-content/uploads/mon-ngon-mien-nam.jpg',
        },
        {
            id: 6,
            title: 'Top 40+ quán cà phê đẹp ở Đà Lạt “hút hồn” du khách (2023)',
            img: 'https://s3.nucuoimekong.com/ncmk/wp-content/uploads/quan-ca-phe-dep-o-da-lat-avt.jpg',
        },
        {
            id: 7,
            title: 'Vũng Tàu ăn gì ngon? Top 15+ món ăn bạn phải thử (2023)',
            img: 'https://s3.nucuoimekong.com/ncmk/wp-content/uploads/vung-tau-an-gi-ngon-avt.jpg',
        },
        {
            id: 8,
            title: 'Kiss The Stars Phú Quốc – Show diễn tráng lệ ở Cầu Hôn (2023)',
            img: 'https://s3.nucuoimekong.com/ncmk/wp-content/uploads/kiss-the-stars-phu-quoc-avt.jpg',
        },


    ])

    return (
        <div className="container-blog">
            <div className='blog'>
                <div className="title-blog">
                    <TitleSection title={"BLOGS"} />
                </div>
                <div className="content-blog">
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{ width: '100%' }}
                    >

                        {listBlog.map((item, index) => {
                            return (
                                <Grid xs={3}>
                                    <Item>
                                        <CardBlog item={item} />
                                    </Item>
                                </Grid>
                            )
                        })}

                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default Blog