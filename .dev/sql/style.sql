USE pictogrammers;

DROP TABLE IF EXISTS `style`;
CREATE TABLE `style` (
  `id` char(36) NOT NULL,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `style`
VALUES
('58f4dc33-d60e-11e8-a666-94188269ec50', 'account'),
('e526737f-d404-11e8-a666-94188269ec50', 'alert'),
('e5267a03-d404-11e8-a666-94188269ec50', 'arrow'),
('2a7bc823-5a05-11eb-89b8-1209440c2141', 'badge'),
('d3b6ec52-d404-11e8-a666-94188269ec50', 'bold'),
('da00c1bd-d57c-11e8-a666-94188269ec50', 'box'),
('ec42631f-0b9c-11ec-89b8-1209440c2141', 'cancel'),
('bdaf5543-d5ae-11e8-a666-94188269ec50', 'check'),
('e1aa40dd-d408-11e8-a666-94188269ec50', 'circle'),
('1437c3e3-d665-11e8-a666-94188269ec50', 'clock'),
('303dfb49-168b-11ec-89b8-1209440c2141', 'cog'),
('68c30be1-d60e-11e8-a666-94188269ec50', 'edit'),
('293cc445-168b-11ec-89b8-1209440c2141', 'eye'),
('fb866975-d665-11e8-a666-94188269ec50', 'heart'),
('a5af4bcb-d667-11e8-a666-94188269ec50', 'key'),
('68c30598-d60e-11e8-a666-94188269ec50', 'lock'),
('e47378e7-0b9c-11ec-89b8-1209440c2141', 'marker'),
('fd76793f-d404-11e8-a666-94188269ec50', 'minus'),
('1599efa7-d405-11e8-a666-94188269ec50', 'multiple'),
('f15c647e-d404-11e8-a666-94188269ec50', 'network'),
('bb5d67eb-d404-11e8-a666-94188269ec50', 'off'),
('bb5d615c-d404-11e8-a666-94188269ec50', 'outline'),
('fd767237-d404-11e8-a666-94188269ec50', 'plus'),
('1599e8d2-d405-11e8-a666-94188269ec50', 'question'),
('d8851b49-0b9c-11ec-89b8-1209440c2141', 'refresh'),
('08af8e5f-d405-11e8-a666-94188269ec50', 'remove'),
('08af95d5-d405-11e8-a666-94188269ec50', 'search'),
('f15c6be2-d404-11e8-a666-94188269ec50', 'settings'),
('0e2dc65b-d666-11e8-a666-94188269ec50', 'star'),
('c46c5f62-0b9c-11ec-89b8-1209440c2141', 'sync'),
('d3b6f23d-d404-11e8-a666-94188269ec50', 'thick'),
('1b1a5026-d405-11e8-a666-94188269ec50', 'variant');