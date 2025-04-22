import { useEffect, useRef, useState } from "react";

const useDropdown = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("oder");

  const dropdownRef = useRef(null);

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelected(option);
    if (onSelect) {
      onSelect(option);
    }
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && !dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return {
    open,
    selected,
    toggleOpen,
    handleSelect,
    dropdownRef,
  };
};

export default useDropdown;
