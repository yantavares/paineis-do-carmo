import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import Autosuggest, {
  ChangeEvent as AutosuggestChangeEvent,
  SuggestionSelectedEventData,
} from "react-autosuggest";
import { Container } from "./styles";

interface Tag {
  id: string;
  name: string;
}

interface TagInputProps {
  allTags: Tag[];
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ allTags, selectedTags, onTagsChange }) => {
  const [tag, setTag] = useState<string>("");
  const [localSuggestions, setLocalSuggestions] = useState<Tag[]>([]);

  const getSuggestions = (value: string): Tag[] => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : allTags.filter((tag) => tag.name.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const getSuggestionValue = (suggestion: Tag): string => suggestion.name;

  const renderSuggestion = (suggestion: Tag, { isHighlighted }: { isHighlighted: boolean }) => (
    <div className={`suggestion-item ${isHighlighted ? "suggestion-item--highlighted" : ""}`}>
      {suggestion.name}
    </div>
  );

  const onChange = (e: AutosuggestChangeEvent, { newValue }: { newValue: string }) => {
    setTag(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setLocalSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setLocalSuggestions([]);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tag.trim()) {
      const matchingTag = allTags.find((t) => t.name.toLowerCase() === tag.trim().toLowerCase());
      if (matchingTag) {
        addTag(matchingTag);
      } else {
        addTag({ id: "", name: tag.trim() }); // Use a temporary id if tag is not in the list
      }
    }
  };

  const addTag = (newTag: Tag) => {
    if (!selectedTags.some((tag) => tag.name === newTag.name)) {
      const updatedTags = [...selectedTags, newTag];
      onTagsChange(updatedTags);
    }
    setTag("");
  };

  const onSuggestionSelected = (
    event: React.FormEvent,
    { suggestion }: SuggestionSelectedEventData<Tag>
  ) => {
    addTag(suggestion);
  };

  const inputProps = {
    placeholder: "Digite uma tag e pressione Enter",
    value: tag,
    onChange,
    onKeyPress: handleKeyPress,
  };

  return (
    <Container>
      <div className="suggestions-container">
        <Autosuggest
          suggestions={localSuggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={onSuggestionSelected}
          theme={{
            suggestionsContainer: "suggestions-list",
          }}
        />
        <ul className="selected-tags-list">
          {selectedTags.map((tag, index) => (
            <li key={index}>{tag.name}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default TagInput;
