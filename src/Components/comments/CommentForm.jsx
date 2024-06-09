import { useState, useRef, useEffect } from "react";
import { Button, FormControl, TextField, Box, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import POSTCommentAPI from "../../API/APIendpointComment";
import POSTReplyAPI from "../../API/APIendpointReply";
import GETBarberCommentsAPI from "../../API/APIendpointBarberComments";
import GETCommentResponseAPI from "../../API/APIendpointCommentResponse";

const CommentForm = ({
  isComment,
  barberId,
  commentId,
  setReplies,
  setComments,
}) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(1);
  const [isReplying, setIsReplying] = useState(true);
  const isTextareaDisabled = text.length === 0;
  const [cantReply, setCantReply] = useState(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsReplying(false);
    setCantReply(false);
    if (text.trim() !== "") {
      try {
        if (isComment === false) {
          const input = {
            reply: text,
            commentId: commentId,
          };
          await POSTReplyAPI(input);
        } else {
          const input = {
            comment: text,
            rating: rating,
            barberId: barberId,
          };
          await POSTCommentAPI(input);
        }

        console.log(
          barberId,
          localStorage.getItem("barberId"),
          barberId != localStorage.getItem("barberId")
        );
        if (
          localStorage.getItem("role") != "barber" ||
          barberId != localStorage.getItem("barberId")
        ) {
          const responseData = await GETBarberCommentsAPI(barberId);
          setComments(responseData);
        } else {
          const responseData = await GETCommentResponseAPI(commentId);
          setReplies(responseData);
        }

        setText("");
        setRating(1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target) &&
        text === ""
      ) {
        setIsReplying(false);
        setCantReply(false);
        setRating(1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef, text]);

  return (
    <Box>
      {!isComment &&
        !cantReply && ( // reply part
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
              setCantReply(false);
            }}
          >
            <Typography sx={{ fontSize: 11, pb: 0.3 }}>پاسخ</Typography>
          </Button>
        )}
      {(isComment || isReplying) && (
        <FormControl component="form" onSubmit={handleFormSubmit} ref={formRef}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <TextField
              multiline
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="نظرتو بنویس..."
              sx={{
                width: isComment ? 650 : 700,
                mt: !isComment ? 2 : 0,
                overflow: "auto",
              }}
              inputProps={{
                style: {
                  maxHeight: "200px",
                  overflow: "auto",
                },
              }}
            />
            {isComment && (
              <Rating
                name="rating"
                max={5}
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                sx={{
                  mr: 3.5,
                  mt: 2.5,
                  direction: "ltr",
                }}
              />
            )}
          </Box>
          <Button // submit button
            variant="contained"
            sx={{
              mt: 2,
              pb: 1.1,
              height: 30,
              width: 100,
              backgroundColor: "#668F84",
              color: "white",
              "&:hover": {
                backgroundColor: "#8CB69B",
                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
              },
              transition: "all 0.3s ease", // Smooth transition
            }}
            type="submit"
            disabled={isTextareaDisabled}
          >
            ارسال
          </Button>
        </FormControl>
      )}
    </Box>
  );
};

export default CommentForm;