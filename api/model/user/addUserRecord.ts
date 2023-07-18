import { v4 as uuidv4 } from 'uuid';
import type { ResultSetHeader } from 'mysql2';

import db from '../../lib/db.js';

interface addUserRecordProps {
  email: string;
  github: string;
  name: string;
}

const addUserRecord = async ({ email, github, name }: addUserRecordProps) => {
  const userId = uuidv4();
  const [ results ] = await db.execute<ResultSetHeader>('INSERT INTO user (id, name, email, links, github) VALUES (?, ?, ?, "[]", ?)', [ userId, name, email, github ]);

  if (results.affectedRows !== 1) {
    throw new Error('UnableToAddUser');
  }
};

export default addUserRecord;