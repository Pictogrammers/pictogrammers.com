USE pictogrammers;

DROP TABLE IF EXISTS `font`;
CREATE TABLE `font` (
  `id` varchar(36) NOT NULL,
  `package_id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `prefix` varchar(16) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `fontname` varchar(255) DEFAULT NULL,
  `fontfamily` varchar(255) DEFAULT NULL,
  `fontweight` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `npm_font` varchar(255) DEFAULT NULL,
  `npm_js` varchar(255) DEFAULT NULL,
  `npm_svg` varchar(255) DEFAULT NULL,
  `icon` text,
  `style` text NOT NULL,
  `color_header` varchar(6) DEFAULT NULL,
  `color_link` varchar(6) NOT NULL,
  `color_new` varchar(6) NOT NULL DEFAULT '',
  `color_deprecated` varchar(6) NOT NULL DEFAULT '',
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `font`
VALUES
('98D1F946-569F-11E5-8AC4-842B2B6CFE1B', '531A9B44-1962-11E5-89CC-842B2B6CFE1B', 'Material Design Icons Light', 'Material Design Icons Light desktop font.', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, '', NULL, '', '', '', NULL), 
('D051337E-BC7E-11E5-A4E9-842B2B6CFE1B', '38EF63D0-4744-11E4-B3CF-842B2B6CFE1B', 'Material Design Icons', 'The complete material design icon pack in a single font.', 'mdi', 'materialdesignicons', 'Material Design Icons', 'materialdesignicons', 'normal', 'MaterialDesignIcons.com', '@mdi/font', '@mdi/js', '@mdi/svg', 'M0, 0H8V3H18V0H26V8H23V18H26V26H18V23H8V21H18V18H21V8H18V5H8V8H5V18H8V26H0V18H3V8H0V0M2, 2V6H6V2H2M2, 20V24H6V20H2M20, 2V6H24V2H20M20, 20V24H24V20H20Z', '', '2196F3', 'E91E63', '3C90BE', 'BE3C3C', NULL), 
('c9d5dcff-aa64-11ec-89b8-1209440c2141', '16a00a9f-aa64-11ec-89b8-1209440c2141', 'Pictogrammers Brands', 'Brands.', 'brands', 'pictogrammers-brands', 'Pictogrammers Brands', 'Pictogrammers Brands', 'normal', 'Pictogrammers.com', '@pictogramers/brands-font', '@pictogramers/brands-js', '@pictogramers/brands-svg', 'M0, 0H8V3H18V0H26V8H23V18H26V26H18V23H8V21H18V18H21V8H18V5H8V8H5V18H8V26H0V18H3V8H0V0M2, 2V6H6V2H2M2, 20V24H6V20H2M20, 2V6H24V2H20M20, 20V24H24V20H20Z', '', '2196F3', 'E91E63', '3C90BE', 'BE3C3C', NULL);
