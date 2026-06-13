import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Shield, HeartHandshake, Globe } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grama Arivu ERP — Rural Governance Platform" },
      { name: "description", content: "Tamil-first complaint, scheme and governance platform for Tamil Nadu villages." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="bg-grama-hero min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 pb-12 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground font-display text-xl shadow-card">க</div>
            <div>
              <div className="font-display text-lg font-bold leading-tight">{t("app_name")}</div>
              <div className="text-xs text-muted-foreground">Grama Arivu ERP</div>
            </div>
          </div>
          <div className="flex gap-1 rounded-full border bg-card p-1 text-sm">
            {(["ta", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1.5 font-medium transition ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {l === "ta" ? "தமிழ்" : "English"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Globe className="h-3.5 w-3.5" /> Tamil Nadu · 12,524 panchayats
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
            {t("app_name")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            {t("app_tagline")}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("choose_role")}
          </h2>
          <div className="grid gap-4">
            <RoleCard
              to="/auth"
              search={{ role: "citizen" }}
              icon={<Users className="h-7 w-7" />}
              title={t("citizen")}
              desc={t("citizen_desc")}
              tone="primary"
            />
            <RoleCard
              to="/auth"
              search={{ role: "official" }}
              icon={<Shield className="h-7 w-7" />}
              title={t("official")}
              desc={t("official_desc")}
              tone="secondary"
            />
            <RoleCard
              to="/auth"
              search={{ role: "volunteer" }}
              icon={<HeartHandshake className="h-7 w-7" />}
              title={t("volunteer")}
              desc={t("volunteer_desc")}
              tone="accent"
            />
          </div>
        </div>

        <div className="mt-auto pt-10 text-center text-xs text-muted-foreground">
          Aligned with Local SDGs · Panchayat Advancement Index
        </div>
      </div>
    </div>
  );
}

function RoleCard({
  to, search, icon, title, desc, tone,
}: {
  to: string; search: Record<string, string>; icon: React.ReactNode;
  title: string; desc: string; tone: "primary" | "secondary" | "accent";
}) {
  const toneCls = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
  }[tone];
  return (
    <Link to={to} search={search} className="block">
      <Card className="group flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
        <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl ${toneCls} shadow-card`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="font-display text-lg font-semibold">{title}</div>
          <div className="text-sm text-muted-foreground">{desc}</div>
        </div>
        <Button variant="ghost" size="sm" className="opacity-0 transition group-hover:opacity-100">→</Button>
      </Card>
    </Link>
  );
}
