export default function StatusMessage({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 border border-dashed border-line">
      <p className="font-serif text-lg text-ink mb-1">{title}</p>
      {description && (
        <p className="text-sm text-ink-dim max-w-xs mb-4">{description}</p>
      )}
      {action}
    </div>
  );
}
