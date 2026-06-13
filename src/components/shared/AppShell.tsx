import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { useI18n, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe } from "lucide-react";

interface Props {
  title?: string;
  back?: string;
  children: ReactNode;
  role?: "citizen" | "official" | "volunteer";
}

export function AppShell({ title, back, children, role }: Props) {
  const { lang, setLang, t } = useI18n();
  const toggle = () => setLang((lang === "ta" ? "en" : "ta") as Lang);
  const roleHome = role ? `/${role}` : "/";
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-30 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-4">
          {back ? (
            <Link to={back} className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted">
              <ArrowLeft className="h-4 w-4" /> {t("back")}
            </Link>
          ) : (
            <Link to={roleHome} className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-display text-lg">க</div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">{t("app_name")}</div>
                <div className="text-[11px] text-muted-foreground">GRP</div>
              </div>
            </Link>
          )}
          <div className="flex-1 text-center">
            {title && <h1 className="truncate text-base font-semibold">{title}</h1>}
          </div>
          <Button size="sm" variant="outline" onClick={toggle} className="gap-1">
            <Globe className="h-4 w-4" /> {lang === "ta" ? "EN" : "த"}
          </Button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</main>
      <footer className="border-t bg-card py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Grama Arivu ERP · {t("app_tagline")}
      </footer>
    </div>
  );
}
