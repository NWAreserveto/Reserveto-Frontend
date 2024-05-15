import { useState } from "react";
import { Button, FormControl, TextField, TextareaAutosize } from '@mui/material';

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <FormControl component="form" 
      onSubmit={onSubmit} 
      sx={{ 
        
      }}>
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
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </FormControl>
  );
};

export default CommentForm;