export interface Player {
  name: string;
  year: string;
  position: string;
  height: string;
  bats_left_right: string;
  throws_left_right: string;
}

export interface College {
  _id?: string; // MongoDB ObjectId as string
  college_name: string;
  location: string;
  school_url: string;
  baseball_roster_url: string;
  baseball_2025_record: string;
  baseball_division: string;
  baseball_conference: string;
  avg_sat: number;
  acceptance_rate: number;
  has_baseball_roster: boolean;
  players: Player[];
  roster_summary: string;
} 