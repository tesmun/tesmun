import { youtubeId } from "@/lib/utils";

export default function YouTubeEmbed({
  url,
  title,
}: {
  url?: string;
  title: string;
}) {
  const id = youtubeId(url);

  if (!id) {
    return (
      <div className="flex aspect-video w-full items-center justify-center border border-navy/15 bg-navy-deep text-center">
        <div>
          <p className="font-display text-xl font-medium text-warm">Video forthcoming</p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-silver">YouTube URL will embed automatically</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden bg-navy-deep">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </div>
  );
}
