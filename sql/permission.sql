USE pictogrammers;

DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` varchar(36) NOT NULL,
  `name` varchar(128) NOT NULL,
  `description` varchar(256) NOT NULL,
  `permission_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `permission`
VALUES
('e2367262-4929-11e4-b3cf-842b2b6cfe1b', 'Tags', 'Tag Permission Group', NULL),
('5b219b2a-492a-11e4-b3cf-842b2b6cfe1b', 'Add', 'Add new tags.', 'e2367262-4929-11e4-b3cf-842b2b6cfe1b'),
('6fa35962-492a-11e4-b3cf-842b2b6cfe1b', 'Icons', 'Icon permission group.', NULL),
('05ed7a88-492b-11e4-b3cf-842b2b6cfe1b', 'Add', 'Add icon.', '6fa35962-492a-11e4-b3cf-842b2b6cfe1b'),
('19c949b0-492b-11e4-b3cf-842b2b6cfe1b', 'Users', 'User permission group.', NULL),
('6d58a60c-492b-11e4-b3cf-842b2b6cfe1b', 'Invite', 'Invite user to join.', '19c949b0-492b-11e4-b3cf-842b2b6cfe1b'),
('fb87f40e-492c-11e4-b3cf-842b2b6cfe1b', 'Edit', 'Edit users. See list and edit fields.', '19c949b0-492b-11e4-b3cf-842b2b6cfe1b'),
('2251efea-492d-11e4-b3cf-842b2b6cfe1b', 'Comments', 'Comment permission group.', NULL),
('37ebb642-492d-11e4-b3cf-842b2b6cfe1b', 'Delete', 'Delete comments.', '2251efea-492d-11e4-b3cf-842b2b6cfe1b'),
('49a83bee-492d-11e4-b3cf-842b2b6cfe1b', 'Edit', 'Edit comments.', '2251efea-492d-11e4-b3cf-842b2b6cfe1b'),
('5a9737e8-492d-11e4-b3cf-842b2b6cfe1b', 'View', 'View all comments from all users.', '2251efea-492d-11e4-b3cf-842b2b6cfe1b'),
('18970baa-4b96-11e4-b3cf-842b2b6cfe1b', 'Publish', 'User can publish icons.', '6fa35962-492a-11e4-b3cf-842b2b6cfe1b');