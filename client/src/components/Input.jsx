import React from "react";

const Input = ({ handleSubmit, hadleChange, input }) => {
  return (
    <>
      <div className="main-text">ТУДУШКА</div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input type="text" value={input} onChange={hadleChange} />
        <button className="addBtn" type="submit">
          ADD
        </button>
      </form>
    </>
  );
};

export default Input;
