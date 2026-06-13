import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HandHeart, ClipboardCheck, MessageSquarePlus, Search } from "lucide-react";

export const Route = createFileRoute("/volunteer/")({
  head: () => ({ meta: [{ title: "Volunteer Dashboard · Grama Arivu ERP" }] }),
  component: VolunteerHome,
});

function VolunteerHome() {
  const { t } = useI18n();
  return (
    <AppShell role="volunteer">
      <section className="mb-6 rounded-2xl bg-accent p-5 text-accent-foreground shadow-card">
        <div className="text-xs opacity-80">VOL-3K71 · Melur Block</div>
        <h2 className="mt-1 font-display text-2xl font-bold">Volunteer Dashboard</h2>
        <p className="mt-1 text-sm opacity-90">Help citizens, verify completed works.</p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Action
          to="/citizen/complaint/new"
          icon={<MessageSquarePlus />}
          title="Assist a citizen — file complaint"
          desc="Submit a complaint on behalf of a citizen who cannot use the app."
        />
        <Action
          to="/learning"
          icon={<HandHeart />}
          title="Scheme application assistance"
          desc="Help eligible citizens apply for state and central schemes."
        />
        <Action
          to="/official/upload"
          icon={<ClipboardCheck />}
          title="Verify completed work"
          desc="Visit a project site and confirm before/after evidence."
        />
        <Action
          to="/search"
          icon={<Search />}
          title={t("search_tn")}
          desc="Explore village scores, officials and projects."
        />
      </div>

      <Card className="mt-6 p-5">
        <h3 className="mb-2 font-semibold">Community complaints raised</h3>
        <p className="text-sm text-muted-foreground">3 active · 12 resolved in the last 30 days.</p>
        <Link to="/citizen/complaints" className="mt-3 inline-block"><Button variant="outline" size="sm">View list</Button></Link>
      </Card>
    </AppShell>
  );
}

function Action({ to, icon, title, desc }: { to: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link to={to}>
      <Card className="flex h-full items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground">{icon}</div>
        <div>
          <div className="font-display text-lg font-semibold">{title}</div>
          <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
        </div>
      </Card>
    </Link>
  );
}
