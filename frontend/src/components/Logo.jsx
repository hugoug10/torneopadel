export default function Logo({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="16" fill="#0A4D2A" />
      <circle cx="30" cy="30" r="18" fill="#15914F" stroke="#D4F547" strokeWidth="2.5" />
      <circle cx="30" cy="30" r="18" stroke="#0B0F0D" strokeWidth="1.2" strokeDasharray="2.5 4" opacity="0.5" />
      <rect x="27" y="46" width="6" height="12" rx="3" fill="#0B0F0D" />
      <circle cx="46" cy="16" r="6" fill="#D4F547" stroke="#0B0F0D" strokeWidth="1.2" />
    </svg>
  );
}
