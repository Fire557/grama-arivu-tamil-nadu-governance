import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useI18n, type Lang } from "@/lib/i18n";
import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const search = z.object({
  role: z.enum(["citizen", "official", "volunteer"]).default("citizen"),
});

export const Route = createFileRoute("/auth")({
  validateSearch: search.parse,
  head: () => ({ meta: [{ title: "Login · Grama Arivu ERP" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { role } = Route.useSearch();
  const { lang, setLang, t } = useI18n();
  const [phone, setPhone] = useState("9876543210");
  const [otp, setOtp] = useState("123456");
  const navigate = useNavigate();

  const login = () => {
    toast.success(lang === "ta" ? "வரவேற்கிறோம்!" : "Welcome!");
    navigate({ to: `/${role}` });
  };

  return (
    <AppShell title={t("login")} back="/">
      <div className="mx-auto max-w-md">
        <Card className="p-6">
          <div className="mb-6 text-center">
            <div className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
              {t(role as "citizen" | "official" | "volunteer")}
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold">{t("login")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {lang === "ta" ? "டெமோ உள்நுழைவு — எந்த எண்ணையும் பயன்படுத்தலாம்" : "Demo login — any number works"}
            </p>
          </div>

          <div className="mb-5">
            <Label className="mb-2 block text-center">{t("language")}</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["ta", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`rounded-lg border px-4 py-3 text-base font-semibold transition ${
                    lang === l
                      ? "border-primary bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {l === "ta" ? "தமிழ்" : "English"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">{t("phone_number")}</Label>
              <div className="mt-1.5 flex gap-2">
                <div className="grid w-14 place-items-center rounded-md border bg-muted text-sm font-medium">
                  +91
                </div>
                <Input
                  id="phone"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="98xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="text-lg"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="otp">{t("enter_otp")}</Label>
              <Input
                id="otp"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="mt-1.5 text-center text-2xl tracking-[0.5em]"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                {lang === "ta" ? "டெமோ OTP — எதையும் உள்ளிடலாம்" : "Demo OTP — anything works"}
              </p>
            </div>

            <Button onClick={login} size="lg" className="w-full text-base">
              {t("login")}
            </Button>
          </div>
        </Card>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {lang === "ta"
            ? "முன்னோட்டம் மட்டும் — பின்தளம் இணைக்கப்படவில்லை"
            : "Prototype only — no backend connected"}
        </p>
      </div>
    </AppShell>
  );
}
