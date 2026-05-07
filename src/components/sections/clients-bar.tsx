import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { BlurFade } from "@/components/ui/blur-fade";
import { clients } from "@/data/clients";

export function ClientsBar() {
  const items = clients.map((client) => ({
    id: client.name,
    content: (
      <div className="flex h-12 items-center justify-center rounded-lg border border-card-border bg-card/50 px-8">
        <span className="whitespace-nowrap font-mono text-sm text-muted">
          {client.logo}
        </span>
      </div>
    ),
  }));

  return (
    <section className="py-16">
      <BlurFade>
        <p className="mb-8 text-center text-sm uppercase tracking-widest text-muted">
          Trusted by innovative teams
        </p>
      </BlurFade>
      <InfiniteMovingCards items={items} speed="slow" />
    </section>
  );
}
