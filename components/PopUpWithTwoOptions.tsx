import React from "react";
import { MessageWithTwoButtons } from "./ui/MessageWithTwoButtons";
import { usePopUpWithTwoOptionsContext } from "../contexts/PopUpWithTwoOptionsContext";

export function PopUpWithTwoOptions() {
  const { isOpen, text, onCancel, onAccept, cancelText, acceptText } = usePopUpWithTwoOptionsContext();

  if (isOpen) {
    return (
      <MessageWithTwoButtons 
        text={text}
        onCancel={onCancel}
        onAccept={onAccept}
        cancelText={cancelText !== "" ? cancelText : undefined}
        acceptText={acceptText !== "" ? acceptText : undefined}
      />
    );
  }
}
