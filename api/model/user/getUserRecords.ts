import type { UserRecordData } from '../../interfaces/user';

import db from '../../lib/db';
import getPackagesOnSite from '../../lib/getPackagesOnSite';

const getUserRecords = async (contributorsOnly: boolean = false) => {
  const { packagePlaceholders, packages } = getPackagesOnSite();

  const [ rows ] = await db.execute<UserRecordData[]>(
    `SELECT user.id, user.name, user.description, user.github, user.links, user.contributor, user.core, COUNT(icon.id) as iconCount \
      FROM user \
      LEFT JOIN icon ON icon.user_id = user.id \
      WHERE ${contributorsOnly ? 'user.contributor = 1 AND ' : ''}(icon.package_id IN (${packagePlaceholders}) OR icon.package_id IS NULL) \
      GROUP BY user.id`,
    [...packages]
  );

  return rows.map((row) => ({
    ...row,
    contributor: !!row.contributor,
    core: !!row.core
  }));
};

export default getUserRecords;