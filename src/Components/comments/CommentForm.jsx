import { useState } from "react";
import { Button, FormControl, TextField, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import POSTCommentAPI from "../../API/APIendpointComment"
import POSTReplyAPI from "../../API/APIendpointReply"
import GETBarberCommentsAPI from "../../API/APIendpointComments"



const CommentForm = ({
  submitLabel,
  isComment,
  barberId,
  setComments,
  commentId = null
}) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const isTextareaDisabled = text.length === 0;


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      try {
        if (rating === 0) {
          const input = {
            reply : text,
            commentId: commentId
          };
          await POSTReplyAPI(input);
        }
        else {
          const input = {
            comment : text,
            rating: rating,
            barberId: barberId
          };
          await POSTCommentAPI(input);
        }

        const responseData = await GETBarberCommentsAPI(barberId);
        setComments(responseData);

        setText('');
        setRating(0);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRatingChange = (e, newValue) => {
    setRating(parseInt(e.target.value));
  };
  return (
    <FormControl component="form" 
      onSubmit={handleFormSubmit} 
      sx={{ 
        
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
        >
        <TextField 
          multiline
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="نظرتو بنویس..."
          sx={{
            width: {xs: 350, sm: 450, md: 600, lg: 900},
            overflow: 'auto', // Enable scrolling for overflow
          }}
          inputProps={{
            style: {
              maxHeight: '200px', // Set maximum height for the TextField
              overflow: 'auto', // Enable scrolling for overflow
            }
          }}
        />
        {!isComment && <Rating
          dir="rtl"
          name="امتیاز"
          type="number"
          label="امتیاز"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          sx={{
            width: 65,
            mr: 10,
          }}
        />}
      </Box>
      <Button        // submit button
        variant="contained"
        sx={{
          mt: 2,
          pb: 1.1,
          height: 30,
          width: 100,
          backgroundColor: '#8CB69B',
          color: 'white',
          '&:hover': {
            backgroundColor: '#668F84',
          },
        }}
        type="submit"
        disabled={isTextareaDisabled}
      >
        {submitLabel}
      </Button>
    </FormControl>
  );
};

export default CommentForm;