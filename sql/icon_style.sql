USE pictogrammers;

DROP TABLE IF EXISTS `icon_style`;
CREATE TABLE `icon_style` (
  `id` char(36) NOT NULL,
  `icon_id` char(36) NOT NULL,
  `style_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `icon_id` (`icon_id`),
  KEY `style_id` (`style_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

