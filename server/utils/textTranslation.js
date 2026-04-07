import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.TRANSLATE_API_KEY;
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

const textTranslator = async (text, targetLanguage) => {
  const response = await fetch( `${API_URL}?key=${API_KEY}`,{
   			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				q: text,
				target: targetLanguage,
			}),
    }
  );
  const data = await response.json();
  return data.data.translations[0].translatedText;
};
export default textTranslator;