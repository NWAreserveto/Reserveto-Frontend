import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

import { Box, Typography, Container, Paper } from "@mui/material";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";

import GETCommentsAPI from "../../API/APIendpointComments"
import GETCommentResponseAPI from "../../API/APIendpointCommentResponse"

const Comments = ({ userId, barberId, barberName }) => {
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GETCommentsAPI();
        setComments(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [comments]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GETCommentResponseAPI();
        setReplies(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [replies]);

  const rootComments = comments
  .filter(
    (comment) => barberId === comment.recipient_barber
  ).sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );



  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);



  const getReplies = (reviewId) =>
    replies
      .filter(
        (reply) =>
          reply.review === reviewId
          // reply.recipient_barber === barberId
      );

  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (
    <Container
      sx={{
        mt: 6,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          padding: 3,
          backgroundColor: "#e8dbc4",
          borderRadius: "10px",
          mb: 5,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            padding: 3,
            mt: -2,
            fontSize: 36,
          }}
        >
          نظرات
        </Typography>

        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            userId={userId}
            barberName={barberName}
          />
        ))}
        <Box
          sx={{
            marginTop: 4,
            textAlign: "center",
            fontWeight: "bold",
          }}
        ></Box>
        <CommentForm submitLabel="ارسال" handleSubmit={addComment} />
      </Paper>
    </Container>
  );
};

export default Comments;