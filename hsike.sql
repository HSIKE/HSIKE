# Host: 127.0.0.1  (Version 5.0.87-community-nt)
# Date: 2019-01-27 21:53:40
# Generator: MySQL-Front 6.1  (Build 1.26)


#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `Id` int(11) NOT NULL auto_increment,
  `userName` varchar(255) default NULL COMMENT '用户名',
  `password` varchar(255) default NULL COMMENT '用户密码',
  `email` varchar(255) default NULL COMMENT '用户邮箱',
  `headPic` varchar(255) default NULL COMMENT '用户头像',
  `type` varchar(1) default NULL COMMENT '用户类型',
  `time` timestamp NULL default CURRENT_TIMESTAMP COMMENT '注册时间',
  PRIMARY KEY  (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='网站注册用户信息';

#
# Data for table "users"
#


#
# Structure for table "website"
#

DROP TABLE IF EXISTS `website`;
CREATE TABLE `website` (
  `Id` int(11) NOT NULL auto_increment,
  `title` varchar(255) default NULL COMMENT '网站标题',
  `keywords` varchar(255) default NULL COMMENT '网站关键字',
  `description` text COMMENT '网站描述',
  `logo` varchar(255) default NULL COMMENT '网站logo',
  `icon` varchar(255) default NULL COMMENT '网站图标',
  `icp` varchar(255) default NULL COMMENT '备案信息',
  PRIMARY KEY  (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='网站基本信息';

#
# Data for table "website"
#

