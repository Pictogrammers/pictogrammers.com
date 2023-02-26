import type { RowDataPacket } from 'mysql2';

export interface UserRecordData extends RowDataPacket {
  contributor: number;
  core: number;
  description: string;
  github: string;
  iconCount: number;
  id: string;
  links: {
    type: string;
    value: string;
  }[];
  name: string;
}
