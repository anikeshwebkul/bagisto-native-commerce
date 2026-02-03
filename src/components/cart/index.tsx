import CartModal from "./CartModal";

export default function Cart({
  children,
  className,
  onClick,
  onClose,
  isBottomNavbar,
  isOpen,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onClose?: () => void;
  isBottomNavbar?: boolean;
  isOpen?: boolean;
}) {
  return (
    <CartModal
      className={className}
      isBottomNavbar={isBottomNavbar}
      onClick={onClick}
      onClose={onClose}
      isOpen={isOpen}
    >
      {children}
    </CartModal>
  );
}
