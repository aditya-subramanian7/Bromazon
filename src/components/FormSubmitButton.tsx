"use client";

import { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button className={className} type="submit" disabled={pending} {...props}>
      {pending && (
        <>
          <span className="loading loading-spinner loading-sm"></span>
        </>
      )}
      {children}
    </button>
  );
}
