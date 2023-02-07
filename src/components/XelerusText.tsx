import React from "react";

import { Paper, Typography, Box, List } from "@mui/material";

interface IXelerusProps {
  awnsers: String[];
}

const XelerusText: React.FC<IXelerusProps> = ({ awnsers }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ height: "calc(100vh - 48px)", padding: "24px" }}>
        <List sx={{ maxHeight: "100%", overflow: "auto" }}>
          {awnsers.map((awnser, index) => (
            <div key={index}>
              {index !== 0 && <div style={{ height: "5px" }} />}
              <Typography>{awnser}</Typography>
              <div style={{ height: "5px" }} />
            </div>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default XelerusText;
