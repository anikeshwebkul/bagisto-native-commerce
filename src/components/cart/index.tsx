import CartModal from "./CartModal";

export default function Cart({
  children,
  className,
  onOpen,
  onClose,
  isBottomNavbar,
  isOpen,
}: {
  children?: React.ReactNode;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
  isBottomNavbar?: boolean;
  isOpen?: boolean;
}) {
  return (
    <CartModal className={className} isBottomNavbar={isBottomNavbar} onOpen={onOpen} onClose={onClose} isOpen={isOpen}>
      {children}
    </CartModal>
  );
}
