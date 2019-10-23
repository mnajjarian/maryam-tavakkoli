import { ContentBlock } from "draft-js";

export const getBlockStyle = (block: ContentBlock): string => {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      case "unstyled":
        return "RichEditor-paragraph";
      case "CODE":
        return "RichEditor-blockcode";
      case "STRIKETHROUGH":
        return "RichEditor-strikethrough"
      default:
        return "";
    }
};