import type { RowDataPacket } from 'mysql2';

export interface UserRecordData extends RowDataPacket {
  id: string;
  name: string;
  description: string;
  avatar: string;
  github: string;
  twitter: string;
  website: string;
  core: number;
  sponsored: number;
  count: number;
};
