import React, { useState, useEffect, useRef } from "react";
import { Ellipsis } from "lucide-react";

const DropdownMenu = ({ onEdit, onDelete }) => {
  return (
    <div className="dropdown-menu">
      <button
        style={{ fontSize: "1.4rem", border: "none" }}
        onClick={onEdit}>
        Editar
      </button>
      <button
        style={{ fontSize: "1.4rem", border: "none" }}
        onClick={onDelete}>
        Deletar
      </button>
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
        onClick={toggleDropdown}
        style={{
          display: "grid",
          placeContent: "center",
          width: "2rem",
          height: "2rem",
          borderRadius: ".75rem",
        }}>
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
