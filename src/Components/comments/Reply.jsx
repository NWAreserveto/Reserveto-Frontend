import { Avatar, Box, Typography } from "@mui/material";

const Reply = ({ reply, barberName, barberPic }) => {
  let time = "";
  {
    // parse date
    const parsedDate = new Date(reply.created_at).toISOString();
    const milliSeconds = new Date() - new Date(parsedDate);
    const seconds = parseInt(milliSeconds / 1000);
    const minutes = parseInt(seconds / 60);
    const hours = parseInt(minutes / 60);
    const days = parseInt(hours / 24);
    const weeks = parseInt(days / 7);
    const months = parseInt(days / 30);
    const years = parseInt(days / 365);

    if (minutes < 5) time = "لحظاتی قبل";
    else if (hours === 0) time = `${minutes} دقیقه قبل`;
    else if (days === 0) time = `${hours} ساعت قبل`;
    else if (weeks === 0) time = `${days} روز قبل`;
    else if (months === 0) time = `${weeks} هفته قبل`;
    else if (years === 0) time = `${months} ماه قبل`;
    else time = `${years} سال قبل`;
  }

  return (
    <Box // whole comment
      sx={{
        borderRadius: "20px",
        backgroundColor: "#F9F2DE",
        display: "flex",
        mb: "28px",
        padding: 2,
        width: "90%",
        height: reply.response,
        boxShadow: "1px 0px 2px 0px  var(--secondary-color-lighter)",
      }}
    >
      <Box // profile picture of user
        sx={{
          mt: -0.3,
          ml: "15px",
        }}
      >
        <Avatar
          src={barberPic}
          sx={{
            border: "solid 1px white",
            height: 45,
            width: 45,
            mt: -0.5,
            // height: { xs: 40, md: 50, lg: 65 },
            // width: { xs: 40, md: 50, lg: 65 },
            borderRadius: "50%",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        />
      </Box>

      <Box // front of profile picture
        sx={{
          width: "100%",
          // backgroundColor: 'red',
        }}
      >
        <Box // header of comment (name + time)
          sx={{
            display: "flex",
          }}
        >
          <Typography // name of user
            sx={{
              // ml: { xs: 1, lg: 2 },
              ml: 1.3,
              fontSize: 16,
              // fontSize: { xs: 18, md: 19, lg: 21 },
              color: "#668F84",
            }}
          >
            {barberName}
          </Typography>
          <Typography // time of comment
            sx={{
              pt: 0.3,
              fontSize: 10,
              // pt: { xs: 0.5, lg: 0.7 },
              // fontSize: { xs: 13, md: 14, lg: 15 },
            }}
          >
            {time}
          </Typography>
        </Box>

        <Typography // comment text
          sx={{
            paddingLeft: 8,
            mt: 1.5,
            mr: -1.5,
            width: "100%",
            fontSize: 16,
            overflowWrap: "break-word", // Add text wrapping
            wordWrap: "break-word", // For older browsers
          }}
        >
          {reply.reply}
        </Typography>
      </Box>
    </Box>
  );
};

export default Reply;