import type { ButtonHTMLAttributes } from "react";
import "./button.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

function Button({ children, isLoading = false, className, ...rest }: Props) {
  return (
    <button className={`button ${className}`} {...rest}>
      {isLoading ? (
        <div className="button__loader-container">
          <div className="lds-hourglass" />
          <span>Loading...</span>
        </div>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}

export default Button;
