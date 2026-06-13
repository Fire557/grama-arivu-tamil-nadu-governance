import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/card";
import { departments } from "@/lib/mock";
import { FileText, BookOpen, Search, Settings, Plus } from "lucide-react";

export const Route = createFileRoute("/citizen/")({
  head: () => ({ meta: [{ title: "Citizen Dashboard · Grama Arivu ERP" }] }),
  component: CitizenHome,
});

function CitizenHome() {
  const { t } = useI18n();
  return (
    <AppShell role="citizen">
      <section className="mb-6">
        <div className="rounded-2xl bg-primary p-5 text-primary-foreground shadow-card">
          <div className="text-xs opacity-80">CIT-9X42K · Melur · Ward 3</div>
          <h2 className="mt-1 font-display text-2xl font-bold">{t("dashboard")}</h2>
          <p className="mt-1 text-sm opacity-90">{t("file_complaint")}</p>
          <Link
            to="/citizen/complaint/new"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> {t("file_complaint")}
          </Link>
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("department")}
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {departments.map((d) => (
            <Link
              key={d.code}
              to="/citizen/complaint/new"
              search={{ dept: d.code }}
              className="block"
            >
              <Card className="flex h-full flex-col items-center gap-2 p-4 text-center transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
                <div className="text-3xl">{d.icon}</div>
                <div className="text-sm font-semibold leading-tight">
                  {t(d.labelKey as Parameters<typeof t>[0])}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Tools
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Tile to="/citizen/complaints" icon={<FileText />} label={t("my_complaints")} />
          <Tile to="/learning" icon={<BookOpen />} label={t("learning_centre")} />
          <Tile to="/search" icon={<Search />} label={t("search_tn")} />
          <Tile to="/citizen/settings" icon={<Settings />} label={t("settings")} />
        </div>
      </section>
    </AppShell>
  );
}

function Tile({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link to={to} className="block">
      <Card className="flex h-full flex-col items-center gap-2 p-4 text-center transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary/10 text-secondary">{icon}</div>
        <div className="text-sm font-semibold">{label}</div>
      </Card>
    </Link>
  );
}
