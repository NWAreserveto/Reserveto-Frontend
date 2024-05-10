import React from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
import { CardMedia } from "@material-ui/core";

const Samples = ({ samples }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          margin: "0 20px",
          backgroundColor: "#e8dbc4",
          borderRadius: 8,
          width: "1260px",
          padding: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: 26,
            padding: 2,
            mt: -2,
            mr: 1,
          }}
        >
          نمونه کار ها
        </Typography>
        <p>جهت رزرو سرویس از دکمه زیر استفاده کنید</p>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Swiper
            modules={[Navigation]}
            slidesPerView={3.7}
            spaceBetween={0}
            navigation
            pagination
          >
            {samples.map((item, index) => (
              <SwiperSlide key={index}>
                <CardMedia
                  component={"img"}
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
