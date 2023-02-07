import React, { useState } from "react";

import { Paper, Typography, Box, TextField, List } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface IYourTextProps {
  loading: boolean;
  handleSendPrompt: (prompt: string) => Promise<void>;
  questions: String[];
}

const YourText: React.FC<IYourTextProps> = ({
  loading,
  questions,
  handleSendPrompt,
}) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    if (value.length === 0) {
      return;
    }

    handleSendPrompt(value);
    setValue("");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ height: "calc(100vh - 165px)", padding: "24px" }}>
        <List sx={{ maxHeight: "100%", overflow: "auto" }}>
          {questions.map((question, index) => (
            <div key={index}>
              {index !== 0 && <div style={{ height: "5px" }} />}
              <Typography>{question}</Typography>
              <div style={{ height: "5px" }} />
            </div>
          ))}
        </List>
      </Paper>
      <div style={{ height: "24px" }} />
      <TextField
        variant="standard"
        fullWidth
        placeholder="Ask anything"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={loading}
      />
      <div style={{ height: "24px" }} />
      <LoadingButton
        sx={{ width: "100%" }}
        loading={loading}
        variant="contained"
        onClick={() => handleClick()}
      >
        submit
      </LoadingButton>
    </Box>
  );
};

export default YourText;
