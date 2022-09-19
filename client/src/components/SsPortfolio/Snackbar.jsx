import { useState, forwardRef, useImperativeHandle } from "react";

export const Snackbar = forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 1000);
    },
  }));
  return (
    <div
      className={
        "fixed left-1/2 top-[1%] -translate-x-1/2 w-96 h-16 rounded-lg flex items-center text-center " +
        (showSnackbar ? "visible " : "hidden ") +
        (props.type === "success"
          ? "bg-tertiary text-black"
          : "bg-secondary text-white")
      }
    >
      <div className="flex-[20%]">
        {props.type === "success" ? (
          <i className="ri-check-fill"></i>
        ) : (
          <i className="ri-close-fill"></i>
        )}
      </div>
      <div className="flex-[80%] text-start font-bold text-lg">
        {props.message}
      </div>
    </div>
  );
});
