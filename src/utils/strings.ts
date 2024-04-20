export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const translateTopicType = (type: string) => {
  switch (type) {
    case "artifices":
      return "artists";
    case "igrejas":
      return "churches";
    case "obras":
      return "paintings";
    default:
      return "";
  }
};

export const translateBackTopicType = (type: string) => {
  switch (type) {
    case "artists":
      return "artifices";
    case "churches":
      return "igrejas";
    case "paintings":
      return "obras";
    default:
      return "";
  }
};
