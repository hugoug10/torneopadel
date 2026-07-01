import { motion, AnimatePresence } from 'framer-motion';

export default function FormInput({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/80">{label}</span>
      <motion.input
        whileFocus={{ scale: 1.01, borderColor: '#D4F547' }}
        className={`w-full rounded-xl border bg-white/5 px-4 py-3.5 text-white placeholder-white/30 outline-none transition-colors focus:bg-white/10 ${
          error ? 'border-red-400/70' : 'border-white/15'
        }`}
        {...props}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs font-medium text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </label>
  );
}
