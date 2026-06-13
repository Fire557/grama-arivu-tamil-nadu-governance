import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useI18n } from "@/lib/i18n";
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
  const { t } = useI18n();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const sendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      toast.error("Enter a valid 10-digit Indian mobile number");
      return;
    }
    setStep("otp");
    toast.success("OTP sent: 123456 (demo)");
  };

  const verify = () => {
    if (otp !== "123456") {
      toast.error("Wrong OTP. Demo OTP is 123456");
      return;
    }
    toast.success("Welcome!");
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
              {step === "phone" ? t("phone_number") : t("enter_otp")}
            </p>
          </div>

          {step === "phone" ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">{t("phone_number")}</Label>
                <div className="mt-1.5 flex gap-2">
                  <div className="grid w-14 place-items-center rounded-md border bg-muted text-sm font-medium">+91</div>
                  <Input
                    id="phone" inputMode="numeric" maxLength={10}
                    placeholder="98xxxxxxxx"
                    value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="text-lg"
                  />
                </div>
              </div>
              <Button onClick={sendOtp} size="lg" className="w-full text-base">{t("send_otp")}</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="otp">{t("enter_otp")}</Label>
                <Input
                  id="otp" inputMode="numeric" maxLength={6}
                  placeholder="123456"
                  value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="mt-1.5 text-center text-2xl tracking-[0.5em]"
                />
                <p className="mt-2 text-xs text-muted-foreground">Demo OTP: <b>123456</b></p>
              </div>
              <Button onClick={verify} size="lg" className="w-full text-base">{t("verify")}</Button>
              <Button onClick={() => setStep("phone")} variant="ghost" className="w-full">{t("back")}</Button>
            </div>
          )}
        </Card>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Backend & real OTP will be wired with Lovable Cloud in phase 2.
        </p>
      </div>
    </AppShell>
  );
}
