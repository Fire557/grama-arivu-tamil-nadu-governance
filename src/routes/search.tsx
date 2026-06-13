import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockVillages, mockOfficials, mockProjects } from "@/lib/mock";
import { Search as SearchIcon } from "lucide-react";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search Tamil Nadu · Grama Arivu ERP" }] }),
  component: SearchPage,
});

function SearchPage() {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const villages = mockVillages.filter((v) =>
    !q || [v.village, v.panchayat, v.district].some((s) => s.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <AppShell title={t("search_tn")} back="/citizen">
      <div className="relative mb-6">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q} onChange={(e) => setQ(e.target.value)}
          placeholder={t("search_placeholder")}
          className="h-12 pl-10 text-base"
        />
      </div>

      <div className="space-y-6">
        {villages.map((v) => (
          <Card key={v.village} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold">{v.village}</h3>
                <div className="text-sm text-muted-foreground">{v.panchayat} · {v.district}</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{v.vai}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("vai")}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2">
              <ScoreTile label={t("dept_water")} score={v.water} />
              <ScoreTile label={t("dept_roads")} score={v.roads} />
              <ScoreTile label={t("dept_health")} score={v.health} />
              <ScoreTile label="Gov" score={v.governance} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <Badge variant="outline">Open complaints: {v.complaints.open}</Badge>
              <Badge variant="outline">Resolved: {v.complaints.resolved}</Badge>
            </div>
          </Card>
        ))}

        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Officials</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {mockOfficials.map((o) => (
              <Card key={o.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{o.name}</div>
                    <div className="text-xs text-muted-foreground">{o.designation} · {o.panchayat}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{o.trustScore}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("trust_score")}</div>
                  </div>
                </div>
                <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                  <span>Resolved: <b className="text-foreground">{o.resolved}</b></span>
                  <span>Escalations: <b className="text-foreground">{o.escalations}</b></span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Completed projects</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {mockProjects.map((p) => (
              <Card key={p.id} className="overflow-hidden">
                <div className="grid grid-cols-2">
                  <img src={p.beforePhoto} alt={t("before")} className="h-32 w-full object-cover" />
                  <img src={p.afterPhoto} alt={t("after")} className="h-32 w-full object-cover" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">{p.title}</h4>
                  <div className="mt-1 text-xs text-muted-foreground">{p.village} · {p.completedAt}</div>
                  <p className="mt-2 text-sm">{p.impact}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function ScoreTile({ label, score }: { label: string; score: number }) {
  const tone = score >= 75 ? "text-success" : score >= 55 ? "text-warning" : "text-destructive";
  return (
    <div className="rounded-lg border bg-muted/30 p-2 text-center">
      <div className={`text-xl font-bold ${tone}`}>{score}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
