import cssText from "data-text:~contents/styles.css";
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo";
import React, { useState, useEffect, useCallback } from "react";
import * as utils from "~utils";

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"]
};

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(`div[data-testid='UserName'] > div > div`);

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const ProfileNote = () => {
  const [note, setNote] = useState("");
  const [originalNote, setOriginalNote] = useState("");
  const [isPersian, setIsPersian] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [remainingLength, setRemainingLength] = useState(120);
  const username = window.location.toString().split('/').pop();

  useEffect(() => {
    utils.getProfileNote(username).then((value) => {
      if (value !== undefined) {
        setNote(value);
        setOriginalNote(value);
        setIsPersian(utils.isPersian(value));
        setRemainingLength(120 - value.length);
      }
    });
  }, [username]);

  const saveNote = useCallback(async () => {
    if (note.trim() === '')  await utils.deleteProfileNote(username);
    else {
      utils.saveProfileNote(username, note)
    }
    setShowToast(true);
    setOriginalNote(note);
    setTimeout(() => {
      setShowToast(false);
    }, 800);

  }, [note, username]);

  const handleChange = (e) => {
    const newNote = e.target.value;
    setNote(newNote);
    setIsPersian(utils.isPersian(newNote));
    setRemainingLength(120 - newNote.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveNote();
    }
  };

  const isNoteChanged = note !== originalNote;

  return (
    <div className="relative w-full font-[Vazirmatn]">
      <textarea
        className="w-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-3 rounded-md mt-2"
        style={{ direction: isPersian ? "rtl" : "ltr", border: "none" }}
        value={note}
        maxLength={120}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a short note"
      />
      {isNoteChanged && (
        <>
          <button
            className={`mt-2 px-4 pt-1 bg-[#299cee] text-white rounded ${isPersian ? 'mr-auto' : 'ml-auto'} block`}
            onClick={saveNote}
          >
            Save
          </button>
          <div className={`absolute bottom-2 ${isPersian ? 'right-0' : 'left-0'} text-xs px-2 py-1`}>
            {remainingLength}
          </div>
        </>
      )}
      {showToast && (
        <div className={`absolute bottom-2 ${isPersian ? 'left-0' : 'right-0'} text-xs px-2 py-1`}>
          Saved
        </div>
      )}
    </div>
  );
};

export default ProfileNote;
