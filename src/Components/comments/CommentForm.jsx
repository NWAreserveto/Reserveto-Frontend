import { useState } from "react";
import "./style.css";
import { Button, FormControl, TextareaAutosize } from '@mui/material';

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
      sx={{ width: '100%', marginBottom: '16px' }}>
      <TextareaAutosize
        value={text}
        onChange={(e) => setText(e.target.value)}
        // onSubmit={onSubmit}
        // aria-label="comment-textarea"
        placeholder="نظرتو بنویس..."
        minRows={3}
        sx={{
          width: '100%',
          padding: '8px',
          marginBottom: '8px',
          borderRadius: '4px',
          border: '1px solid rgba(0, 0, 0, 0.23)',
          resize: 'vertical',
          fontFamily: 'inherit',
          fontSize: 'inherit',
        }}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#3F51B5',
          color: 'white',
          '&:hover': {
            backgroundColor: '#303F9F',
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