import { useContext } from "react";
import { PreventRightClickContext } from "./PreventRightClickContext";

export const usePreventRightClick = () => useContext(PreventRightClickContext);
