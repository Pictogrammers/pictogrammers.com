import type { UserRecordData } from '../../../interfaces/db/user';

import db from '../../lib/db';
import getPackagesOnSite from '../../lib/getPackagesOnSite';

const getUserRecords = async () => {
  const { packagePlaceholders, packages } = getPackagesOnSite();

  const [ rows ] = await db.execute<UserRecordData[]>(
    `SELECT user.id, user.name, user.description, user.avatar, user.github, user.twitter, user.website, user.core, user.sponsored, COUNT(icon.id) as count \
      FROM user \
      LEFT JOIN icon ON icon.user_id = user.id \
      WHERE icon.package_id IN (${packagePlaceholders}) OR icon.package_id IS NULL \
      GROUP BY user.id`,
    [...packages]
  );

  return rows.map((row) => ({
    ...row,
    core: !!row.core,
    sponsored: !!row.sponsored
  }));
};

export default getUserRecords;