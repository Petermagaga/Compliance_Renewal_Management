# Compliance Renewal Management System

A full-stack compliance management platform designed to help organizations track licenses, permits, insurance, certificates, contracts, renewals, responsible personnel, notifications, and overall compliance health from one centralized workspace.

> **Project status:** Active development
> **Architecture:** React + Django REST Framework + PostgreSQL
> **Deployment direction:** Vercel + Render + PostgreSQL/Supabase
> **Product direction:** Multi-tenant SaaS

---

## Table of Contents

* [Overview](#overview)
* [The Problem](#the-problem)
* [Product Vision](#product-vision)
* [Core Concepts](#core-concepts)
* [System Architecture](#system-architecture)
* [Technology Stack](#technology-stack)
* [Application Architecture](#application-architecture)
* [Backend Architecture](#backend-architecture)
* [Frontend Architecture](#frontend-architecture)
* [Authentication and Authorization](#authentication-and-authorization)
* [Compliance Lifecycle](#compliance-lifecycle)
* [Dashboard Architecture](#dashboard-architecture)
* [Notification Architecture](#notification-architecture)
* [API and Data Flow](#api-and-data-flow)
* [Current Features](#current-features)
* [Engineering Lessons](#engineering-lessons)
* [Project Development Approach](#project-development-approach)
* [Current Project State](#current-project-state)
* [Roadmap](#roadmap)
* [Future SaaS Direction](#future-saas-direction)
* [Running the Project](#running-the-project)
* [Contributing](#contributing)
* [License](#license)

---

# Overview

The Compliance Renewal Management System is being developed as a business-oriented platform for organizations that need to maintain visibility over regulatory, operational, and contractual compliance obligations.

The system centralizes compliance records that might otherwise be managed through:

* Excel spreadsheets
* paper records
* email folders
* calendar reminders
* sticky notes
* manual follow-ups
* individual employee memory

The platform provides a centralized workspace where organizations can monitor compliance status, upcoming expirations, responsible personnel, departments, notifications, and overall compliance health.

The project is also being developed as a practical exercise in **software architecture and technical leadership**.

The objective is therefore not only to make the application work, but to build it with clear boundaries, reusable components, explicit API contracts, maintainable domain logic, and a path toward production SaaS.

---

# The Problem

Organizations frequently have many obligations that expire at different times.

Examples include:

* Business licenses
* Vehicle insurance
* Food safety certificates
* Fire safety certificates
* Operating permits
* Import/export permits
* Contracts
* Regulatory certificates

Without centralized management, organizations risk:

* missed renewals
* expired documents
* operational disruption
* regulatory penalties
* unclear ownership
* poor visibility into organizational risk
* manual notification processes

The system addresses this by turning compliance management into an operational workflow.

---

# Product Vision

The long-term vision is:

> **A centralized compliance operating system for organizations.**

Instead of treating compliance as a spreadsheet of dates, the platform models compliance as a lifecycle.

```text
Compliance Item
      ↓
Ownership
      ↓
Monitoring
      ↓
Expiry Detection
      ↓
Reminder
      ↓
Notification
      ↓
Renewal
      ↓
Updated Compliance State
```

The dashboard then aggregates this information into actionable organizational intelligence.

---

# Core Concepts

The central domain entity is the **Compliance Item**.

A compliance item can represent:

* License
* Permit
* Insurance
* Certificate
* Contract

A compliance item contains information such as:

```text
Company
Department
Name
Category
Issue Date
Expiry Date
Responsible Person
Status
Priority
Supporting Document
```

The system intentionally models compliance generically rather than creating a separate application for every document type.

For example:

```text
Driver License
Vehicle Insurance
Fire Certificate
Business Permit
Import Permit
Employment Certificate
```

can all be represented using the same underlying compliance model.

---

# System Architecture

The current system follows a separated frontend/backend architecture.

```text
                    ┌─────────────────────┐
                    │     React Client    │
                    │                     │
                    │ Dashboard           │
                    │ Compliance          │
                    │ Notifications       │
                    │ Reports             │
                    │ Settings            │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               │ JWT
                               ▼
                    ┌─────────────────────┐
                    │    Django + DRF     │
                    │                     │
                    │ Authentication      │
                    │ Authorization       │
                    │ Compliance Domain   │
                    │ Analytics           │
                    │ Notifications       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │                     │
                    │ Organizations       │
                    │ Departments         │
                    │ Compliance Items    │
                    │ Notifications       │
                    │ Activity            │
                    └─────────────────────┘
```

External notification services extend the backend:

```text
Django
  │
  ├── Email → Resend
  │
  └── WhatsApp → Twilio
```

---

# Technology Stack

## Frontend

* React
* React Router
* Axios
* Tailwind CSS
* React Icons
* Context API
* Custom hooks

## Backend

* Python
* Django
* Django REST Framework
* JWT authentication
* Celery/background processing
* PostgreSQL

## Infrastructure Direction

* Vercel — frontend
* Render — backend
* Supabase/PostgreSQL — database

## Notifications

* Resend — email
* Twilio — WhatsApp

---

# Application Architecture

The frontend follows a feature-oriented architecture.

Conceptually:

```text
src/
│
├── components/
│
├── features/
│   ├── dashboard/
│   ├── compliance/
│   ├── Activity/
│   └── settings/
│
├── pages/
│
├── services/
│
├── hooks/
│
├── context/
│
├── routing/
│
└── layouts/
```

The architecture separates:

### Pages

Route-level application screens.

Examples:

```text
Dashboard
ComplianceItems
ComplianceDetails
EditCompliance
AddCompliance
Reports
Notifications
Reminders
Settings
```

### Components

Reusable UI elements.

Examples:

```text
ComplianceTable
ReminderCard
ActivityCard
ActivityList
FormInput
FormSelect
FormSection
SystemHealthCard
```

### Services

Backend communication.

Examples:

```text
dashboardService
complianceService
reminderService
```

### Context

Shared application/domain state.

Examples:

```text
AuthContext
DashboardContext
NotificationContext
```

### Hooks

Reusable access to application state and behavior.

Examples:

```text
useAuth()
useDashboard()
useReminders()
```

---

# Backend Architecture

The backend uses Django REST Framework as the API layer.

The backend is responsible for:

* authentication
* authorization
* organization data
* department data
* compliance records
* compliance lifecycle
* analytics
* notifications
* reminders
* activity
* document handling

The backend is intentionally treated as the source of truth for business rules.

The frontend is responsible for presentation and interaction, while the backend owns authoritative domain behavior.

---

# Authentication and Authorization

Authentication uses JWT.

The frontend maintains:

```text
User
Access Token
Refresh Token
Authentication State
```

The authentication flow is conceptually:

```text
Login
  ↓
JWT Access Token
  ↓
API Requests
  ↓
Access Token Expiry
  ↓
Refresh Token
  ↓
New Access Token
```

A centralized API client handles authentication headers and token refresh behavior rather than duplicating authentication logic throughout individual components.

---

## Role-Based Access Control

The application supports role-oriented authorization.

Roles include concepts such as:

```text
administrator
manager
compliance_officer
viewer
super_admin
```

Authentication answers:

> Who is the user?

Authorization answers:

> What is this user allowed to do?

This distinction is fundamental to the application's future SaaS architecture.

---

# Organizational Architecture

The domain is structured around organizations and departments.

Conceptually:

```text
User
  │
  ▼
Company
  │
  ├── Department
  │      │
  │      └── Compliance Items
  │
  └── Department
         │
         └── Compliance Items
```

This provides the foundation required for future multi-tenant SaaS functionality.

---

# Compliance Lifecycle

Compliance records are treated as lifecycle entities.

A simplified lifecycle is:

```text
Draft
  ↓
Active
  ↓
Expiring
  ↓
Expired
  ↓
Renewed
```

Status and priority are intentionally separate concepts.

### Status

Represents the lifecycle state.

```text
Draft
Active
Expiring
Expired
Renewed
```

### Priority

Represents business urgency.

```text
Low
Medium
High
Critical
```

This separation allows an item to be, for example:

```text
Status: Active
Priority: Critical
```

without confusing lifecycle state with business importance.

---

# Dashboard Architecture

The dashboard is an aggregation layer over multiple business domains.

The backend dashboard response contains concepts including:

```text
summary
charts
upcoming_reminders
recent_activity
system_health
critical_count
```

The frontend consumes these through `DashboardContext`.

```text
Dashboard API
      ↓
DashboardContext
      ↓
useDashboard()
      ↓
Dashboard Components
```

---

## Dashboard Sections

### Compliance Overview

Displays metrics such as:

* Total Items
* Active
* Expiring
* Expired
* Critical

### Analytics

Current chart concepts include:

* status distribution
* expiry ranges
* category distribution
* monthly expiry trend

### Attention Required

Contains:

* Compliance Workspace
* Upcoming Reminders
* System Health

### Operations

Contains:

* Recent Activity
* Quick Actions

---

# System Health

The dashboard includes a derived compliance health concept.

The backend calculates information such as:

```text
Score
Rating
Color
Trend
Breakdown
```

Conceptually:

```text
Compliance Records
       ↓
Compliance Analytics
       ↓
Health Calculation
       ↓
System Health
       ↓
Dashboard
```

This allows the dashboard to provide derived business intelligence rather than simply displaying database rows.

---

# Upcoming Reminders

The reminder system identifies compliance records that require attention.

A reminder contains information such as:

```text
id
name
category
department
responsible_person
expiry_date
days_remaining
priority
```

The frontend flow is:

```text
Dashboard API
      ↓
DashboardContext
      ↓
reminders
      ↓
ComplianceSection
      ↓
RemindersPanel
      ↓
ReminderCard
```

The reminder card provides:

* compliance name
* priority
* category
* responsible person
* expiry date
* department
* urgency
* review action

The review action takes the user to:

```text
/compliance/:id
```

creating a workflow from dashboard alert → compliance record.

---

# Activity Feed

The activity system provides visibility into operational events.

The frontend architecture is:

```text
ActivitySection
      ↓
ActivityList
      ↓
ActivityCard
      ├── ActivityIcon
      ├── ActivityAvatar
      └── ActivityTimestamp
```

Example activity events include:

```text
Compliance item created
Email reminder sent
WhatsApp reminder sent
```

This creates an operational history rather than leaving users unaware of what the system has done.

---

# Notification Architecture

Notifications are managed separately from the dashboard.

The notification API supports pagination.

The system has been designed to support multiple notification channels:

```text
Compliance
    ↓
Reminder
    ↓
Notification
    ├── Email
    └── WhatsApp
```

Current integrations include:

* Resend for email
* Twilio for WhatsApp

Notifications also contribute to activity visibility.

---

# API and Data Flow

A key architectural principle is maintaining clear API contracts.

For example, a paginated compliance response can look like:

```json
{
  "count": 7,
  "next": null,
  "previous": null,
  "results": []
}
```

The frontend normalizes the response before passing it into UI components.

Similarly, dashboard responses use an envelope:

```json
{
  "success": true,
  "message": "Dashboard loaded successfully",
  "data": {
    "summary": {},
    "charts": {},
    "upcoming_reminders": [],
    "recent_activity": [],
    "system_health": {}
  }
}
```

The frontend therefore explicitly extracts the dashboard data instead of assuming that `response.data` is already the final dashboard object.

---

# Forms and Document Management

The compliance form supports both create and edit modes.

The form handles:

* company
* department
* name
* category
* issue date
* expiry date
* responsible person
* status
* priority
* supporting document

Reusable form primitives include:

```text
FormSection
FormInput
FormSelect
```

The form also handles:

* required fields
* validation
* date validation
* helper text
* disabled states
* backend validation errors
* submitting states
* document uploads

Supporting documents are submitted using `FormData` because the request can contain both structured fields and a file.

---

# Current Features

The project currently contains working concepts for:

* User authentication
* JWT access/refresh flow
* Protected routes
* Role-aware navigation
* Company management
* Department relationships
* Compliance item creation
* Compliance item listing
* Compliance item details
* Compliance item editing
* Compliance categories
* Compliance lifecycle/status
* Compliance priorities
* Expiry calculations
* Upcoming reminders
* Dashboard analytics
* Compliance health
* Activity feed
* Notifications
* Email reminders
* WhatsApp reminders
* Supporting documents
* Dashboard navigation
* Reminder → compliance detail workflow
* Reusable form components
* Feature-oriented React architecture
* Centralized route registry

---

# Engineering Lessons

This project has deliberately been used to learn architecture through real problems.

## API Response Contracts

One major issue occurred when the frontend expected an array but the backend returned a paginated object.

Backend:

```json
{
  "count": 7,
  "results": [...]
}
```

Frontend initially treated it as:

```text
[]
```

The result was an apparently empty application even though the database contained records.

The solution was response normalization.

---

## Dashboard Data Envelope

Another issue occurred when the backend returned:

```text
response.data.data
```

while the frontend treated:

```text
response.data
```

as the dashboard itself.

This caused the dashboard to display:

```text
No compliance data yet
No chart data available
Health data unavailable
No recent activity
```

even though the API contained the information.

The solution was to trace the complete data path and normalize the API response at the context boundary.

---

## Component Data Contracts

The `ReminderCard` component initially referenced variables directly instead of reading them from the `reminder` prop.

For example:

```text
category
responsible_person
expiry_date
```

instead of:

```text
reminder.category
reminder.responsible_person
reminder.expiry_date
```

This caused the component to fail.

The lesson:

> Components should have explicit and predictable data contracts.

---

## Routing and Layout

Detail pages initially rendered without the normal sidebar and topbar.

The route existed, but it was not being handled through the same layout architecture.

The solution was to treat:

```text
Authentication
+
Layout
+
Page
```

as separate concerns.

---

## Debugging Method

The project increasingly adopted a layered debugging approach:

```text
Database
   ↓
Backend
   ↓
API
   ↓
Service
   ↓
Context
   ↓
Hook
   ↓
Component
   ↓
UI
```

Instead of changing random frontend code whenever something appears empty, the data is traced across every boundary.

This is one of the central architectural lessons of the project.

---

# Project Development Approach

The development process has intentionally moved through several stages.

## Stage 1 — Prove the Domain

Identify the actual business problem.

The system was expanded from a narrow reminder concept into a generalized compliance management platform.

---

## Stage 2 — Establish the Domain Model

Build the core entities:

```text
Company
Department
Compliance Item
Notification
Activity
```

---

## Stage 3 — Establish Backend APIs

Create APIs for:

* authentication
* compliance
* dashboard
* notifications
* reminders
* organizational data

---

## Stage 4 — Establish Frontend Architecture

Introduce:

* routing
* layouts
* authentication context
* API services
* feature folders
* reusable components
* dashboard context

---

## Stage 5 — Build the Operational Dashboard

Connect:

```text
Summary
Charts
Compliance
Reminders
System Health
Activity
Quick Actions
```

into one operational workspace.

---

## Stage 6 — Stabilize Data Contracts

Resolve problems around:

* API envelopes
* pagination
* response normalization
* component props
* loading states
* error states

---

## Stage 7 — Build Workflows

Move beyond displaying information.

Examples:

```text
Dashboard
   ↓
Reminder
   ↓
Review
   ↓
Compliance Details
   ↓
Edit
```

and:

```text
Dashboard
   ↓
Add Compliance
   ↓
Create
   ↓
Compliance List
```

---

# Current Project State

The application has moved from a basic CRUD concept toward an operational compliance platform.

The major architecture is established.

The current development focus is:

```text
UX Polish
+
Component Quality
+
Data Reliability
+
Domain Completeness
```

The next major phase is production readiness.

---

# Roadmap

## Phase 1 — Complete Product Experience

Finish and polish:

* compliance list
* compliance details
* edit workflow
* create workflow
* reminders
* notifications
* dashboard
* reports
* settings
* empty states
* loading states
* error states
* responsive behavior
* accessibility
* navigation consistency

---

## Phase 2 — Production Hardening

Before production deployment:

* environment variable management
* production Django settings
* secure CORS configuration
* secure cookies/token strategy where appropriate
* database configuration
* static/media storage
* logging
* error monitoring
* API security
* rate limiting where required
* permission auditing
* backup strategy
* migration strategy
* production email configuration
* background worker configuration

---

## Phase 3 — Deployment

Target architecture:

```text
                         Internet
                            │
                            ▼
                    ┌───────────────┐
                    │    Vercel     │
                    │ React Client  │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    Render     │
                    │ Django / DRF  │
                    └───────┬───────┘
                            │
                    ┌───────┴────────┐
                    ▼                ▼
              PostgreSQL       Background Worker
                    │                │
                    └───────┬────────┘
                            ▼
                    Notifications
```

---

# Future SaaS Direction

The long-term goal is multi-tenant SaaS.

Instead of:

```text
One deployment
      ↓
One company
```

the system should eventually support:

```text
                    SaaS Platform
                         │
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
   Company A         Company B         Company C
       │                 │                 │
   Departments       Departments       Departments
       │                 │                 │
   Compliance        Compliance        Compliance
```

Each organization's data must remain isolated.

---

## SaaS Architecture Concerns

Future work will include:

### Tenant isolation

Every organization must only access its own data.

### Subscription management

Potential tiers such as:

```text
Free
Starter
Business
Enterprise
```

### Billing

Potential integration with a payment provider.

### Usage limits

Examples:

```text
Number of users
Number of compliance items
Storage
Notification volume
Departments
```

### Organization administration

Future capabilities may include:

* invite users
* assign roles
* manage departments
* manage organization settings
* manage subscription
* audit activity

### Auditability

A mature SaaS platform should eventually maintain auditable records of important actions.

---

# Architectural Principles

The project follows several principles.

### 1. Single source of truth

Business-critical data should have one authoritative owner.

### 2. Clear boundaries

Frontend presentation should not become the backend business layer.

### 3. Explicit contracts

API response structures should be predictable and documented.

### 4. Reusability

Repeated UI patterns should become reusable components.

### 5. Separation of concerns

Authentication, routing, domain logic, presentation, and API communication should remain distinguishable.

### 6. Fail gracefully

Empty, loading, error, and success states should all be intentional.

### 7. Design for growth

Architecture should anticipate future organizations, users, records, and notification volume.

### 8. Build the domain, not just the screen

The UI should represent a coherent business model rather than dictate the architecture.

---

# Project Philosophy

This project is intentionally being built from two perspectives.

## Product perspective

> Does this solve a real compliance problem for an organization?

## Architecture perspective

> Can this system remain understandable, secure, maintainable, and scalable as the product grows?

The objective is to develop both.

The project therefore represents not only a software product, but a practical study in:

* software architecture
* domain modeling
* API design
* frontend architecture
* backend architecture
* authentication
* authorization
* data contracts
* distributed workflows
* notification systems
* deployment
* SaaS architecture

---

# License

License information will be added when the project's distribution model is finalized.

---

# Status

🚧 **Active Development**

The core application architecture and major compliance workflows are established.

Current focus:

```text
Polish
→
Production hardening
→
Deployment
→
Observability
→
Security
→
Multi-tenancy
→
SaaS
```

---

## Final Architecture Goal

The long-term system should evolve from:

```text
Compliance Management Application
```

into:

```text
Compliance Management Platform
```

and ultimately:

```text
Multi-Tenant Compliance SaaS
```

while preserving the architectural principles established during development.
