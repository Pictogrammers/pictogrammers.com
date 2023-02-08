USE pictogrammers;

DROP TABLE IF EXISTS `modification`;
CREATE TABLE `modification` (
  `id` varchar(36) NOT NULL,
  `text` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `modification`
VALUES
('F7B6D49B-A86F-49AC-AF92-6B9D0DF6188B', 'Renamed an Icon'),
('AFFE875E-01BC-4A34-9BE3-27625A155B28', 'Created an Icon'),
('B1CE1713-A18A-4E9D-9E26-D0B4E44A1FAC', 'Deleted an Icon'),
('66B9FA99-1FAA-4D8F-B87F-B6F3CA444624', 'Published Webfont'),
('B4DEB3A8-A146-4086-9D7B-B67842A9CCB8', 'News'),
('1506F66B-CC2A-4575-A20A-DC138628977A', 'Modified Icon.'),
('691c8829-b1e7-11e7-bf5c-94188269ec50', 'Alias Created'),
('a185a9e8-c192-11e7-bf5c-94188269ec50', 'Icon Tag Created'),
('3c638179-c4ca-11e8-9f27-94188269ec50', 'Updated Description'),
('254591d0-b28e-11e9-8ca0-94188269ec50', 'Assign Icon Author'),
('f1f70a76-b975-11e9-8ca0-94188269ec50', 'Alias Removed'),
('ffe6b5f6-b975-11e9-8ca0-94188269ec50', 'Icon Tag Removed'),
('e262b92e-bfed-11e9-8ca0-94188269ec50', 'Icon Published'),
('e262be80-bfed-11e9-8ca0-94188269ec50', 'Icon Unpublished'),
('f92f2ba6-bfed-11e9-8ca0-94188269ec50', 'Icon Live'),
('f92f310f-bfed-11e9-8ca0-94188269ec50', 'Icon Deprecated');