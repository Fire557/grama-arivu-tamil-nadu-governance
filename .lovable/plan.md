
# Grama Arivu ERP (GRP) — MVP Plan

This is a very large platform. To ship something real (not a hollow shell), I'll build a focused **frontend-first MVP** on the Lovable stack and wire backend in a second pass. Below is the scope, stack, and what gets built now vs later.

## Stack (adapted to Lovable)

Your brief specifies Next.js + Express + Postgres. Lovable runs **TanStack Start (React 19 + Vite)** with **Lovable Cloud** (managed Postgres + Auth + Storage + server functions) — functionally equivalent, no separate Express server needed. I'll use:

- TanStack Start + TypeScript + TailwindCSS + shadcn/ui
- Lovable Cloud (Postgres, Auth, Storage, server functions) for backend
- OpenStreetMap via `react-leaflet` for maps
- i18n: Tamil-first with English toggle (`i18next`)
- Phone OTP via Lovable Cloud auth (Tamil Nadu rollout)

If you specifically need a Next.js + Express codebase deployed elsewhere, say so and I'll stop — Lovable can't host that.

## MVP Scope (Phase 1 — built now)

Goal: a clickable, multi-role product with real data, real auth, real complaint flow.

**Citizen app**
- Language picker (Tamil default) + OTP login
- Dashboard with 9 department cards + My Complaints, Learning Centre, Search TN, Settings
- File complaint flow: type (new/repair), photo upload, description, GPS capture, department, priority
- My Complaints list with status timeline
- Learning Centre: schemes list + detail (eligibility, benefits, docs, steps, "Apply myself" / "Request volunteer")

**Official portal**
- Separate login + role-gated routes
- Dashboard: assigned complaints queue, Village Progress, "Changes Made By Me", Search TN
- Complaint detail with **citizen identity masked** (only Citizen ID, Village, Ward visible)
- Status update + before/after photo upload for completed work
- Public official profile with Trust Score

**Volunteer portal**
- Login, assist-citizen complaint submission, scheme assistance queue, work verification

**Search Tamil Nadu** (shared)
- Search Village / Ward / Panchayat / District
- Show VAI, department scores, complaint stats, completed projects, officials

**Escalation engine** (server-side cron via `pg_cron` + server function)
- Ward Councillor → Panchayat President → Block Officer → District Officer → State Cell
- Per-level response & resolution SLAs; auto-escalate on breach; auto-create delay complaint; notify citizen

**Evaluation engine** (read-only, computed)
- Trust Score (officials), Department Performance Score, Village Advancement Index
- Computed via SQL views / scheduled job; not user-editable

## Database schema (high level)

```text
users (id, role, phone, language, created_at)            -- role: citizen|official|volunteer
citizens (user_id, citizen_code, village_id, ward_id)     -- PII isolated here
citizen_pii (citizen_id, name, aadhaar, address)          -- RLS: self + service_role only
officials (user_id, name, designation, panchayat_id, ward_id, photo, trust_score)
official_documents (official_id, type, url, verified)
volunteers (user_id, name, area_id, verified)

districts → blocks → panchayats → villages → wards        -- TN admin hierarchy
departments (code, name_ta, name_en)                      -- water, roads, etc.

complaints (id, citizen_id, department_id, type, title, description,
            photo_url, lat, lng, ward_id, priority, status,
            current_level, current_assignee_id, created_at)
complaint_events (complaint_id, level, action, actor_id, note, photo_url, at)
complaint_escalations (complaint_id, from_level, to_level, reason, at)
sla_policies (department_id, level, response_hours, resolution_hours)
delay_complaints (against_official_id, source_complaint_id, reason, at)

projects (id, department_id, village_id, official_id, title, description,
          before_photos[], after_photos[], status, completion_date, impact)

schemes (id, level, name_ta, name_en, eligibility, benefits, documents, steps)
scheme_applications (citizen_id, scheme_id, mode, volunteer_id, status)

scores_village (village_id, water, roads, health, governance, vai, updated_at)
scores_official (official_id, trust_score, updated_at)
scores_department (department_id, village_id, score, updated_at)

user_roles (user_id, role)                                -- RBAC, security-definer has_role()
```

All `public.*` tables get explicit `GRANT`s + RLS. `citizen_pii` is never selectable by `official` or `volunteer` roles — officials query a `complaints_official_view` that exposes only `citizen_code`, `village`, `ward`.

## RBAC

- Roles: `citizen`, `volunteer`, `ward_councillor`, `panchayat_president`, `block_officer`, `district_officer`, `state_cell`, `admin`
- Stored in `user_roles`; checked via `has_role(uuid, app_role)` security-definer function
- Route guards under `_authenticated/`, plus per-role layouts (`_citizen`, `_official`, `_volunteer`)

## Folder structure

```text
src/
  routes/
    index.tsx                       # language picker + role entry
    auth.tsx                        # OTP login
    _authenticated/
      _citizen/                     # citizen dashboard + departments + complaints + learning + search + settings
      _official/                    # official dashboard + queue + village progress + changes + search
      _volunteer/                   # volunteer dashboard
    search.$scope.$id.tsx           # shared Search TN
    api/public/escalation-cron.ts   # pg_cron target
  components/{ui,citizen,official,volunteer,shared,map}
  lib/
    {complaints,schemes,projects,scores,escalation}.functions.ts
    {evaluation,escalation}.server.ts
  i18n/{ta,en}.ts
  integrations/supabase/...
```

## Phase 2 (after MVP lands)

Per-department analytics dashboards (frequency charts, performance trends), full TN admin hierarchy seed data, push notifications, offline complaint draft, advanced map clustering, audit log UI, deeper PAI/LSDG alignment formulas.

## What I need from you before building

1. **Stack confirmation**: OK with TanStack Start + Lovable Cloud (vs. your specified Next/Express)? This is required — Lovable can't deploy Next+Express.
2. **OTP provider**: use Lovable Cloud's built-in phone OTP, or do you want Twilio / MSG91 (India-friendly)?
3. **Seed data**: should I seed a small slice of TN (e.g. 1 district → 2 blocks → 4 panchayats → ~12 villages) for demo, or wait for real data?
4. **MVP cut**: build all 9 department modules with identical structure now, or just Water + Roads end-to-end and stub the rest?

Answer these and I'll start building. If you'd rather I just begin with sensible defaults (Lovable Cloud OTP, seed demo TN slice, all 9 depts as identical modules), say "go with defaults".
