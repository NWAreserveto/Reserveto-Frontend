import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import GradeIcon from "@mui/icons-material/Grade";
import {
  Avatar,
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import GETCommentNameAPI from "../../API/APIendpointCommentName";
import GETCommentResponseAPI from "../../API/APIendpointCommentResponse";
import Reply from "./Reply";

const Comment = ({
  key,
  comment,
  userId,
  commentId,
  barberId,
  barberName,
  barberPic,
  inDashboard,
}) => {
  const [customer, setCustomer] = useState({});
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  const [canReply, setCanReply] = useState(
    localStorage.getItem("role") === "barber" &&
      localStorage.getItem("barberId") == barberId
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerData = await GETCommentNameAPI(userId);
        setCustomer(customerData);
        const replyData = await GETCommentResponseAPI(commentId);
        setReplies(replyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId, commentId]);

  const customerFullName = customer.first_name + " " + customer.last_name;

  let time = "";
  {
    // parse date
    const parsedDate = new Date(comment.created_at).toISOString();
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
        backgroundColor: 'white',
        display: "flex",
        mb: "28px",
        padding: 2,
        width: "100%",
        height: comment.comment,
        boxShadow: "1px 1px 1px var(--secondary-color-lighter)",
      }}
    >
      {loading && ( // loading part
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "5vh",
          }}
        >
          <CircularProgress
            sx={{
              size: 60,
            }}
            color="success"
          />
        </Box>
      )}

      {!loading && (
        <Box // profile picture of user
          sx={{
            mt: -0.3,
            ml: "15px",
          }}
        >
          <Avatar
            src={customer.profile_picture}
            sx={{
              border: "solid 1px white",
              height: 45,
              width: 45,
              mt: -0.5,
              borderRadius: "50%",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          />
        </Box>
      )}

      {!loading && (
        <Box // front of profile picture
          sx={{
            width: "100%",
          }}
        >
          <Box // header of comment (name + time)
            sx={{
              display: "flex",
            }}
          >
            <Typography // name of user
              sx={{
                ml: 1.3,
                fontSize: 16,
                color: "#668F84",
              }}
            >
              {customer.first_name + customer.last_name === ""
                ? customer.user.username
                : customerFullName}
            </Typography>
            <Typography // time of comment
              sx={{
                pt: 0.5,
                fontSize: 10,
              }}
            >
              {time}
            </Typography>
            <GradeIcon
              sx={{
                color: 'green',
                mr: 4,
              }}/>
            <Typography
              sx={{
                color: 'green',
                mt: 0.1,
                mr: 0.4,
              }}>
              {comment.rating}
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
            {comment.comment}
          </Typography>

          {canReply && ( // reply part
            <Button
              sx={{
                height: 25,
                margin: 1,
                fontSize: 10,
                mr: "8px",
                padding: "8px 16px",
                backgroundColor: "#668F84", // Secondary color
                color: "white", // Primary color for text
                borderRadius: "8px",
                textTransform: "none", // Keeps the text as it is, not all uppercase
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                "&:hover": {
                  backgroundColor: "#8CB69B", // Slightly lighter shade on hover
                  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)", // More pronounced shadow on hover
                },
                transition: "all 0.3s ease", // Smooth transition
              }}
              onClick={() => {
                setIsReplying(true);
                setCanReply(false);
              }}
            >
              <Typography sx={{ fontSize: 11, pb: 0.3 }}>پاسخ</Typography>
            </Button>
          )}

          {isReplying && (
            <CommentForm
              isComment={false}
              barberId={barberId}
              commentId={commentId}
              setReplies={setReplies}
              setComments={null}
              inDashboard={false}
            />
          )}

          {replies &&
            replies.length > 0 && ( // if there is reply comment:
              <Box
                sx={{
                  mt: "20px",
                }}
              >
                {replies.map((reply) => (
                  <Reply
                    key={reply.id}
                    reply={reply}
                    barberName={barberName}
                    barberPic={barberPic}
                    inDashboard={inDashboard}
                  />
                ))}
              </Box>
            )}
        </Box>
      )}
    </Box>
  );
};

export default Comment;