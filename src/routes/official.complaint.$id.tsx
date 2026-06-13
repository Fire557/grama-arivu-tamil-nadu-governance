import { createFileRoute, notFound } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockComplaints, departments } from "@/lib/mock";
import { EyeOff } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/official/complaint/$id")({
  head: () => ({ meta: [{ title: "Complaint · Grama Arivu ERP" }] }),
  component: OfficialComplaint,
});

function OfficialComplaint() {
  const { id } = Route.useParams();
  const c = mockComplaints.find((x) => x.id === id);
  const { t } = useI18n();
  if (!c) throw notFound();
  const dept = departments.find((d) => d.code === c.department)!;
  return (
    <AppShell title={c.code} back="/official">
      <div className="mx-auto max-w-2xl space-y-4">
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <div className="text-3xl">{dept.icon}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold">{c.title}</h2>
                <Badge variant={c.status === "escalated" ? "destructive" : "secondary"}>
                  {t(c.status as Parameters<typeof t>[0])}
                </Badge>
              </div>
              <p className="mt-2 text-sm">{c.description}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3 text-sm">
            <Field label={t("citizen_id")} value={c.citizenCode} />
            <Field label={t("village")} value={c.village} />
            <Field label={t("ward")} value={c.ward} />
            <Field label={t("priority")} value={t(c.priority)} />
          </div>

          <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-warning/15 px-3 py-2 text-xs text-foreground">
            <EyeOff className="h-3.5 w-3.5" /> {t("identity_hidden")} — name, phone, Aadhaar, address not shown.
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Escalation timeline</h3>
          <ol className="relative space-y-3 border-l pl-4">
            {c.timeline.map((ev, i) => (
              <li key={i}>
                <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-primary" />
                <div className="text-sm font-semibold capitalize">{ev.level} — {ev.action}</div>
                <div className="text-xs text-muted-foreground">{new Date(ev.at).toLocaleString()}{ev.note ? ` · ${ev.note}` : ""}</div>
              </li>
            ))}
          </ol>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => toast.success("Marked in progress (demo)")}>Mark {t("in_progress")}</Button>
          <Button variant="secondary" onClick={() => toast.success("Marked resolved (demo)")}>Mark {t("resolved")}</Button>
          <Button variant="outline" onClick={() => toast.success("Escalated (demo)")}>Escalate</Button>
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
