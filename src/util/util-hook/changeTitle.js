import { useEffect } from "react";

export const changeTitle = (title, subtitle) => {
  useEffect(() => {
    document.title = `${title}${subtitle ? ` - ${subtitle}` : ""}`;
  }, [title, subtitle]);
};
