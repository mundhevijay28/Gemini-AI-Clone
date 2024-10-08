import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, setRecentPrompt } = useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Icon" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => { setInput("Suggest beautiful places to see on an upcoming road trip"); setRecentPrompt("Suggest beautiful places to see on an upcoming road trip"); onSent(); }}>
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="Compass Icon" />
                            </div>
                            <div className="card" onClick={() => { setInput("Briefly summarize this concept: urban planning"); setRecentPrompt("Briefly summarize this concept: urban planning"); onSent(); }}>
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="Light Bulb Icon" />
                            </div>
                            <div className="card" onClick={() => { setInput("Brainstorm team bonding activities for our work retreat"); setRecentPrompt("Brainstorm team bonding activities for our work retreat"); onSent(); }}>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="Message Icon" />
                            </div>
                            <div className="card" onClick={() => { setInput("Improve the readability of the following code"); setRecentPrompt("Improve the readability of the following code"); onSent(); }}>
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="Code Icon" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="User Icon" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="Gemini Icon" />
                            {loading ? (
                                <div className="loader">
                                    <div className="spinner"></div>
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }} />
                            )}
                        </div>
                    </div>
                )}
                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type="text" 
                            placeholder='Enter a prompt here' 
                        />
                        <img src={assets.gallery_icon} alt="Gallery Icon" />
                        <img src={assets.mic_icon} alt="Microphone Icon" />
                        {input && <img onClick={() => { setRecentPrompt(input); onSent(); }} src={assets.send_icon} alt="Send Icon" />}
                    </div>
                    <p className="bottom-info">
                        Gemini may display incorrect info, including about people, so double-check its responses. Your privacy and Gemini Apps.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
