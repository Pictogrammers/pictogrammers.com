USE pictogrammers;

DROP TABLE IF EXISTS `user_permission`;
CREATE TABLE `user_permission` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `permission_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `user_permission`
VALUES
('85d1b91e-49e2-11e4-b3cf-842b2b6cfe1b','c4ea5584-07e3-11e4-bf19-842b2b6cfe1b','05ed7a88-492b-11e4-b3cf-842b2b6cfe1b'),
('96797a4a-49e2-11e4-b3cf-842b2b6cfe1b','a8a312b6-07e4-11e4-bf19-842b2b6cfe1b','05ed7a88-492b-11e4-b3cf-842b2b6cfe1b'),
('e1e92f40-4d0f-11e4-b3cf-842b2b6cfe1b','9826ba54-af4f-11e6-bd37-842b2b6cfe1b','05ed7a88-492b-11e4-b3cf-842b2b6cfe1b'),
('12b125ce-4de7-11e4-b3cf-842b2b6cfe1b','632f0b4e-6c74-11e6-8c7d-842b2b6cfe1b','05ed7a88-492b-11e4-b3cf-842b2b6cfe1b'),
('EFF78DCE-A1A2-4F74-AF95-B5AFCB663FEF','58a489e8-6c78-11e6-8c7d-842b2b6cfe1b','05ed7a88-492b-11e4-b3cf-842b2b6cfe1b'),
('C7DF2C0E-6EA1-4145-BAEF-153C366371A2','0b6dbaec-b28b-11e7-bf5c-94188269ec50','05ed7a88-492b-11e4-b3cf-842b2b6cfe1b'),
('10F1382E-6A2C-4908-A247-271EA833CD20','de2f2677-229e-11e8-b914-94188269ec50','05ed7a88-492b-11e4-b3cf-842b2b6cfe1b'),
('60881496-9d47-11e9-aab8-94188269ec50','bb2d8a7a-b9c1-11e7-bf5c-94188269ec50','05ed7a88-492b-11e4-b3cf-842b2b6cfe1b');