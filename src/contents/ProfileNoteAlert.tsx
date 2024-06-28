import cssText from "data-text:~contents/styles.css";
import type { PlasmoCSConfig, PlasmoGetInlineAnchorList } from "plasmo";
import React, { useState, useEffect, useCallback } from "react";
import * as utils from "~utils";

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"]
};

export const getInlineAnchorList: PlasmoGetInlineAnchorList = () =>
  document.querySelectorAll(`div[data-testid="User-Name"]`);

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const truncateString = (str = '', maxLength = 50) =>
  str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;

const ProfileNoteAlert = ({anchor}) => {
  const [note, setNote] = useState("");
  const [isPersian, setIsPersian] = useState(false);

  const username = anchor.element.querySelector('div[data-testid="User-Name"] > div:nth-child(2) > div > div').textContent.replace("@","");

  useEffect(() => {
    utils.getProfileNote(username).then((value) => {
      if (typeof value === 'string' && value.trim() !== ''){
        setNote(value);
        setIsPersian(utils.isPersian(value))      
      }          
    });
  }, [anchor]);


  return (
    <span title={note} style={{ direction: isPersian ? "rtl" : "ltr", border: "none" }} className="font-bold text-sm">
      {truncateString(note, 50)}
    </span>
  );
};

export default ProfileNoteAlert;
