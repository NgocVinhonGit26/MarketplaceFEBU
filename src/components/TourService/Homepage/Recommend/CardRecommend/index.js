import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import './style.scss'

export default function CardRecommend(props) {
    const { itemRecommend } = props
    return (
        <Box
            component="ul"
            sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
            className="card-recommend "
        >
            <Card
                component="li"
                sx={{ minWidth: 200, flexGrow: 1, }}
                className='card-recommend-item '
            >
                <CardCover className='img-recommend'>
                    <img
                        src={itemRecommend.img}
                        loading="lazy"
                        alt=""
                    />

                    {/* <div className='bg-image hover-zoom'>
                        <img src='https://mdbootstrap.com/img/new/standard/city/053.webp'  />
                    </div> */}
                </CardCover>
                <CardContent>
                    <Typography
                        level="body-lg"
                        fontWeight="lg"
                        textColor="#fff"
                        mt={{ xs: 12, sm: 36 }}
                    >
                        {itemRecommend.adress}
                    </Typography>
                    <Typography
                        level="inherit"
                        textColor="#fff"
                        mt={{ xs: 12, sm: 0 }}
                    >
                        Đã có {itemRecommend.liked} lượt thích
                    </Typography>
                </CardContent>
            </Card>
            {/* <Card component="li" sx={{ minWidth: 200, flexGrow: 1 }}>
                <CardCover>
                    <video
                        autoPlay
                        loop
                        muted
                        poster="https://s3.nucuoimekong.com/ncmk/wp-content/uploads/tour-con-dao-2-ngay-1-dem-tu-can-tho-768x432.jpg"
                    >
                        <source
                            src="https://share.vidyard.com/watch/RY2YBqBx3vjBDN871G4P6Y?"
                            type="video/mp4"
                        />

                    </video>
                </CardCover>
                <CardContent>
                    <Typography
                        level="body-lg"
                        fontWeight="lg"
                        textColor="#fff"
                        mt={{ xs: 12, sm: 18 }}
                    >
                        Video
                    </Typography>
                </CardContent>
            </Card> */}
        </Box>
    );
}
