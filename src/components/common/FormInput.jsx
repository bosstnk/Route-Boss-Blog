import { inputClassName } from "./formInputStyles";

export default function FormInput({
  label,
  name,
  error,
  id = name,
  rightSlot,
  className = "",
  ...inputProps
}) {
  return (
    <div className="flex flex-col gap-1 text-body-1 text-base-brown-400">
      {label && <label htmlFor={id}>{label}</label>}

      {rightSlot ? (
        <div className={`flex flex-row ${inputClassName(!!error, className)}`}>
          <input
            id={id}
            name={name}
            className="grow outline-none placeholder:text-base-brown-400"
            {...inputProps}
          />
          {rightSlot}
        </div>
      ) : (
        <input
          id={id}
          name={name}
          className={inputClassName(!!error, className)}
          {...inputProps}
        />
      )}

      {error && <div className="text-body-3 text-brand-red">{error}</div>}
    </div>
  );
}
