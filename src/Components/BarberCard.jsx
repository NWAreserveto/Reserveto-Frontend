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
import { purple, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { hover } from "@testing-library/user-event/dist/hover";
import { Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";

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
        sx={{ flexDirection: "row", justifyContent: "space-between" }}
        avatar={
          <Avatar
            sx={{
              bgcolor: purple[500],
              marginLeft: "5px",
            }}
            aria-label="recipe"
          >
            K
          </Avatar>
        }
        title="کوشا لاهوتی"
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

        <Typography paragraph></Typography>
        <Tooltip title="امتیاز">
          <StarIcon
            sx={{ color: "rgba(220, 203, 21, 0.5)", marginRight: "11.5rem" }}
          />
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph></Typography>
          <Typography paragraph></Typography>
          <Typography></Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
