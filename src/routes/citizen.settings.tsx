import { createFileRoute } from "@tanstack/react-router";
import { useI18n, type Lang } from "@/lib/i18n";
import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/citizen/settings")({
  head: () => ({ meta: [{ title: "Settings · Grama Arivu ERP" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { lang, setLang, t } = useI18n();
  return (
    <AppShell title={t("settings")} back="/citizen">
      <div className="mx-auto max-w-md">
        <Card className="p-5">
          <h3 className="mb-3 font-semibold">{t("language")}</h3>
          <div className="grid grid-cols-2 gap-2">
            {(["ta", "en"] as Lang[]).map((l) => (
              <button
                key={l} onClick={() => setLang(l)}
                className={`rounded-lg border px-4 py-3 font-semibold ${lang === l ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                {l === "ta" ? "தமிழ்" : "English"}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
