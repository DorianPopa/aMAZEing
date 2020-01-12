import React from "react";
import typy from "typy";
import BaseField from "../Base/BaseField";
import "./TextField.scss";

class TextField extends BaseField {
  render() {
    return super.render();
  }

  field = () => {
    const { id, value, placeholder, onBlur, onFocus, onChange, type } = this.props;
    return (
      <div className="field">
        <div className="content">
          <input
            id={id}
            type={type}
            value={typy(value).safeString}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
          />
        </div>
      </div>
    );
  };
}

export default TextField;
