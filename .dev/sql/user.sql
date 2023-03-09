USE pictogrammers;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` char(36) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `contributor` tinyint(1) NOT NULL DEFAULT '0',
  `links` json NOT NULL,
  `description` varchar(512),
  `github` varchar(32) NOT NULL,
  `core` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `user`
VALUES
('c4ea5584-07e3-11e4-bf19-842b2b6cfe1b', 'Austin Andrews', 'andrews@pictogrammers.com', 1, '[{"type": "mastodon", "value": "https://fosstodon.org/@templarian"}, {"type": "twitter", "value": "Templarian"}, {"type": "website", "value": "http://templarian.com"}]', 'Hello, I am a developer that gets bored and makes icons, then websites for icons, then more icons. Open Source is pretty awesome.', 'Templarian', 1),
('a8a312b6-07e4-11e4-bf19-842b2b6cfe1b', 'Google', 'google@pictogrammers.com', 1, '[{"type": "twitter", "value": "Google"}, {"type": "website", "value": "http://www.google.com/design"}]', 'Material Design by Google provides hundreds of stock icons provided through their GitHub page.', 'google', 0),
-- ('9826ba54-af4f-11e6-bd37-842b2b6cfe1b', 'Michael Irigoyen', 'irigoyen@pictogrammers.com', 1, '[{"type": "mastodon", "value": "https://hachyderm.io/@mririgoyen"}, {"type": "website", "value": "https://www.irigoyen.dev"}]', 'Senior Engineer with Salesforce by day, Icon Enthusiast for MDI by night.', 'mririgoyen', 1),
('de2f2677-229e-11e8-b914-94188269ec50', 'Colton Wiscombe', 'wiscombe@pictogrammers.com', 1, '[{"type": "twitter", "value": "coltonwiscombe"}, {"type": "website", "value": "http://coltonwiscombe.com"}]', 'I help brands connect to people in meaningful ways by blending innovation with practicality to solve problems and create unique experiences.', 'Xenomorph99', 1),
('632f0b4e-6c74-11e6-8c7d-842b2b6cfe1b', 'GreenTurtwig', 'green@pictogrammers.com', 1, '[{"type": "twitter", "value": "greenturtwig"}, {"type": "website", "value": "https://greenturtwig.co.uk"}]', 'I make stuff with cats and code <3Icons are fun.', 'GreenTurtwig', 1),
('58a489e8-6c78-11e6-8c7d-842b2b6cfe1b', 'Michael Richins', 'richins@pictogrammers.com', 1, '[{"type": "twitter", "value": "MrGrigri"}, {"type": "website", "value": "https://mikerichins.dev"}]', NULL, 'MrGrigri', 1),
('85277898-09f0-11e7-a586-842b2b6cfe1b', 'Contributors', 'contributors@pictogrammers.com', 1, '[]', 'Captures icons that cannot be attributed to an author.', 'contributors', 0),
('0b6dbaec-b28b-11e7-bf5c-94188269ec50', 'Peter Noble', 'noble@pictogrammers.com', 1, '[]', 'Peters short bio.', 'PeterShaggyNoble', 1),
('bb2d8a7a-b9c1-11e7-bf5c-94188269ec50', 'James Coyle', 'coyle@pictogrammers.com', 1, '[{"type": "twitter", "value": "JamesCoyle95"}, {"type": "website", "value": "https://james-coyle.com"}]', 'Programmer and tech lover. Front end web projects are my thing and I love working with Vue and Material Design.', 'JamesCoyle', 1),
('55247828-01f0-21e7-b556-224b2b4cfed1', 'Non Contributor', 'user@pictogrammers.com', 0, '[]', '', 'NonContributor', 0);