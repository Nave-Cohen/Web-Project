CREATE DATABASE  IF NOT EXISTS `todo_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `todo_app`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: todo_app
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `created` datetime NOT NULL,
  `done` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1, 3, 'Sed reiciendis voluptas.', 'wunchrcialecsgzwhximakxezsfcjabkbeoigjhhuvpcxkurxk', '2022-11-23 06:19:19', '2022-03-11 23:19:40', 0), (2, 1, 'Voluptas quibusdam odio velit eveniet.', 'lmqvbayicixblqhuzfwdlqrflakwkqjwpenhrivypadznwbmnsfqcbwvaugilhqsdszheaflawldaxyokefnedlbeonxhdeidygs', '2022-01-01 21:08:16', '2022-01-01 11:29:48', 1), (3, 1, 'Dignissimos qui illum.', 'ecixcodggwgskeqpgvherelpvdyjohzbmsivbmqmarmruijqbbhuxijbwrnvbijnleajmyeabupkhermaax', '2022-11-29 08:35:45', '2022-11-17 21:01:44', 1), (4, 2, 'Corrupti at dolorum ut possimus qui.', 'uhtiuijhluvvttwhgplddzaiwymhteeljxx', '2022-04-28 23:33:00', '2022-01-04 12:04:15', 0), (5, 1, 'Minima eveniet id rem.', 'hvctilfmqjepqkusbjdcszejspxkxucmoyayxotgfnoeegjghqsjxhekjxeloihatorlmfoizecmglkuurtbbagnhp', '2022-02-27 14:40:24', '2022-02-21 23:29:56', 1), (6, 3, 'Doloremque qui asperiores illum.', 'acsfcasecsgafhizczxrfme', '2023-04-03 06:55:04', '2022-09-29 13:03:08', 1), (7, 2, 'Error et enim architecto.', 'jnpzwnaoxdnfghcymkznkuzehjctpraznevghspikeynceyprfnwifzumfgumpjfzreucilkvsditg', '2023-06-01 04:32:31', '2023-03-03 10:42:35', 0), (8, 3, 'Aspernatur omnis sed eaque non ut.', 'lzyrdyewpkoamomzfxkvrgtdoadytbdqyuzappaohotrwhotrruznktf', '2022-08-17 14:15:34', '2022-05-03 22:52:15', 1), (9, 3, 'Voluptate consequatur non.', 'wpyfwrkmjmcqjluasbakdzpuqpqspyveqlllhxbrrqxjlfvk', '2022-02-24 13:14:40', '2022-01-15 19:01:13', 1), (10, 1, 'Necessitatibus unde animi voluptatem.', 'svwfhfybfmpcgrfzygssoyvwkabmxakcvkmvfnqbetlihkcrwccobttvvtwqhebvjhbqzhtoljwuamzldxjsfvnalhroiqlvqad', '2023-04-26 15:17:37', '2022-04-12 02:06:47', 1), (11, 3, 'Atque unde corrupti ratione quae.', 'izjcugsotieroedvayepybaoqrtmfcntgxidkxszgitodexxfomcqrvdgvqgkjdwysaxcnuzddybtmhucrvmfwhddrcdebccnjn', '2022-01-02 14:30:57', '2022-01-01 15:55:34', 0), (12, 3, 'Sit aliquam voluptatem.', 'uaudqdaszkakwnjpsnstumsevsautbvmxmsp', '2023-02-25 22:21:45', '2022-05-07 16:49:29', 1), (13, 1, 'Vero culpa veritatis delectus.', 'ptzjhyjcibaqwyqiepuegplwkablurted', '2022-11-24 15:18:14', '2022-06-23 22:38:10', 1), (14, 2, 'Nobis porro velit animi.', 'lirhsmruvoceasikwtgiqkhbmmxizahpgjlbvtqyilwfguhyvsrhkubxjtafrlmxggxwdjwrodhptasvleinawnpvwmn', '2022-02-02 00:04:32', '2022-01-26 17:28:39', 0), (15, 1, 'Architecto velit rerum.', 'gaxkyfgcwgvgluojvvqjiibkmajjkikn', '2022-12-20 08:22:57', '2022-10-22 15:12:11', 1), (16, 1, 'Quia eos suscipit eos vel.', 'toovfdcuflagvdnkrwmpaxnpiblncspnerzqjjg', '2023-04-16 12:17:00', '2022-12-10 03:01:28', 1), (17, 1, 'Unde nihil aut similique officiis.', 'icpajiuglhbirtfkhshwkkhppqgvlzhsjuhpsgteowpcnvpznudpzhnxjgdfdscaxjdghvykxamqpqjd', '2022-05-27 12:09:09', '2022-02-08 02:43:34', 0), (18, 2, 'Iste nihil dolor porro adipisci ex.', 'uirizielazvfmjddcuvxrlkjlrlswvvcemhoreglz', '2022-09-18 09:49:21', '2022-06-30 04:11:52', 1), (19, 2, 'Cumque non ratione est nisi aut.', 'iumzciggywrgeaujicbrpdoiwkfzexoxfqrevziivqagsjzmvcaexfarpimxdukiwrcr', '2022-06-29 07:14:18', '2022-03-20 20:00:05', 0), (20, 3, 'Odit sit iste libero unde laborum.', 'uimceapjhwhzdjbtseynfapqtwwrgdohrkfqejcvavpswrwlsewoxmedocaqercduhqv', '2023-03-11 14:40:22', '2022-05-21 23:56:41', 1), (21, 2, 'Magnam id quaerat ipsam fuga quae in.', 'hupsibuuiuwmpvwfllwhatelomojsyjivufrpzvxtyptoykaebzfs', '2022-07-26 08:45:21', '2022-01-29 00:10:07', 1), (22, 2, 'Nulla unde ea sunt eos inventore.', 'sbduambislxburqszghdnkeuhyefwycjrrciurdlbthd', '2022-06-21 18:06:32', '2022-03-13 20:02:30', 1), (23, 2, 'Ipsam iste ut et assumenda velit.', 'juwyvbbhuwetvcyzloyjdawxqcgbjfozxqaxjcrrfxsnbxgegtkgmnwswnedvsyyfvcrlczmhfibiazegcudfzckdmefqhgwza', '2022-02-17 04:26:34', '2022-02-01 06:08:43', 1), (24, 2, 'Officiis nisi ipsam.', 'pzskqsqazwfcxagjriqgjqigogqwtmkochrroagyymovywixtwjnxfsupgypqp', '2023-04-24 02:01:37', '2022-12-19 04:56:06', 0), (25, 1, 'Dolorum magni cumque illum assumenda.', 'ixzrmzxmjtojebwsmlutpyipixcvnnpcyabayfcfazrclwcxrgaoffjx', '2022-01-04 14:22:40', '2022-01-04 15:14:00', 0), (26, 3, 'Voluptatem eos commodi magni.', 'obqyyprzkqbuzvbpqpdrgrbunuuvbgygyqlminmgejqxekwjxlejfchncfaciccjm', '2022-12-16 00:31:40', '2022-01-15 11:48:59', 0), (27, 2, 'Omnis excepturi ex repudiandae sunt.', 'effserxeqzvonpqcufjqcowrsmzaeedazkoykfkredhcqbddjcyzxawsmxytqwilqcsog', '2022-11-17 07:54:53', '2022-07-12 09:47:34', 0), (28, 3, 'Esse corrupti aperiam perspiciatis.', 'fgrqeqdyzkouegccgyprhkvmbavwsuyiiycampkrjuwzrkurybsvndwzbqrfheskkihairndltrdepnbkfcqmzlrga', '2022-07-19 00:39:49', '2022-01-15 17:46:19', 0), (29, 2, 'Et molestias nam quam exercitationem.', 'yxbpbzefzxcydpnbkkeusejmpajgallqrictysifivmtefcgynjvlpnxnmtywlkwpsrcr', '2022-05-05 22:31:44', '2022-03-12 19:37:43', 1), (30, 1, 'Non harum qui error ea.', 'gtkvmgarichfcobftecuzyhhwnnjjmnpgfxzfpwmhobwrianyq', '2022-12-26 11:56:25', '2022-01-02 23:31:17', 0), (31, 1, 'Laudantium voluptatem perferendis.', 'ywxkwzpqbayhdxhkidfcwfibmzrjnirultbmfns', '2022-07-08 17:49:57', '2022-05-18 11:45:27', 0), (32, 3, 'Cum et esse aliquid aut.', 'wskytgybdwpiubttoqkmpbrvpanbtdjkoyfucpdbxcmiycmrjbfmutrcmnsvlwddteawxdvkjvzcooujdanqksvbtayakt', '2022-11-10 23:01:14', '2022-03-16 03:57:35', 0), (33, 3, 'Quibusdam voluptas consectetur amet.', 'zvssjubegllcakwacnsygiajxo', '2022-09-01 14:22:02', '2022-05-17 10:45:12', 1), (34, 1, 'Omnis laudantium unde.', 'khzamgwqfqgpygcvtfuwhjqavqxccrkdgoeiiqkbxirohhbwviy', '2023-01-27 22:48:22', '2022-11-12 07:59:41', 1), (35, 2, 'Fugit ut officiis consequatur autem.', 'fjvnygrhprnuyhbfwtbxd', '2022-09-21 19:00:29', '2022-09-06 02:13:33', 1), (36, 3, 'Qui quia iste.', 'iwqdnfgarmekvsovftderjdx', '2022-05-17 15:20:51', '2022-02-03 10:01:50', 0), (37, 2, 'Quisquam animi explicabo aut sunt.', 'phobynqgfawgobarfwtgbufrtzmdbytsfjcpwqs', '2022-02-01 00:36:34', '2022-01-14 15:53:23', 0), (38, 2, 'Aspernatur aliquam aut doloribus aut.', 'sgufxijvyefxwqkaytxlsesvlqbmeatfauylkqrmdgfxraylhghoggaiceohcktrigqf', '2022-07-15 04:19:03', '2022-01-02 03:44:42', 0), (39, 3, 'Porro reprehenderit minima ea.', 'lixcdwumjnecxuyvwfcrkcydalxdzqshjbdtwpjmemjfyihqikmfqarrnihflxgazblxvjcsaisekx', '2022-07-24 11:22:41', '2022-05-12 05:10:59', 0), (40, 2, 'Unde accusamus saepe voluptatum.', 'evafatyrunfbjwgftbnlnogmzuzkvtcrievunpomggcfhgevhfwio', '2022-12-28 00:45:28', '2022-03-28 22:36:43', 1), (41, 3, 'Et eum vero adipisci enim unde vel.', 'vnvtdxhcddjqqzwgowignkqxhhqstndfqyxzlyqqjzcnbfjutmlaedvzylyzoxgwcdzarlrgeozqssrxtuxjunffhs', '2023-02-20 03:52:05', '2023-01-21 23:37:07', 1), (42, 1, 'Totam cumque magni iste id ipsam.', 'dhzjjcwgxetpqeubqbdsauflulxznkaqgnjswmzgcygxrlwzjgj', '2022-11-09 11:06:52', '2022-07-12 07:02:57', 1), (43, 1, 'Omnis repellendus quia.', 'rdknapbguquvjhpbysivwciftcgjvridcvhhr', '2023-02-23 15:36:49', '2022-06-20 14:12:50', 1), (44, 3, 'Magni doloribus omnis ratione ipsum.', 'ypclthcgqzouinhhwcyamzmeycpt', '2022-08-23 00:38:47', '2022-07-15 09:40:48', 1), (45, 2, 'Unde voluptatem autem ut est nemo.', 'ghlctvwvkysxprbgpqmwpbqlitkfbmctqndwnerzoosiaaxhbopgzyxsnqeefpgmbhhtzhfhfdmjbmmismowpchrsebbcasck', '2023-04-20 17:26:56', '2022-08-19 22:34:48', 0), (46, 1, 'Delectus quae qui.', 'kyoaehzeolaalygxmazrpgobbodsccldbygzopk', '2022-09-29 00:42:46', '2022-05-14 20:34:24', 0), (47, 1, 'Voluptates molestias magni et est qui.', 'xqfnhzebkkhsyilxmfqwywnqswyxbtujtawsqgrhbvetajlhecgiixrbfhdofjcdpvajifqkvvwdwyqcpextcptnqfyp', '2022-05-14 16:21:47', '2022-04-22 16:45:14', 1), (48, 3, 'Modi eos est.', 'tlsbowyqeejbmseldfailjfziykhfnobrlmajo', '2022-10-30 09:26:06', '2022-08-15 10:35:32', 1), (49, 1, 'Consequatur omnis sunt aut et.', 'zvbuzspijfvkrroqqdgyjvdlgcgcghlhszymtnfeprmwiaciiflxszohnyafeidicnzkdpubcdixhpunkgq', '2022-10-18 16:56:18', '2022-02-07 14:36:19', 1), (50, 2, 'Ea nulla natus incidunt ipsum est.', 'jbinqujfeekhgsbctydsti', '2023-02-24 07:47:37', '2022-07-02 10:52:10', 1);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'navegi','navegi@email.com','123'),(2,'erik','erik@email.com','123'),(3,'random','random@email.com','123');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-01 17:51:51
