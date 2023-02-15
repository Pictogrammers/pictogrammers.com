USE pictogrammers;

DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` varchar(36) NOT NULL,
  `modification_id` varchar(36) NOT NULL,
  `package_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `icon_id` varchar(36) DEFAULT NULL,
  `icon_name_before` varchar(256) DEFAULT NULL,
  `icon_name_after` varchar(256) DEFAULT NULL,
  `icon_data_before` text,
  `icon_data_after` text,
  `icon_description_before` text,
  `icon_description_after` text,
  `join_id` varchar(36) DEFAULT NULL,
  `text` text NOT NULL,
  `font_version_id` varchar(36) DEFAULT NULL,
  `issue` int DEFAULT NULL,
  `date` datetime NOT NULL,
  `visible` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `modification_id` (`modification_id`),
  KEY `package_id` (`package_id`),
  KEY `user_id` (`user_id`),
  KEY `icon_id` (`icon_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

