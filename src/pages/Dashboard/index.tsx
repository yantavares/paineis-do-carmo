import React from "react";
import DataTable from "src/components/DataTable";
import colors from "src/utils/colors";

const index = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: "4% 8%",
        display: "flex",
        flexDirection: "column",
        gap: "5rem",
        fontSize: "1.5rem",
      }}
    >
      <div
        style={{ display: "flex", borderBottom: `1px solid ${colors.gray}` }}
      >
        <h1>Museu Barroco</h1>
      </div>
      <div>
        <DataTable />
      </div>
    </div>
  );
};

export default index;
