USE pictogrammers;

DROP TABLE IF EXISTS `font_version`;
CREATE TABLE `font_version` (
  `id` varchar(36) NOT NULL,
  `font_id` varchar(36) NOT NULL,
  `date` datetime NOT NULL,
  `major` int NOT NULL,
  `minor` int NOT NULL,
  `patch` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `released` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `font_version`
VALUES
('95C44106-BD73-11E5-A4E9-842B2B6CFE1B', 'D051337E-BC7E-11E5-A4E9-842B2B6CFE1B', '2022-04-06 09:28:05', 0, 0, 10, 'Dev Release', 0);