export default function PhotoFrame({ caption }: { caption: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-champagne/15 bg-gradient-to-br from-mauvelight via-mauve to-plum">
        <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-rose/20 blur-3xl" />
        <div className="absolute -bottom-10 -right-6 h-44 w-44 rounded-full bg-champagne/15 blur-3xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            className="text-cream/25"
          >
            <path
              d="M36 60C36 60 12 46 12 29C12 20 19 14 27 14C31 14 34.5 16 36 19C37.5 16 41 14 45 14C53 14 60 20 60 29C60 46 36 60 36 60Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
      <p className="text-center text-xs uppercase tracking-[0.2em] text-cream/45">
        {caption}
      </p>
    </div>
  );
}
