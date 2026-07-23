import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-24 text-center">
      <div className="stamp mx-auto inline-block text-blood-bright">
        Record not found
      </div>
      <h1 className="royal-heading mt-6 text-3xl">
        No such file in the archive
      </h1>
      <p className="mt-3 text-sm text-muted">
        The requested record does not exist aboard the Black Whale, or was never
        filed. Check the registry or return to the Command Center.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block border border-gold-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-gold hover:text-gold-bright"
      >
        ← Command Center
      </Link>
    </div>
  );
}
