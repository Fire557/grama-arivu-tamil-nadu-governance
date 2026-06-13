import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockSchemes } from "@/lib/mock";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Learning Centre · Grama Arivu ERP" },
      { name: "description", content: "Tamil Nadu and Central government schemes — eligibility, benefits, documents and how to apply." },
    ],
  }),
  component: Learning,
});

function Learning() {
  const { lang, t } = useI18n();
  const [tab, setTab] = useState<"state" | "central">("state");
  const list = mockSchemes.filter((s) => s.level === tab);

  return (
    <AppShell title={t("learning_centre")} back="/citizen">
      <div className="mb-4 inline-flex gap-1 rounded-full border bg-card p-1">
        {(["state", "central"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${tab === k ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            {t(k === "state" ? "schemes_state" : "schemes_central")}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((s) => (
          <Card key={s.id} className="p-5">
            <Badge variant="outline" className="mb-2 uppercase">{s.level}</Badge>
            <h3 className="font-display text-lg font-bold">{lang === "ta" ? s.nameTa : s.nameEn}</h3>

            <Section title={t("eligibility")}>{lang === "ta" ? s.eligibilityTa : s.eligibilityEn}</Section>
            <Section title={t("benefits")}>{lang === "ta" ? s.benefitsTa : s.benefitsEn}</Section>

            <Section title={t("required_docs")}>
              <ul className="list-disc pl-5">
                {s.docs.map((d, i) => <li key={i}>{lang === "ta" ? d.ta : d.en}</li>)}
              </ul>
            </Section>

            <Section title={t("apply_steps")}>
              <ol className="list-decimal space-y-1 pl-5">
                {s.steps.map((d, i) => <li key={i}>{lang === "ta" ? d.ta : d.en}</li>)}
              </ol>
            </Section>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => toast.success("Application started (demo)")}>{t("apply_myself")}</Button>
              <Button variant="outline" onClick={() => toast.success("Volunteer notified (demo)")}>{t("request_volunteer")}</Button>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</div>
      <div className="mt-1 text-sm">{children}</div>
    </div>
  );
}
