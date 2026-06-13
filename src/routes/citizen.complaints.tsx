import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockComplaints, departments } from "@/lib/mock";

export const Route = createFileRoute("/citizen/complaints")({
  head: () => ({ meta: [{ title: "My Complaints · Grama Arivu ERP" }] }),
  component: MyComplaints,
});

const statusTone: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  in_progress: "bg-info text-info-foreground",
  resolved: "bg-success text-success-foreground",
  escalated: "bg-destructive text-destructive-foreground",
};

function MyComplaints() {
  const { t } = useI18n();
  const mine = mockComplaints.filter((c) => c.citizenCode === "CIT-9X42K");
  return (
    <AppShell title={t("my_complaints")} back="/citizen">
      <div className="space-y-3">
        {mine.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">{t("no_complaints")}</p>
        )}
        {mine.map((c) => {
          const dept = departments.find((d) => d.code === c.department)!;
          return (
            <Card key={c.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{dept.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold">{c.title}</h3>
                    <Badge className={statusTone[c.status]}>{t(c.status as Parameters<typeof t>[0])}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>{c.code}</span>
                    <span>·</span>
                    <span>{c.village} · {c.ward}</span>
                    <span>·</span>
                    <span>Level: {c.level}</span>
                  </div>
                  <div className="mt-3 border-t pt-3">
                    <ol className="space-y-1.5 text-xs">
                      {c.timeline.map((ev, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="font-mono text-muted-foreground">{new Date(ev.at).toLocaleDateString()}</span>
                          <span className="font-semibold capitalize">{ev.level}</span>
                          <span className="capitalize text-muted-foreground">— {ev.action}</span>
                          {ev.note && <span className="text-muted-foreground">({ev.note})</span>}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
