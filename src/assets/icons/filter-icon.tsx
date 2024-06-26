import React from "react";

function FilterIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="filter"
      width="1em"
      height="1em"
      fill={color}
      aria-hidden="true"
    >
      <path d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z"></path>
    </svg>
  );
}

export default FilterIcon;
