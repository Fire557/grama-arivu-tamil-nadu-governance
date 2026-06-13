import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useI18n } from "@/lib/i18n";
import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { departments, type DeptCode } from "@/lib/mock";
import { Camera, MapPin } from "lucide-react";
import { toast } from "sonner";

const search = z.object({ dept: z.string().optional() });

export const Route = createFileRoute("/citizen/complaint/new")({
  validateSearch: search.parse,
  head: () => ({ meta: [{ title: "File complaint · Grama Arivu ERP" }] }),
  component: NewComplaint,
});

function NewComplaint() {
  const { dept } = Route.useSearch();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [type, setType] = useState<"new" | "repair">("repair");
  const [department, setDepartment] = useState<DeptCode>((dept as DeptCode) ?? "water");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "urgent">("medium");
  const [gps, setGps] = useState<{ lat: number; lng: number } | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const captureGps = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not available");
    navigator.geolocation.getCurrentPosition(
      (p) => { setGps({ lat: p.coords.latitude, lng: p.coords.longitude }); toast.success("Location captured"); },
      () => toast.error("Could not get location"),
    );
  };

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setPhotoUrl(URL.createObjectURL(f));
  };

  const submit = () => {
    if (!title.trim() || !desc.trim()) return toast.error("Add title and description");
    toast.success("Complaint submitted (demo)");
    navigate({ to: "/citizen/complaints" });
  };

  return (
    <AppShell title={t("file_complaint")} back="/citizen">
      <div className="mx-auto max-w-xl space-y-4">
        <Card className="p-5">
          <Label className="mb-2 block">Type</Label>
          <div className="grid grid-cols-2 gap-2">
            {(["new", "repair"] as const).map((k) => (
              <button
                key={k} type="button"
                onClick={() => setType(k)}
                className={`rounded-lg border px-3 py-3 text-sm font-semibold transition ${type === k ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                {t(k === "new" ? "new_infra" : "repair_infra")}
              </button>
            ))}
          </div>
        </Card>

        <Card className="space-y-4 p-5">
          <div>
            <Label htmlFor="title">{t("description")}</Label>
            <Input id="title" placeholder="Hand pump not working..." value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="desc">Details</Label>
            <Textarea id="desc" rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} className="mt-1.5" />
          </div>

          <div>
            <Label>{t("department")}</Label>
            <Select value={department} onValueChange={(v) => setDepartment(v as DeptCode)}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d.code} value={d.code}>{d.icon} {t(d.labelKey as Parameters<typeof t>[0])}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>{t("priority")}</Label>
            <div className="mt-1.5 grid grid-cols-4 gap-2">
              {(["low", "medium", "high", "urgent"] as const).map((p) => (
                <button
                  key={p} type="button"
                  onClick={() => setPriority(p)}
                  className={`rounded-md border px-2 py-2 text-xs font-semibold capitalize ${priority === p ? "border-accent bg-accent text-accent-foreground" : "hover:bg-muted"}`}
                >
                  {t(p)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>{t("photo")}</Label>
            <label className="mt-1.5 flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed py-6 text-sm text-muted-foreground hover:border-primary hover:text-foreground">
              <Camera className="h-5 w-5" />
              {photoUrl ? "Change photo" : "Tap to add a photo"}
              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={onPhoto} />
            </label>
            {photoUrl && <img src={photoUrl} alt="" className="mt-3 max-h-56 w-full rounded-lg object-cover" />}
          </div>

          <div>
            <Label>{t("location")}</Label>
            <Button type="button" variant="outline" onClick={captureGps} className="mt-1.5 w-full justify-center gap-2">
              <MapPin className="h-4 w-4" />
              {gps ? `${gps.lat.toFixed(4)}, ${gps.lng.toFixed(4)}` : t("capture_gps")}
            </Button>
          </div>
        </Card>

        <Button size="lg" className="w-full text-base" onClick={submit}>{t("submit")}</Button>
      </div>
    </AppShell>
  );
}
