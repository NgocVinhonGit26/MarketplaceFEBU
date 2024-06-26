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
            title: 'Kinh nghiệm du lịch Kiên Giang - Top 13 điểm đến hấp dẫn (2024)',
            img: 'https://res.cloudinary.com/dkcetq9et/image/upload/v1715280525/du-lich-kien-giang_ttbz7i.jpg',
        },
        {
            id: 2,
            title: 'Chợ nổi Cái Răng Cần Thơ – Đặc sản sông nước miền Tây (2024)',
            img: 'https://res.cloudinary.com/dkcetq9et/image/upload/v1715280543/nguoi-dan-cho-noi-moi-mua-trai-cay-1_jnuiq9.jpg',
        },
        {
            id: 3,
            title: 'Vườn quốc gia Côn Đảo - Kinh nghiệm khám phá từ A đến Z',
            img: 'https://res.cloudinary.com/dkcetq9et/image/upload/v1715280578/vuon-quoc-gia-con-dao-cover_mz1xvs.png',
        },
        {
            id: 4,
            title: 'Bánh mì Hội An | Top 12 quán ăn ngon nức tiếng',
            img: 'https://res.cloudinary.com/dkcetq9et/image/upload/v1715280627/banh-mi-hoi-an-1_tl1p8n.jpg',
        },
        {
            id: 5,
            title: 'Món ngon miền Nam – Top 25+ đặc sản ngon nức tiếng miền Nam',
            img: 'https://res.cloudinary.com/dkcetq9et/image/upload/v1715280657/mon-ngon-mien-nam_mrjac4.jpg',
        },
        {
            id: 6,
            title: 'Đặc sản Bến Tre - Top 11 Đặc sản xứ dừa ngon ngất ngây (2024)',
            img: 'https://res.cloudinary.com/dkcetq9et/image/upload/v1715280680/dac-san-ben-tre-600x338_mx5szw.jpg',
        },
        {
            id: 7,
            title: 'Kinh nghiệm khám phá Mũi Cá Mập Côn Đảo (2024)',
            img: 'https://res.cloudinary.com/dkcetq9et/image/upload/v1715280701/mui-ca-map_llvupi.jpg',
        },
        {
            id: 8,
            title: 'Nhà hàng Côn Đảo - Top 15 nhà hàng với nhiều món ngon hấp dẫn',
            img: 'https://res.cloudinary.com/dkcetq9et/image/upload/v1715280721/nha-hang-con-dao_srvlrj.jpg',
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