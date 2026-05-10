create table public.games (
  id uuid primary key default gen_random_uuid(),
  room_code text not null unique,
  host_session_id text not null,
  status text not null check (status in ('lobby', 'round_active', 'revealing', 'scoreboard', 'finished')),
  round_count integer not null check (round_count in (3, 5, 10)),
  timer_seconds integer not null default 180,
  current_round_index integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.players (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references public.games(id) on delete cascade,
  display_name text not null,
  color text not null,
  avatar text not null,
  joined_at timestamptz not null default now(),
  connected boolean not null default true,
  total_score integer not null default 0
);

create table public.media (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('image', 'video')),
  url text not null,
  thumbnail_url text,
  lat double precision not null,
  lng double precision not null,
  location_label text not null,
  content_pack text not null,
  difficulty text not null,
  attribution text
);

create table public.rounds (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references public.games(id) on delete cascade,
  media_id uuid not null references public.media(id),
  round_index integer not null,
  actual_lat double precision not null,
  actual_lng double precision not null,
  started_at timestamptz,
  ends_at timestamptz,
  status text not null default 'queued',
  unique (game_id, round_index)
);

create table public.guesses (
  id uuid primary key default gen_random_uuid(),
  round_id uuid not null references public.rounds(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  lat double precision not null,
  lng double precision not null,
  confirmed boolean not null default false,
  confirmed_at timestamptz,
  distance_km double precision,
  score integer,
  unique (round_id, player_id)
);

alter publication supabase_realtime add table public.games;
alter publication supabase_realtime add table public.players;
alter publication supabase_realtime add table public.rounds;
alter publication supabase_realtime add table public.guesses;
