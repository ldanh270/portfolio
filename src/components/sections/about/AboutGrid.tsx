export function AboutGrid() {
  const stats = [
    ["5+", "Years Experience"],
    ["30+", "Projects Delivered"],
    ["15+", "Happy Clients"],
    ["3", "Open Source Libs"],
  ] as const;

  return (
    <div className="grid border-b border-brand-border sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(([number, label]) => (
        <div key={label} className="border-r border-brand-border px-6 py-10 sm:px-12">
          <p className="text-5xl font-extrabold tracking-tighter">{number}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-brand-gray">{label}</p>
        </div>
      ))}
    </div>
  );
}
