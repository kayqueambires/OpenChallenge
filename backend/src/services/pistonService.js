import axios from 'axios';

const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';

export async function runCode({ language, version, code }) {
  try {
    const response = await axios.post(PISTON_API_URL, {
      language,
      version,
      files: [
        {
          name: 'main',
          content: code,
        },
      ],
    });

    return {
      success: true,
      output: response.data.run.output,
    };
  } catch (error) {
    console.error('Error running code with Piston:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}
