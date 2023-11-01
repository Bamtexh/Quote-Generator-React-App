import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import twitter_icon from "../Assets/twitter_icon.png";
import reload_icon from "../Assets/reload_icon.png";
import "./RandomQuote.css";

const RandomQuote = () => {
  let quotes = [];
  async function loadQuotes() {
    const response = await fetch("https://type.fit/api/quotes");
    quotes = await response.json();
  }
    const [rotation, setRotation] = useState(0);
      const handleClick = () => {
    setRotation(rotation + 360);
  };
  const [quote, setQuote] = useState({
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
  });
  const random = () => {
    const select = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(select);
  };
  const twitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${quote.text} - ${
        quote.author.split(",")[0]
      }`
    );
  };

  const copy = async () => {
    await navigator.clipboard
      .writeText(`${quote.text} - ${quote.author}`)
      .then(() => {
        const tooltip = document.createElement("span");
        tooltip.innerText = "copied!";
        tooltip.classList.add("tooltip");
        document.body.appendChild(tooltip);
        setTimeout(() => {
          tooltip.remove();
        }, 1000);
      });
  };

  loadQuotes();

  return (
    <div className="container">
      <div className="quote">{quote.text}</div>
      <div>
        <div className="line"></div>
        <div className="bottom">
          <div className="author">-{quote.author.split(",")[0]}</div>
          <div className="icons">
            <img
              src={reload_icon}
              onClick={() => {
                random();
                handleClick();
              }}
              className="reload"
              alt="reload icon"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
            <img
              src={twitter_icon}
              onClick={() => {
                twitter();
              }}
              className="twitter-icon"
              alt="twitter logo"
            />
            <FontAwesomeIcon
              icon={faCopy}
              className="copy-icon"
              onClick={copy}
              size="2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;
