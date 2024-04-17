import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { hover } from "@testing-library/user-event/dist/hover";
import { Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BarbersCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: "7px", width: 300 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title="کوشا لاهوتی"
        // subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://picsum.photos/13"
        // alt="Paella dish"
        IconButton={
          <IconButton aria-label="بعدیی">
            <ArrowForwardIcon />
          </IconButton>
        }
      />
      {/* <Tooltip title="بعدی">
        <IconButton aria-label="بعدیی">
          <ArrowForwardIcon />
        </IconButton>
      </Tooltip> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="لایک">
          <IconButton
            aria-label="add to favorites"
            sx={{ "&:hover": { color: "red" } }}
          >
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="اشتراک">
          <IconButton aria-label="share" sx={{ "&:hover": { color: "blue" } }}>
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>سلام من کوشا هستم</Typography>
          <Typography paragraph>خوشحال میشم از صفحه من بازدید کنید</Typography>
          <Typography paragraph></Typography>
          <Typography paragraph></Typography>
          <Typography></Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
