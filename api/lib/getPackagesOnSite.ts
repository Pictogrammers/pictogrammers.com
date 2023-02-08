const getPackagesOnSite = () => {
  // Only pull contributor icon counts from packages shown on the website
  // TODO: Adjust the `package` table to include a flag for what is shown on
  // the website, then use that information in the query instead of hard-
  // coding these here.
  const packagesOnSite = [
    '38EF63D0-4744-11E4-B3CF-842B2B6CFE1B', // Material Design Icons
    '531A9B44-1962-11E5-89CC-842B2B6CFE1B', // Material Design Icons Light
    '2764ae46-20c1-11ed-8ca4-1209440c2141' // Memory
  ];

  const packagePlaceholders = Array(packagesOnSite.length).fill('?').join(',');

  return {
    packagePlaceholders,
    packages: packagesOnSite
  };
};

export default getPackagesOnSite;