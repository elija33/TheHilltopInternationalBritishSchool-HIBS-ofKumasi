-- V1__create_hibs_schema.sql
-- Flyway-style migration: create HIBS portal schema (PostgreSQL)
-- Run with: psql -d yourdb -f V1__create_hibs_schema.sql

BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Academic year and term
CREATE TABLE IF NOT EXISTS academic_year (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  label text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS term (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year_id uuid NOT NULL REFERENCES academic_year(id) ON DELETE CASCADE,
  name text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  is_current boolean NOT NULL DEFAULT false,
  published_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (start_date <= end_date)
);

CREATE INDEX IF NOT EXISTS ix_term_academic_year ON term(academic_year_id);

-- School calendar days and closures
CREATE TABLE IF NOT EXISTS school_day (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  term_id uuid NOT NULL REFERENCES term(id) ON DELETE CASCADE,
  date date NOT NULL,
  is_holiday boolean NOT NULL DEFAULT false,
  closure_reason text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(term_id, date)
);

CREATE INDEX IF NOT EXISTS ix_school_day_term_date ON school_day(term_id, date);

-- Users and RBAC
CREATE TABLE IF NOT EXISTS "user" (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text NOT NULL UNIQUE,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  metadata jsonb NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS role (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  description text NULL
);

CREATE TABLE IF NOT EXISTS user_role (
  user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES role(id) ON DELETE CASCADE,
  meta jsonb NULL,
  assigned_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(user_id, role_id)
);

CREATE TABLE IF NOT EXISTS permission (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  description text NULL
);

CREATE TABLE IF NOT EXISTS role_permission (
  role_id uuid NOT NULL REFERENCES role(id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES permission(id) ON DELETE CASCADE,
  PRIMARY KEY(role_id, permission_id)
);

-- Classes and enrollments
CREATE TABLE IF NOT EXISTS class (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year_id uuid NOT NULL REFERENCES academic_year(id) ON DELETE CASCADE,
  name text NOT NULL,
  section text NULL,
  metadata jsonb NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(academic_year_id, name, section)
);

CREATE TABLE IF NOT EXISTS enrollment (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES class(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_enrollment_student_term ON enrollment(student_id, class_id);

-- Teaching assignments (term-scoped)
CREATE TABLE IF NOT EXISTS teaching_assignment (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id uuid NOT NULL REFERENCES "user"(id) ON DELETE SET NULL,
  class_id uuid NOT NULL REFERENCES class(id) ON DELETE CASCADE,
  subject_id uuid NULL,
  term_id uuid NOT NULL REFERENCES term(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(term_id, class_id, subject_id, teacher_id)
);

CREATE INDEX IF NOT EXISTS ix_teaching_assignment_term ON teaching_assignment(term_id);

-- Assessments
CREATE TABLE IF NOT EXISTS assessment (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id uuid NOT NULL REFERENCES class(id) ON DELETE CASCADE,
  subject_id uuid NULL,
  name text NOT NULL,
  date date NULL,
  weighting numeric NOT NULL DEFAULT 0,
  term_id uuid NOT NULL REFERENCES term(id) ON DELETE CASCADE,
  created_by uuid NULL REFERENCES "user"(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(class_id, name, term_id)
);

CREATE INDEX IF NOT EXISTS ix_assessment_term_class ON assessment(term_id, class_id);

-- Grade records (append-only)
CREATE TABLE IF NOT EXISTS grade_record (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id uuid NOT NULL REFERENCES assessment(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  value numeric NULL,
  status text NOT NULL CHECK (status IN ('SCORED','ABSENT','NOT_ASSESSED')),
  created_by uuid NULL REFERENCES "user"(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  reason text NULL
);

CREATE INDEX IF NOT EXISTS ix_grade_record_assessment_student ON grade_record(assessment_id, student_id);
CREATE INDEX IF NOT EXISTS ix_grade_record_student_term ON grade_record(student_id, created_at);

-- Grade correction requests
CREATE TABLE IF NOT EXISTS grade_correction_request (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  grade_record_id uuid NOT NULL REFERENCES grade_record(id) ON DELETE CASCADE,
  requested_by uuid NOT NULL REFERENCES "user"(id),
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','APPROVED','REJECTED')),
  processed_by uuid NULL REFERENCES "user"(id),
  processed_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_grade_correction_request_status ON grade_correction_request(status);

-- Attendance records (term-scoped)
CREATE TABLE IF NOT EXISTS attendance_record (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  date date NOT NULL,
  period integer NULL,
  status text NOT NULL CHECK (status IN ('PRESENT','ABSENT','LATE','EXCUSED','HALF_DAY')),
  recorded_by uuid NULL REFERENCES "user"(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  term_id uuid NOT NULL REFERENCES term(id) ON DELETE CASCADE,
  UNIQUE(student_id, date, period, term_id)
);

CREATE INDEX IF NOT EXISTS ix_attendance_term_class_date ON attendance_record(term_id, date);

-- Syllabus (versioned per term)
CREATE TABLE IF NOT EXISTS syllabus (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id uuid NULL,
  class_id uuid NULL REFERENCES class(id) ON DELETE CASCADE,
  term_id uuid NOT NULL REFERENCES term(id) ON DELETE CASCADE,
  version integer NOT NULL DEFAULT 1,
  content_url text NULL,
  content text NULL,
  uploaded_by uuid NULL REFERENCES "user"(id),
  uploaded_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(class_id, subject_id, term_id, version)
);

CREATE INDEX IF NOT EXISTS ix_syllabus_term ON syllabus(term_id);

-- Fees and payments
CREATE TABLE IF NOT EXISTS fee_invoice (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  term_id uuid NOT NULL REFERENCES term(id) ON DELETE CASCADE,
  total_amount numeric NOT NULL,
  issued_at timestamptz NOT NULL DEFAULT now(),
  due_date date NULL,
  status text NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN','PAID','CANCELLED','OVERDUE'))
);

CREATE INDEX IF NOT EXISTS ix_invoice_student_term ON fee_invoice(student_id, term_id);

CREATE TABLE IF NOT EXISTS payment (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id uuid NOT NULL REFERENCES fee_invoice(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  method text NOT NULL,
  recorded_by uuid NULL REFERENCES "user"(id),
  recorded_at timestamptz NOT NULL DEFAULT now(),
  external_txn_id text NULL,
  status text NOT NULL DEFAULT 'COMPLETED' CHECK (status IN ('PENDING','COMPLETED','FAILED'))
);

CREATE INDEX IF NOT EXISTS ix_payment_invoice ON payment(invoice_id);

-- Audit log
CREATE TABLE IF NOT EXISTS audit_log (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type text NOT NULL,
  entity_id uuid NULL,
  action text NOT NULL,
  performed_by uuid NULL REFERENCES "user"(id),
  diff jsonb NULL,
  timestamp timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_audit_entity ON audit_log(entity_type, entity_id);

COMMIT;
