import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/official/upload")({
  head: () => ({ meta: [{ title: "Upload Before/After · Grama Arivu ERP" }] }),
  component: UploadPage,
});

function UploadPage() {
  const { t } = useI18n();
  const [before, setBefore] = useState<string | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  return (
    <AppShell title={t("upload_before_after")} back="/official">
      <div className="mx-auto max-w-xl space-y-4">
        <Card className="space-y-4 p-5">
          <div>
            <Label>Project title</Label>
            <Input className="mt-1.5" placeholder="e.g. New community well" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea className="mt-1.5" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <PhotoUpload label={t("before")} value={before} onChange={setBefore} />
            <PhotoUpload label={t("after")} value={after} onChange={setAfter} />
          </div>
          <div>
            <Label>Completion date</Label>
            <Input type="date" className="mt-1.5" />
          </div>
          <div>
            <Label>Impact evidence</Label>
            <Textarea className="mt-1.5" rows={2} placeholder="Households served, hours saved, etc." />
          </div>
        </Card>
        <Button size="lg" className="w-full" onClick={() => toast.success("Project uploaded (demo)")}>{t("submit")}</Button>
      </div>
    </AppShell>
  );
}

function PhotoUpload({ label, value, onChange }: { label: string; value: string | null; onChange: (v: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <label className="mt-1.5 flex h-32 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed text-sm text-muted-foreground hover:border-primary">
        {value ? <img src={value} alt={label} className="h-full w-full object-cover" /> : "Tap to add"}
        <input
          type="file" accept="image/*" capture="environment" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onChange(URL.createObjectURL(f)); }}
        />
      </label>
    </div>
  );
}
