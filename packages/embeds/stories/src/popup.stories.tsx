import { Popup, open, toggle } from "@typebot.io/react";
import { leadGenerationTypebot } from "./assets/leadGenerationTypebot";

export const Default = () => {
  return (
    <>
      <button onClick={open}>Open modal</button>
      <button onClick={toggle}>Toggle modal</button>
      <Popup
        typebot={leadGenerationTypebot}
        apiHost="http://localhost:9011"
        autoShowDelay={9010}
        theme={{
          width: "800px",
        }}
        isPreview
      />
    </>
  );
};
