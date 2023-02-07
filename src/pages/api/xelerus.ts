// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const xelerus = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      },
    });

    return;
  }
  const prompt = req.body.prompt as String;

  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "The prompt field cannot be empty",
      },
    });
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: [prompt],
      temperature: 0.9,
      max_tokens: 3000,
    });

    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (e) {
    const error = e as any;
    if (error?.response) {
      console.error(error?.response?.status, error?.response?.data);
      res.status(error?.response?.status).json(error?.response?.data);
    } else {
      console.error(`Error with OpenAI API request: ${error?.message}`);
      res
        .status(500)
        .json({ error: { message: "An error occurred during your request" } });
    }
  }
};

export default xelerus;
