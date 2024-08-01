import { createContext, useEffect } from "react";
import PropTypes from "prop-types";
import React from "react";

const PreventRightClickContext = createContext(null);

export function PreventRightClickProvider({ children }) {
  useEffect(() => {
    const preventRightClick = (event) => {
      if (event.target.nodeName === "IMG") {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventRightClick);
    return () => {
      document.removeEventListener("contextmenu", preventRightClick);
    };
  }, []);

  return (
    <PreventRightClickContext.Provider value={null}>
      {children}
    </PreventRightClickContext.Provider>
  );
}

PreventRightClickProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
