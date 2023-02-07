import { useState } from "react";

import { Grid } from "@mui/material";

import { YourText, XelerusText } from "@/components";

export default function Home() {
  const [oldPrompt, setOldPropmt] = useState("");
  const [questions, setQuestions] = useState<String[]>([]);
  const [awnsers, setAwnsers] = useState<String[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendPrompt = async (prompt: string) => {
    if (prompt.length === 0 || oldPrompt.search(prompt) !== -1) {
      return;
    }

    setQuestions((prev) => [prompt, ...prev]);

    try {
      const response = await fetch("api/xelerus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: oldPrompt + "\n\n" + prompt }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Resquest failed with status ${response.status}`)
        );
      }

      let arr = [] as String[];

      const splitArr = data?.result?.split("\n\n");
      splitArr.map((text: string) => {
        arr = [text, ...arr];
      });

      setAwnsers((prev) => [...arr, ...prev]);
      setOldPropmt((prev) => prev + "\n\n" + prompt + "\n\n" + data.result);
      setLoading(false);
    } catch (e) {
      const error = e as any;
      console.error(error);
      alert("An error ocurred, look at terminal you dumb dumb");
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3} padding={3} height="100vh">
      <Grid item xs={6}>
        <YourText
          loading={loading}
          handleSendPrompt={handleSendPrompt}
          questions={questions}
        />
      </Grid>
      <Grid item xs={6}>
        <XelerusText awnsers={awnsers} />
      </Grid>
    </Grid>
  );
}
