import { useEffect, useRef, type ReactNode } from "react";
import { FaTimes } from "react-icons/fa";
import IconButton from "./IconButton";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
};

export default function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="rounded-md p-0 text-text backdrop:bg-black/40 open:flex m-auto w-full max-w-md"
    >
      <div className="bg-surface flex w-full flex-col rounded-md">
        <div className="border-secondary flex items-center justify-between border-b p-3">
          <h2 className="text-primary text-lg font-semibold">{title}</h2>
          <IconButton
            aria-label="Close"
            icon={<FaTimes />}
            onClick={onClose}
            className="hover:bg-secondary"
          />
        </div>
        <div className="p-4">{children}</div>
      </div>
    </dialog>
  );
}
