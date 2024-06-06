import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

import { Box, Typography, Container, Paper } from "@mui/material";

import GETCommentsAPI from "../../API/APIendpointComments"

const Comments = ({ barberId, barberName }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GETCommentsAPI();
        setComments(responseData);
    
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (!comments.length) {
    fetchData();
    }
    else {
    }

  }, [comments]);



  const rootComments = comments
  .filter(
    (comment) => barberId === comment.recipient_barber
  ).sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const [activeComment, setActiveComment] = useState(null);


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

        {rootComments.map((rootComment, index) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            userId={rootComment.reviewer}
            barberName={barberName}
            commentId={rootComment.id}
            barberId={barberId}
            setComments={setComments}
          />
        ))}
        <Box
          sx={{
            marginTop: 4,
            textAlign: "center",
            fontWeight: "bold",
          }}
        ></Box>
        <CommentForm 
          submitLabel="ارسال"
          isComment={false}
          barberId={barberId}
          setComments={setComments}
          />
      </Paper>
    </Container>
  );
};

export default Comments;