import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [showResult, setShowResult] = useState(false);

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData(""); // Clear previous results if needed
    };

    const onSent = async () => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        // Use input directly for the chat prompt
        const prompt = input; 
        setRecentPrompt(prompt);
        setPrevPrompt((prev) => [...prev, prompt]);

        try {
            const response = await runChat(prompt);
            let responseArray = response.split("**");
            let newResponse = "";

            for (let i = 0; i < responseArray.length; i++) {
                newResponse += (i % 2 === 1) ? `<b>${responseArray[i]}</b>` : responseArray[i];
            }

            // Replace * with </br> for new lines
            let formattedResponse = newResponse.split("*").join("</br>");
            let responseWords = formattedResponse.split(" ");

            responseWords.forEach((word, i) => delayPara(i, word + " "));

        } catch (error) {
            console.error("Error during chat:", error);
            setResultData("An error occurred while fetching the response.");
        } finally {
            setLoading(false);
            setInput(""); // Clear input after sending
        }
    };

    const ContextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    };

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
