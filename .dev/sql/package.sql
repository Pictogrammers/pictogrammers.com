USE pictogrammers;

DROP TABLE IF EXISTS `package`;
CREATE TABLE `package` (
  `id` varchar(36) NOT NULL,
  `package_id` varchar(36) DEFAULT NULL,
  `name` varchar(128) NOT NULL,
  `description` text NOT NULL,
  `size` int NOT NULL,
  `prefix` varchar(16) NOT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `fontname` varchar(255) DEFAULT NULL,
  `fontfamily` varchar(255) DEFAULT NULL,
  `fontweight` varchar(255) DEFAULT NULL,
  `npm` varchar(256) DEFAULT NULL,
  `icon` text,
  `price` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `package`
VALUES
('38EF63D0-4744-11E4-B3CF-842B2B6CFE1B', NULL, 'Material Design Icons', 'Material Design styled icons.', 24, 'mdi', 'materialdesignicons', 'Material Design Icons', 'materialdesignicons', 'regular', '@mdi/font', 'M0,0H8V3H18V0H26V8H23V18H26V26H18V23H8V21H18V18H21V8H18V5H8V8H5V18H8V26H0V18H3V8H0V0M2,2V6H6V2H2M2,20V24H6V20H2M20,2V6H24V2H20M20,20V24H24V20H20Z', 0),
('531A9B44-1962-11E5-89CC-842B2B6CFE1B', NULL, 'Material Design Icons Light', 'Light variant of the Material Design Icons pack.', 24, 'mdil', 'materialdesignicons-light', 'Material Design Icons Light', 'materialdesignicons', 'light', '@mdi/light-font', NULL, 0),
('2764ae46-20c1-11ed-8ca4-1209440c2141', NULL, 'Memory Icons', 'The Memory icon set contains 22x22 pixelated icons. Ideal for the Sharp Memory 2.7" Display.', 22, 'memory', 'memory', 'Memory Icons', 'memory', 'regular', '@pictogrammers/memory-font', NULL, 0),
('16a00a9f-aa64-11ec-89b8-1209440c2141', NULL, 'Pictogrammers Brands', 'Pictogrammers Brands.', 24, 'pgb', 'pictogrammers-brands', 'Pictogrammers Brands', 'PictogrammersBrands', 'regular', '@pictogrammers/brands-font', 'M0,0H8V3H18V0H26V8H23V18H26V26H18V23H8V21H18V18H21V8H18V5H8V8H5V18H8V26H0V18H3V8H0V0M2,2V6H6V2H2M2,20V24H6V20H2M20,2V6H24V2H20M20,20V24H24V20H20Z', 0);