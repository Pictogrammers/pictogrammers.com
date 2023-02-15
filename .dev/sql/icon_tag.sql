USE pictogrammers;

DROP TABLE IF EXISTS `icon_tag`;
CREATE TABLE `icon_tag` (
  `id` char(36) NOT NULL,
  `icon_id` char(36) NOT NULL,
  `tag_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `icon_id` (`icon_id`),
  KEY `tag_id` (`tag_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

