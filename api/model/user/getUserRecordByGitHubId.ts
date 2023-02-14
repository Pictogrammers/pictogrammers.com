import type { UserRecordData } from '../../interfaces/user';

import db from '../../lib/db';
import getPackagesOnSite from '../../lib/getPackagesOnSite';

const getUserRecordByGitHubId = async (gitHubId: string) => {
  const { packagePlaceholders, packages } = getPackagesOnSite();

  const [ rows ] = await db.execute<UserRecordData[]>(
    `SELECT user.id, user.name, user.description, user.avatar, user.github, user.twitter, user.website, user.core, user.sponsored, COUNT(icon.id) as count \
      FROM user \
      LEFT JOIN icon ON icon.user_id = user.id \
      WHERE (icon.package_id IN (${packagePlaceholders}) OR icon.package_id IS NULL) AND user.github = ? \
      GROUP BY user.id`,
    [...packages, gitHubId]
  );

  if (!rows.length) {
    throw {
      message: `User '${gitHubId}' not found.`,
      statusCode: 404
    };
  }

  if (rows.length > 1) {
    throw {
      message: `A fatal error occurred retrieving user '${gitHubId}'.`,
      statusCode: 500
    };
  }

  return {
    ...rows[0],
    core: !!rows[0]?.core,
    sponsored: !!rows[0]?.sponsored
  };
};

export default getUserRecordByGitHubId;