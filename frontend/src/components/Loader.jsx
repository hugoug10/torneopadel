import { motion } from 'framer-motion';

export default function Loader({ label = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="relative h-14 w-14">
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-court-light/30"
        />
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-lime-accent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
      </div>
      <p className="text-sm text-white/60">{label}</p>
    </div>
  );
}
