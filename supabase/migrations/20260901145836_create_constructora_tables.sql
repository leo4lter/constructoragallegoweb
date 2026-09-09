/*
# Create tables for Constructora El Gallego

1. New Tables
- `projects`: Stores construction project entries for the gallery (title, description, image URL, category).
- `clients`: Stores client company logos for the marquee on the landing page (name, logo URL).
- `equipment`: Stores machinery/equipment entries for the gallery (name, description, image URL).

2. Security
- Enable RLS on all three tables.
- This is a single-tenant app with a mock client-side admin login (no Supabase auth session).
- All CRUD operations use the anon key, so policies allow anon + authenticated full access.
- The admin panel gate is enforced client-side; the data itself is intentionally public/shared.

3. Seed Data
- Inserts initial sample projects, clients, and equipment rows so the landing page is populated on first load.
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'Obra Civil',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS equipment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;

-- Projects policies
DROP POLICY IF EXISTS "anon_select_projects" ON projects;
CREATE POLICY "anon_select_projects" ON projects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_projects" ON projects;
CREATE POLICY "anon_insert_projects" ON projects FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_projects" ON projects;
CREATE POLICY "anon_update_projects" ON projects FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_projects" ON projects;
CREATE POLICY "anon_delete_projects" ON projects FOR DELETE
  TO anon, authenticated USING (true);

-- Clients policies
DROP POLICY IF EXISTS "anon_select_clients" ON clients;
CREATE POLICY "anon_select_clients" ON clients FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_clients" ON clients;
CREATE POLICY "anon_insert_clients" ON clients FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_clients" ON clients;
CREATE POLICY "anon_update_clients" ON clients FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_clients" ON clients;
CREATE POLICY "anon_delete_clients" ON clients FOR DELETE
  TO anon, authenticated USING (true);

-- Equipment policies
DROP POLICY IF EXISTS "anon_select_equipment" ON equipment;
CREATE POLICY "anon_select_equipment" ON equipment FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_equipment" ON equipment;
CREATE POLICY "anon_insert_equipment" ON equipment FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_equipment" ON equipment;
CREATE POLICY "anon_update_equipment" ON equipment FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_equipment" ON equipment;
CREATE POLICY "anon_delete_equipment" ON equipment FOR DELETE
  TO anon, authenticated USING (true);

-- Seed data for projects
INSERT INTO projects (title, description, image_url, category) VALUES
  ('Excavación Urbana', 'Movimiento de suelo y excavación en obra civil urbana con maquinaria propia.', 'https://images.pexels.com/photos/15071423/pexels-photo-15071423.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Movimiento de Suelo'),
  ('Cimientos y Fundaciones', 'Preparación de armaduras y hormigón para plateas y fundaciones estructurales.', 'https://images.pexels.com/photos/37733178/pexels-photo-37733178.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Plateas de Hormigón'),
  ('Obra Civil Urbana', 'Infraestructura básica y obras civiles en zona urbana de Sierra Grande.', 'https://images.pexels.com/photos/35846752/pexels-photo-35846752.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Obras Civiles'),
  ('Colocación de Adoquines', 'Producción y colocación de adoquines para pavimento urbano.', 'https://images.pexels.com/photos/5690811/pexels-photo-5690811.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Adoquines'),
  ('Excavadora en Obra', 'Maquinaria pesada operando en frentes de trabajo urbanos.', 'https://images.pexels.com/photos/30751525/pexels-photo-30751525.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Maquinaria'),
  ('Fundaciones de Hormigón', 'Vista aérea de plateas de hormigón coladas en obra civil.', 'https://images.pexels.com/photos/36606410/pexels-photo-36606410.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Plateas de Hormigón')
ON CONFLICT DO NOTHING;

-- Seed data for clients
INSERT INTO clients (name, logo_url) VALUES
  ('Municipalidad de Sierra Grande', 'https://images.pexels.com/photos/8961146/pexels-photo-8961146.jpeg?auto=compress&cs=tinysrgb&h=200&w=200'),
  ('Vialidad Provincial', 'https://images.pexels.com/photos/544971/pexels-photo-544971.jpeg?auto=compress&cs=tinysrgb&h=200&w=200'),
  ('Cámara de Construcción', 'https://images.pexels.com/photos/8482546/pexels-photo-8482546.jpeg?auto=compress&cs=tinysrgb&h=200&w=200'),
  ('Desarrollos Playas Doradas', 'https://images.pexels.com/photos/8482551/pexels-photo-8482551.jpeg?auto=compress&cs=tinysrgb&h=200&w=200')
ON CONFLICT DO NOTHING;

-- Seed data for equipment
INSERT INTO equipment (name, description, image_url) VALUES
  ('Excavadora Hidráulica', 'Equipo pesado para movimiento de suelo y excavación de gran escala.', 'https://images.pexels.com/photos/15071423/pexels-photo-15071423.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
  ('Retroexcavadora', 'Maquinaria versátil para obras civiles, mantenimiento y refacciones.', 'https://images.pexels.com/photos/35846752/pexels-photo-35846752.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
  ('Excavadora Urbana', 'Equipo compacto para trabajos en zonas urbanas con espacio reducido.', 'https://images.pexels.com/photos/30751525/pexels-photo-30751525.jpeg?auto=compress&cs=tinysrgb&h=650&w=940')
ON CONFLICT DO NOTHING;
