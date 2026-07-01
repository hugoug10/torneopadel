import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-lime-accent text-ink font-semibold shadow-glow hover:brightness-110',
  outline: 'border-2 border-lime-accent text-lime-accent hover:bg-lime-accent hover:text-ink',
  ghost: 'text-white hover:text-lime-accent',
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  as: Component = 'button',
  ...props
}) {
  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-colors duration-200 sm:px-8 sm:py-4 sm:text-base ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
