USE pictogrammers;

DROP TABLE IF EXISTS `font_icon`;
CREATE TABLE `font_icon` (
  `id` varchar(36) NOT NULL,
  `font_id` varchar(36) NOT NULL,
  `icon_id` varchar(36) NOT NULL,
  `font_version_id` varchar(36) NOT NULL,
  `codepoint` varchar(5) NOT NULL,
  `backup` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `font_id` (`font_id`),
  KEY `icon_id` (`icon_id`),
  KEY `font_version_id` (`font_version_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `font_icon`
VALUES
('02104DA2-BCE1-11E5-A4E9-842B2B6CFE1B', '38EF63D0-4744-11E4-B3CF-842B2B6CFE1B', '45fea174-07db-11e4-bf19-842b2b6cfe1b', '95C44106-BD73-11E5-A4E9-842B2B6CFE1B', 'F0003', 'F002');