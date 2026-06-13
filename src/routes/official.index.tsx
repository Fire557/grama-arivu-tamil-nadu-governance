import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockComplaints, mockVillages, mockProjects, departments } from "@/lib/mock";
import { EyeOff, ShieldCheck, MapPinned, ClipboardList } from "lucide-react";

export const Route = createFileRoute("/official/")({
  head: () => ({ meta: [{ title: "Official Dashboard · Grama Arivu ERP" }] }),
  component: OfficialHome,
});

function OfficialHome() {
  const { t } = useI18n();
  const village = mockVillages[0];

  return (
    <AppShell role="official">
      <section className="mb-6 rounded-2xl bg-sidebar p-5 text-sidebar-foreground shadow-card">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-sidebar-accent text-xl font-bold">RS</div>
          <div className="flex-1">
            <div className="font-display text-xl font-bold">R. Selvi</div>
            <div className="text-sm opacity-85">Ward Councillor · Melur Panchayat · Ward 3</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-accent">82</div>
            <div className="text-[10px] uppercase tracking-wider opacity-80">{t("trust_score")}</div>
          </div>
        </div>
      </section>

      <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
        <EyeOff className="h-3.5 w-3.5" /> {t("identity_hidden")}
      </div>

      <section className="grid gap-3 md:grid-cols-2">
        <Card className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t("assigned_to_me")}</h3>
            <Badge variant="outline">{mockComplaints.length}</Badge>
          </div>
          <ul className="space-y-2">
            {mockComplaints.map((c) => {
              const dept = departments.find((d) => d.code === c.department)!;
              return (
                <li key={c.id}>
                  <Link to="/official/complaint/$id" params={{ id: c.id }} className="block rounded-lg border p-3 hover:bg-muted">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{dept.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold">{c.title}</span>
                          <Badge variant={c.status === "escalated" ? "destructive" : "secondary"}>{t(c.status as Parameters<typeof t>[0])}</Badge>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {c.code} · {t("citizen_id")}: {c.citizenCode} · {c.village} · {c.ward}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <MapPinned className="h-4 w-4" /> {t("village_progress")}
          </h3>
          <div className="text-lg font-display font-bold">{village.village}</div>
          <div className="text-xs text-muted-foreground">{village.panchayat}</div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {(["water", "roads", "health", "governance"] as const).map((k) => (
              <div key={k} className="rounded-lg border bg-muted/30 p-2 text-center">
                <div className="text-xl font-bold text-primary">{village[k]}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <div className="text-3xl font-bold text-accent">{village.vai}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("vai")}</div>
          </div>
        </Card>

        <Card className="p-4 md:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <ClipboardList className="h-4 w-4" /> {t("changes_by_me")}
            </h3>
            <Link to="/search"><Button variant="outline" size="sm">{t("search_tn")}</Button></Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {mockProjects.map((p) => (
              <div key={p.id} className="overflow-hidden rounded-lg border">
                <div className="grid grid-cols-2">
                  <div>
                    <img src={p.beforePhoto} alt="before" className="h-24 w-full object-cover" />
                    <div className="bg-muted py-0.5 text-center text-[10px] uppercase tracking-wider text-muted-foreground">{t("before")}</div>
                  </div>
                  <div>
                    <img src={p.afterPhoto} alt="after" className="h-24 w-full object-cover" />
                    <div className="bg-success py-0.5 text-center text-[10px] uppercase tracking-wider text-success-foreground">{t("after")}</div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-sm font-semibold">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.village} · {p.completedAt}</div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/official/upload" className="mt-3 inline-block">
            <Button variant="secondary" size="sm" className="gap-1"><ShieldCheck className="h-4 w-4" /> {t("upload_before_after")}</Button>
          </Link>
        </Card>
      </section>
    </AppShell>
  );
}
