USE pictogrammers;

DROP TABLE IF EXISTS `icon`;
CREATE TABLE `icon` (
  `id` char(36) NOT NULL,
  `base_icon_id` char(36) DEFAULT NULL,
  `user_id` char(36) NOT NULL,
  `package_id` varchar(36) NOT NULL,
  `name` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `data` text NOT NULL,
  `date` datetime NOT NULL,
  `published` tinyint(1) NOT NULL,
  `deprecated` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  KEY `user_id` (`user_id`),
  KEY `base_icon_id` (`base_icon_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `icon`
VALUES 
('45fea174-07db-11e4-bf19-842b2b6cfe1b','45fea174-07db-11e4-bf19-842b2b6cfe1b','a8a312b6-07e4-11e4-bf19-842b2b6cfe1b','38EF63D0-4744-11E4-B3CF-842B2B6CFE1B','bell','Alarms, reminders, notifications, or any events that have a time related action.','M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21','2014-07-19 04:32:43',1,0),
('039be9b8-08ad-11e4-bf19-842b2b6cfe1b','039be9b8-08ad-11e4-bf19-842b2b6cfe1b','c4ea5584-07e3-11e4-bf19-842b2b6cfe1b','38EF63D0-4744-11E4-B3CF-842B2B6CFE1B','vector-square','This icon can be used as a bounding box, fence, or to enable resize handles.','M2,2H8V4H16V2H22V8H20V16H22V22H16V20H8V22H2V16H4V8H2V2M16,8V6H8V8H6V16H8V18H16V16H18V8H16M4,4V6H6V4H4M18,4V6H20V4H18M4,18V20H6V18H4M18,18V20H20V18H18Z','2014-07-19 04:32:44',1,0),
('9FF7DF3F-D575-433B-9C9A-69C58363C186','9FF7DF3F-D575-433B-9C9A-69C58363C186','a8a312b6-07e4-11e4-bf19-842b2b6cfe1b','38EF63D0-4744-11E4-B3CF-842B2B6CFE1B','alert','Ideal for errors or incorrect input.','M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z','2014-07-19 04:32:45',1,0),
('4E334FE9-DF93-469A-B7D7-AC88BBF25D84','4E334FE9-DF93-469A-B7D7-AC88BBF25D84','a8a312b6-07e4-11e4-bf19-842b2b6cfe1b','38EF63D0-4744-11E4-B3CF-842B2B6CFE1B','basket','Shopping basket','M5.5,21C4.72,21 4.04,20.55 3.71,19.9V19.9L1.1,10.44L1,10A1,1 0 0,1 2,9H6.58L11.18,2.43C11.36,2.17 11.66,2 12,2C12.34,2 12.65,2.17 12.83,2.44L17.42,9H22A1,1 0 0,1 23,10L22.96,10.29L20.29,19.9C19.96,20.55 19.28,21 18.5,21H5.5M12,4.74L9,9H15L12,4.74M12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13Z','2014-07-19 04:32:46',1,0),
('69686D8F-75FE-4091-9061-88DB64D95C01','45fea174-07db-11e4-bf19-842b2b6cfe1b','a8a312b6-07e4-11e4-bf19-842b2b6cfe1b','38EF63D0-4744-11E4-B3CF-842B2B6CFE1B','bell-off','Alarm','M20.84,22.73L18.11,20H3V19L5,17V11C5,9.86 5.29,8.73 5.83,7.72L1.11,3L2.39,1.73L22.11,21.46L20.84,22.73M19,15.8V11C19,7.9 16.97,5.17 14,4.29C14,4.19 14,4.1 14,4A2,2 0 0,0 12,2A2,2 0 0,0 10,4C10,4.1 10,4.19 10,4.29C9.39,4.47 8.8,4.74 8.26,5.09L19,15.8M12,23A2,2 0 0,0 14,21H10A2,2 0 0,0 12,23Z','2014-07-19 04:32:47',1,0),
('5C6175DD-8549-4004-AB77-A545D721A0DE','5C6175DD-8549-4004-AB77-A545D721A0DE','85277898-09f0-11e7-a586-842b2b6cfe1b','38EF63D0-4744-11E4-B3CF-842B2B6CFE1B','github','GitHub logo.','M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z','2014-07-19 04:32:48',1,0),
('63D8BFA5-7AE4-4002-A4C2-C464638C38FC','63D8BFA5-7AE4-4002-A4C2-C464638C38FC','c4ea5584-07e3-11e4-bf19-842b2b6cfe1b','38EF63D0-4744-11E4-B3CF-842B2B6CFE1B','login','Login, Sign In, Signin, what ever you call it.','M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z','2014-07-19 04:32:49',1,0),
('7F57A003-5F4E-46CF-9099-51B8D05381F8','679C0678-9688-49FD-BA71-BED740A09267','c4ea5584-07e3-11e4-bf19-842b2b6cfe1b','38EF63D0-4744-11E4-B3CF-842B2B6CFE1B','arrange-bring-forward','Move the layer up.','M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z','2014-07-19 04:32:50',1,0),
('679C0678-9688-49FD-BA71-BED740A09267','679C0678-9688-49FD-BA71-BED740A09267','c4ea5584-07e3-11e4-bf19-842b2b6cfe1b','38EF63D0-4744-11E4-B3CF-842B2B6CFE1B','arrange-bring-to-front','Bring the layer to the very front.','M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z','2014-07-19 04:32:51',1,0),
('677B1C90-BB0B-4F73-8EEA-D6E8FA709A6D','679C0678-9688-49FD-BA71-BED740A09267','c4ea5584-07e3-11e4-bf19-842b2b6cfe1b','38EF63D0-4744-11E4-B3CF-842B2B6CFE1B','arrange-send-backward','Arrange send back','M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z','2014-07-19 04:32:52',1,0),
('86145497-4CAA-41D6-A14E-0DD3FEE7721E','679C0678-9688-49FD-BA71-BED740A09267','c4ea5584-07e3-11e4-bf19-842b2b6cfe1b','38EF63D0-4744-11E4-B3CF-842B2B6CFE1B','arrange-send-to-back','Move icon to the last layer.','M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z','2014-07-19 04:36:58',1,0);