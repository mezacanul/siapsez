import React, { useState } from "react";
import "./customForm.css";
import { DownOutlined } from "@ant-design/icons";

const CustomForm = ({ fields, onSubmit, onChange, title, buttonText }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState(
    Array.isArray(fields)
      ? fields.reduce(
          (acc, field) => ({ ...acc, [field.name]: field.defaultValue || "" }),
          {}
        )
      : {}
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    // Validaciones de los valores del formulario
    fields.forEach((field) => {
      const value = formData[field.name] || "";

      if (field.required && !value) {
        newErrors[field.name] = "Este campo es obligatorio.";
      }

      // Validaciones específicas por campo
      if (field.validation) {
        const errorMessage = field.validation(value);
        if (errorMessage) {
          newErrors[field.name] = errorMessage;
        }
      }
    });

    // Si hay errores, no continuar con el envío
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setFormErrors({});
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.error("onSubmit function is not provided");
    }
  };

  const handleInputChange = (event, field) => {
    const { name, value } = event.target;

    // Aplica lógica de upperCase si está activada
    const newValue = field.upperCase ? value.toUpperCase() : value;

    // Limitar la longitud del valor si `maxLength` está definido
    if (field.maxLength && newValue.length > field.maxLength) {
      return; // Ignora la entrada si supera el límite
    }

    if (field.type === "curp") {
      // Lógica para CURP
      const sanitizedValue = newValue.replace(/\s/g, "").toUpperCase();
      if (sanitizedValue.length > 18) {
        return;
      }
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: sanitizedValue };
        if (onChange) {
          onChange(updatedData);
        }
        return updatedData;
      });

      if (sanitizedValue.length !== 18) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "El CURP debe tener exactamente 18 caracteres.",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else if (field.type === "year") {
      // Validación para tipo de dato 'year'
      const yearValue = newValue.replace(/[^0-9]/g, ""); // Acepta solo números
      if (yearValue.length > 4) {
        return; // Evita que se ingresen más de 4 dígitos
      }

      if (yearValue && parseInt(yearValue, 10) < 1900) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "El año debe ser 1900 o mayor.",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }

      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: yearValue };
        if (onChange) {
          onChange(updatedData);
        }
        return updatedData;
      });
    } else if (field.type === "tel") {
      // Lógica para 'tel'
      const numericValue = newValue.replace(/[^0-9]/g, "");
      if (numericValue.length > 10) {
        return;
      }
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: numericValue };
        if (onChange) {
          onChange(updatedData);
        }
        return updatedData;
      });
    } else {
      // Lógica para otros tipos de campo
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: newValue };
        if (onChange) {
          onChange(updatedData);
        }
        return updatedData;
      });
    }
  };

  const handleBlur = (event, field) => {
    if (field.type === "number" && event.target.value < 0) {
      setFormData((prevData) => ({ ...prevData, [event.target.name]: "0" })); // Cambia el valor a 0 si es negativo
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-custom">
      {title && <h5>{title}</h5>}
      <div className="container-custom-form row">
        {fields.map((field, index) =>
          field.type === "divider" ? (
            <div key={index} className="col-12">
              <h5>{field.label}</h5>
              <hr />
            </div>
          ) : (
            <div
              key={index}
              className={`col-sm-12 col-md-${field.colSize || 6} mb-3`}
            >
              <label className="d-block" htmlFor={field.name}>
                {field.label}
                <span>{field.required ? "*" : ""}</span>
              </label>
              {field.type === "select" ? (
                <div className="custom-select-container">
                  <select
                    name={field.name}
                    id={field.name}
                    className={`d-block w-100 ${
                      formErrors[field.name] ? "input-error" : ""
                    } ${field.disabled ? "disabled-form" : ""}`}
                    value={formData[field.name]}
                    onChange={(e) => handleInputChange(e, field)}
                    disabled={field.disabled}
                  >
                    <option value="" disabled hidden>
                      {field.placeholder}
                    </option>
                    {field.options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <DownOutlined className="select-icon" />
                </div>
              ) : field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  id={field.name}
                  className={`d-block w-100 text-area ${
                    formErrors[field.name] ? "input-error" : ""
                  } ${field.disabled ? "disabled-form" : ""}`}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) => handleInputChange(e, field)}
                  disabled={field.disabled}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  min={field.type === "number" ? 0 : null}
                  step={field.decimal ? 0.01 : null}
                  id={field.name}
                  className={`d-block w-100 ${
                    formErrors[field.name] ? "input-error" : ""
                  } ${field.disabled ? "disabled-form" : ""}`}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) => handleInputChange(e, field)}
                  onBlur={(e) => handleBlur(e, field)}
                  disabled={field.disabled}
                />
              )}
              {formErrors[field.name] && (
                <p className="error-text">{formErrors[field.name]}</p>
              )}
            </div>
          )
        )}
      </div>
      {buttonText &&
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-custom-primary">
            {buttonText}
          </button>
        </div>
      }
    </form>
  );
};

export default CustomForm;
