# SoundBridge Platform Specification

## Vision
A creator-first audio marketplace that pays fairly, maintains quality standards, and puts professionals in control of their business.

---

## Problem We're Solving

### For Audio Professionals:
- Fiverr/Upwork take 20%+ fees
- Race-to-bottom pricing
- Algorithm controls visibility
- No way to build direct relationships
- Competing with unqualified hobbyists

### For Clients:
- Hard to find qualified audio pros
- Inconsistent quality
- No audio-specific platform
- Generic freelance sites don't understand audio needs
- Revisions and file management is messy

---

## Solution: SoundBridge

### Core Principles
1. **Fair fees** — 10% (half of competitors)
2. **Quality gate** — Verified credentials, portfolio review
3. **Audio-specific** — Built for sound professionals only
4. **Pro-first** — Professionals control their pricing, no race to bottom
5. **Transparent** — Market rate guidance, clear expectations

---

## User Types

### 1. Audio Professionals ("Pros")
- Verified credentials (degree, certifications, experience)
- Portfolio with audio samples
- Service listings with clear pricing
- Direct messaging with clients
- Booking calendar
- Analytics dashboard

### 2. Clients
- Browse/search pros by specialty
- Post projects for bids
- Direct booking
- Secure payments
- File sharing
- Review system

### 3. Platform Admin
- Credential verification
- Dispute resolution
- Quality monitoring
- Platform analytics

---

## MVP Features (v1.0)

### Phase 1: Foundation (Week 1-4)
- [ ] User authentication (Clerk/Auth0)
- [ ] Pro profiles with portfolio
- [ ] Service listings
- [ ] Search and browse
- [ ] Basic messaging

### Phase 2: Transactions (Week 5-8)
- [ ] Stripe Connect integration
- [ ] Project creation and quotes
- [ ] Escrow payments
- [ ] File upload/sharing (S3)
- [ ] Order management

### Phase 3: Quality & Trust (Week 9-12)
- [ ] Review system
- [ ] Credential verification flow
- [ ] Dispute resolution
- [ ] Pro analytics
- [ ] Client history

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **State:** Zustand or React Query
- **Forms:** React Hook Form + Zod

### Backend
- **Runtime:** Node.js
- **Framework:** Next.js API routes or separate Express/Fastify
- **Database:** PostgreSQL (Supabase or Neon)
- **ORM:** Prisma

### Infrastructure
- **Hosting:** Vercel (frontend) + Railway/Render (backend if separate)
- **Auth:** Clerk
- **Payments:** Stripe Connect
- **File Storage:** Cloudflare R2 or AWS S3
- **Email:** Resend or Postmark

### AI/Automation
- **Matching:** OpenAI embeddings for project-pro matching
- **Moderation:** Content filtering for messages/reviews
- **Recommendations:** Similar pros, suggested pricing

---

## Database Schema (Core)

```
Users
├── id
├── email
├── role (pro | client | admin)
├── created_at
└── stripe_customer_id

ProProfiles
├── id
├── user_id (FK)
├── display_name
├── bio
├── specialties[] 
├── credentials
├── verified (boolean)
├── hourly_rate
├── portfolio_url
└── rating_avg

Services
├── id
├── pro_id (FK)
├── title
├── description
├── price
├── price_type (fixed | hourly | custom)
├── delivery_days
└── active

Projects
├── id
├── client_id (FK)
├── pro_id (FK)
├── service_id (FK)
├── status (pending | active | review | complete | disputed)
├── price
├── requirements
├── deadline
└── created_at

Messages
├── id
├── project_id (FK)
├── sender_id (FK)
├── content
├── attachments[]
└── sent_at

Transactions
├── id
├── project_id (FK)
├── amount
├── platform_fee
├── pro_payout
├── status
├── stripe_payment_id
└── created_at

Reviews
├── id
├── project_id (FK)
├── reviewer_id (FK)
├── rating (1-5)
├── content
└── created_at
```

---

## Revenue Model

### Primary Revenue
- **Platform fee:** 10% on all transactions
  - Split: 5% from client, 5% from pro payout
  - Undercuts competitors significantly

### Secondary Revenue (Future)
- **Pro subscriptions:** $20/mo for premium features
  - Featured listings
  - Advanced analytics
  - Priority support
  - Lower fees (8%)
  
- **Promoted listings:** $50-200/mo
- **Enterprise tier:** Custom pricing for agencies

### Projections
| Metric | Month 6 | Month 12 | Month 24 |
|--------|---------|----------|----------|
| Active Pros | 50 | 200 | 1,000 |
| Monthly GMV | $25k | $150k | $1M |
| Platform Revenue | $2.5k | $15k | $100k |

---

## Go-to-Market Strategy

### Phase 1: Seed the Supply (Month 1-2)
- Personally recruit 20 verified audio pros
- Focus on quality over quantity
- Offer reduced fees for early adopters (5% for first year)

### Phase 2: Generate Demand (Month 2-4)
- Content marketing (audio production tips)
- Partner with podcasting communities
- YouTube tutorials driving to platform
- Referral program for clients

### Phase 3: Scale (Month 4+)
- SEO optimization
- Paid acquisition (if unit economics work)
- Agency partnerships
- API for integrations

---

## Competitive Analysis

| Feature | Fiverr | Upwork | SoundBridge |
|---------|--------|--------|-------------|
| Platform Fee | 20% | 10-20% | 10% |
| Audio Focus | No | No | Yes |
| Quality Gate | No | Minimal | Yes |
| Verified Credentials | No | No | Yes |
| Pricing Guidance | No | No | Yes |
| File Management | Basic | Basic | Built for audio |

---

## Success Metrics

### North Star: Monthly GMV
- Gross Merchandise Value = total transactions through platform

### Supporting Metrics
- Pro activation rate (signed up → first sale)
- Client conversion (browse → purchase)
- Repeat client rate
- Average project value
- Pro churn rate
- NPS score

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Chicken-egg (no pros = no clients) | Seed with personal network, offer reduced fees |
| Quality inconsistency | Strict verification, review system, quality monitoring |
| Pros going direct | Add enough value (payments, files, discovery) to justify fee |
| Cash flow (escrow) | Stripe Connect handles timing |
| Competition responds | Move fast, build community moat |

---

## Next Steps

1. **Validate demand** — Landing page with waitlist
2. **Recruit pros** — Personal outreach to 50 audio professionals
3. **Build MVP** — 12-week sprint to functional platform
4. **Beta launch** — 20 pros, limited client access
5. **Iterate** — Based on feedback, expand

---

## Timeline

### Month 1
- Waitlist landing page live
- 100 waitlist signups
- 10 committed pros

### Month 2-3
- MVP development
- Pro onboarding flow
- Payment integration

### Month 4
- Beta launch
- First transactions
- Feedback collection

### Month 5-6
- Public launch
- Marketing push
- 50+ active pros
