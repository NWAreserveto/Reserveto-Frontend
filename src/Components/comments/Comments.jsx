import { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import GETBarberCommentsAPI from "../../API/APIendpointBarberComments";

const Comments = ({ barberId, barberName, barberPic }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GETBarberCommentsAPI(barberId);
        setComments(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [barberId]);

  comments.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <Box // whole comment section
      sx={{
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 1px 1px green",
        borderRadius: "10px",
      }}
    >
      <Paper
        sx={{
          padding: 3,
          backgroundColor: "var(--primary-color-lighter)",
          borderRadius: "10px",
          mb: 5,
        }}
      >
        <Typography // label
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

        {loading && ( // loading part
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "10vh",
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

        {/* main part */}
        {!loading &&
          comments &&
          comments.map((rootComment, index) => (
            <Comment
              key={rootComment.id}
              comment={rootComment}
              userId={rootComment.reviewer}
              commentId={rootComment.id}
              barberId={barberId}
              barberName={barberName}
              barberPic={barberPic}
            />
          ))}

        <CommentForm // input part
          isComment={true}
          barberId={barberId}
          commentId={null}
          setReplies={null}
          setComments={setComments}
        />
      </Paper>
    </Box>
  );
};

export default Comments;
