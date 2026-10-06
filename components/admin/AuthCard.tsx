// Centered card used by the signed-out admin pages (login, setup, verify…).

export const authInputClass =
  "w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500";

export const authButtonClass = "w-full py-2 rounded-md bg-white text-black font-medium disabled:opacity-50";

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-xl p-8 flex flex-col gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">{title}</h1>
          {subtitle && <p className="text-sm text-neutral-400 mt-1">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
