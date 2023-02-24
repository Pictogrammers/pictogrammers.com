import type { RowDataPacket } from 'mysql2';

export interface UserRecordData extends RowDataPacket {
  contributor: number;
  core: number;
  count: number;
  description: string;
  github: string;
  id: string;
  links: {
    type: string;
    value: string;
  }[];
  name: string;
}
