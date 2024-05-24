import { useState } from "react";
import { Button, FormControl, TextField, Box } from '@mui/material';
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

  const handleRatingChange = (e) => {
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
            width: {xs: 230, sm: 400, md: 500, lg: 600},
            overflow: 'auto', // Enable scrolling for overflow
          }}
          inputProps={{
            style: {
              maxHeight: '200px', // Set maximum height for the TextField
              overflow: 'auto', // Enable scrolling for overflow
            }
          }}
        />
        {!isComment && <TextField
          type="number"
          label="امتیاز"
          inputProps={{ min: 1, max: 5 }}
          value={rating}
          onChange={handleRatingChange}
          fullWidth
          required
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