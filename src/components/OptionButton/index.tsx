import React, { useState, useEffect, useRef } from "react";
import { Ellipsis } from "lucide-react";

const DropdownMenu = ({ onEdit, onDelete }) => {
  return (
    <div className="dropdown-menu">
      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Deletar</button>
    </div>
  );
};

const OptionButton = ({ onEdit, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="option-button"
      ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}>
        <Ellipsis />
      </button>
      {showDropdown && (
        <DropdownMenu
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default OptionButton;
