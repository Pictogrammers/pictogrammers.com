import type { UserRecordData } from '../../interfaces/user';

import db from '../../lib/db';
import getPackagesOnSite from '../../lib/getPackagesOnSite';

const getUserRecordById = async (userId: string) => {
  const { packagePlaceholders, packages } = getPackagesOnSite();

  const [ rows ] = await db.execute<UserRecordData[]>(
    `SELECT user.id, user.name, user.description, user.avatar, user.github, user.twitter, user.website, user.core, user.sponsored, COUNT(icon.id) as count \
      FROM user \
      LEFT JOIN icon ON icon.user_id = user.id \
      WHERE (icon.package_id IN (${packagePlaceholders}) OR icon.package_id IS NULL) AND user.id = ? \
      GROUP BY user.id`,
    [...packages, userId]
  );

  if (!rows.length) {
    throw {
      message: `User '${userId}' not found.`,
      statusCode: 404
    };
  }

  if (rows.length > 1) {
    throw {
      message: `A fatal error occurred retrieving user '${userId}'.`,
      statusCode: 500
    };
  }

  return rows[0];
};

export default getUserRecordById;