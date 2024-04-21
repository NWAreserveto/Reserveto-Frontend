import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper and SwiperSlide components
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation } from "swiper/modules";
import Sample_1 from '../images/Sample_1.jpg';
import Sample_2 from '../images/Sample_2.jpg';
import Sample_3 from '../images/Sample_3.jpg';
import Sample_4 from '../images/Sample_4.jpg';
import Sample_5 from '../images/Sample_5.jpg';
import Sample_6 from '../images/Sample_2.jpg'; // Duplicate?
import Sample_7 from '../images/Sample_4.jpg'; // Duplicate?
import Sample_8 from '../images/Sample_5.jpg'; // Duplicate?
import { CardMedia } from "@material-ui/core";

const Samples = () => {
  const itemData = [ 
    { img: Sample_1 },
    { img: Sample_2 },
    { img: Sample_3 },
    { img: Sample_4 },
    { img: Sample_5 },
    { img: Sample_6 },
    { img: Sample_7 },
    { img: Sample_8 },
  ];

  return (
    <Box 
      sx={{
        margin: 'auto',
        width: '100%',
      }}
    >
      <Box 
        sx={{
          width: '1000px',
          margin: 'auto',
          padding: '2rem 0rem',
        }}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
            width: '100%',
            height: '100%',
            position: 'relative', 
          }}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={3.7}
            spaceBetween={0}
            navigation
            pagination
          >
            {itemData.map((item, index) => (
              <SwiperSlide 
                key={index}>
                <CardMedia 
                  component={'img'} 
                  style={{
                    height: 230,
                    width: 230,
                    borderRadius: 20,
                  }}
                  image={item.img}
                  />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
};

export default Samples;