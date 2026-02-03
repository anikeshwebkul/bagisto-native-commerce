import CredentialModal from "./CredentialModal";

export default function UserAccount({
  children,
  className,
  onClick,
  onClose,
  isOpen,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onClose?: () => void;
  isOpen?: boolean;
}) {
  return (
    <CredentialModal className={className} onClick={onClick} onClose={onClose} isOpen={isOpen}>
      {children}
    </CredentialModal>
  );
}
