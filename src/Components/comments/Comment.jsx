import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import "./style.css";
import { Avatar, Box, Typography } from "@mui/material";
import GETCommentNameAPI from "../../API/APIendpointCommentName"

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  deleteComment,
  addComment,
  parentId = null,
  userId,
  barberName
}) => {

  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GETCommentNameAPI(userId);
        setCustomer(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);


  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    userId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(userId);


  const parsedDate = new Date(comment.created_at).toISOString();
  const milliSeconds = new Date() - new Date(parsedDate);
  const seconds = parseInt(milliSeconds / 1000);
  const minutes = parseInt(seconds / 60);
  const hours = parseInt(minutes / 60);
  const days = parseInt(hours / 24);
  const weeks = parseInt(days / 7);
  const months = parseInt(days / 30);
  const years = parseInt(days / 365);
  const isChild = parentId !== null;

  let time = "";
  if (minutes < 5) time = "لحظاتی قبل";
  else if (hours === 0) time = `${minutes} دقیقه قبل`;
  else if (days === 0) time = `${hours} ساعت قبل`;
  else if (weeks === 0) time = `${days} روز قبل`;
  else if (months === 0) time = `${weeks} هفته قبل`;
  else if (years === 0) time = `${months} ماه قبل`;
  else time = `${years} سال قبل`;

  return (
    <Box
      key={comment.id} // whole comment
      sx={{
        borderRadius: "20px",
        backgroundColor: "#F9F2DE",
        display: "flex",
        mb: "28px",
        padding: 2,
        width: "100%",
      }}
    >
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
            height: { xs: 40, md: 50, lg: 65 },
            width: { xs: 40, md: 50, lg: 65 },
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
          <Box // name of user
            sx={{
              ml: { xs: 1, lg: 2 },
              fontSize: { xs: 18, md: 19, lg: 21 },
              color: "#668F84",
            }}
          >
            {!isChild ? 
            (customer.first_name + ' ' + customer.last_name) :
              barberName}
          </Box>
          <Box // time of comment
            sx={{
              pt: { xs: 0.5, lg: 0.7 },
              fontSize: { xs: 13, md: 14, lg: 15 },
            }}
          >
            {time}
          </Box>
        </Box>

        {isChild && (
          <Typography // comment text
            sx={{
              paddingLeft: 6,
              width: "100%",
              fontSize: { xs: 18, lg: 22 },
              overflowWrap: "break-word", // Add text wrapping
              wordWrap: "break-word", // For older browsers
            }}
          >
            {comment.reply}
          </Typography>
        )}

        {!isChild && (
          <Typography // comment text
            sx={{
              paddingLeft: 8,
              width: "100%",
              fontSize: { xs: 18, lg: 22 },
              overflowWrap: "break-word", // Add text wrapping
              wordWrap: "break-word", // For older browsers
            }}
          >
            {comment.comment}
          </Typography>
        )}

        <Box // comment actions (reply + delete)
          sx={{
            display: "flex",
            fontSize: "12px",
            cursor: "pointer",
            mt: 1,
            color: "rgb(51, 51, 51)",
          }}
        >
          {canReply && !isChild && ( // reply part
            <Box
              sx={{
                mr: "8px",
              }}
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              پاسخ
            </Box>
          )}
          {canDelete && ( // delete part
            <Box
              sx={{
                mr: "8px",
              }}
              onClick={() => deleteComment(comment.id)}
            >
              حذف
            </Box>
          )}
        </Box>

        {isReplying && !isChild && ( // replay form
          <CommentForm
            submitLabel="پاسخ"
            handleSubmit={(text) => addComment(text, userId)}
          />
        )}

        {replies.length > 0 && ( // if there is reply comment:
          <Box
            sx={{
              mt: "20px",
            }}
          >
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                userId={userId}
                barberName={barberName}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Comment;