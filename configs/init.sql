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
  `uid` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created` date DEFAULT NULL,
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
INSERT INTO `tasks` VALUES (1, 3, 'Sed reiciendis voluptas.', 'wunchrcialecsgzwhximakxezsfcjabkbeoigjhhuvpcxkurxk', '2020-01-04', 0),
(2, 1, 'Voluptas quibusdam odio velit eveniet.', 'lmqvbayicixblqhuzfwdlqrflakwkqjwpenhrivypadznwbmnsfqcbwvaugilhqsdszheaflawldaxyokefnedlbeonxhdeidygs', '2020-06-23', 1),
(3, 1, 'Dignissimos qui illum.', 'ecixcodggwgskeqpgvherelpvdyjohzbmsivbmqmarmruijqbbhuxijbwrnvbijnleajmyeabupkhermaax', '2020-01-08', 1),
(4, 2, 'Corrupti at dolorum ut possimus qui.', 'uhtiuijhluvvttwhgplddzaiwymhteeljxx', '2022-11-05', 0),
(5, 1, 'Minima eveniet id rem.', 'hvctilfmqjepqkusbjdcszejspxkxucmoyayxotgfnoeegjghqsjxhekjxeloihatorlmfoizecmglkuurtbbagnhp', '2021-10-21', 1),
(6, 3, 'Doloremque qui asperiores illum.', 'acsfcasecsgafhizczxrfme', '2023-05-10', 1),
(7, 2, 'Error et enim architecto.', 'jnpzwnaoxdnfghcymkznkuzehjctpraznevghspikeynceyprfnwifzumfgumpjfzreucilkvsditg', '2023-05-15', 0),
(8, 3, 'Aspernatur omnis sed eaque non ut.', 'lzyrdyewpkoamomzfxkvrgtdoadytbdqyuzappaohotrwhotrruznktf', '2020-08-21', 1),
(9, 3, 'Voluptate consequatur non.', 'wpyfwrkmjmcqjluasbakdzpuqpqspyveqlllhxbrrqxjlfvk', '2021-09-17', 1),
(10, 1, 'Necessitatibus unde animi voluptatem.', 'svwfhfybfmpcgrfzygssoyvwkabmxakcvkmvfnqbetlihkcrwccobttvvtwqhebvjhbqzhtoljwuamzldxjsfvnalhroiqlvqad', '2021-07-17', 1),
(11, 3, 'Atque unde corrupti ratione quae.', 'izjcugsotieroedvayepybaoqrtmfcntgxidkxszgitodexxfomcqrvdgvqgkjdwysaxcnuzddybtmhucrvmfwhddrcdebccnjn', '2021-09-30', 0),
(12, 3, 'Sit aliquam voluptatem.', 'uaudqdaszkakwnjpsnstumsevsautbvmxmsp', '2023-04-30', 1),
(13, 1, 'Vero culpa veritatis delectus.', 'ptzjhyjcibaqwyqiepuegplwkablurted', '2020-01-05', 1),
(14, 2, 'Nobis porro velit animi.', 'lirhsmruvoceasikwtgiqkhbmmxizahpgjlbvtqyilwfguhyvsrhkubxjtafrlmxggxwdjwrodhptasvleinawnpvwmn', '2022-12-13', 0),
(15, 1, 'Architecto velit rerum.', 'gaxkyfgcwgvgluojvvqjiibkmajjkikn', '2023-03-13', 1),
(16, 1, 'Quia eos suscipit eos vel.', 'toovfdcuflagvdnkrwmpaxnpiblncspnerzqjjg', '2022-05-20', 1),
(17, 1, 'Unde nihil aut similique officiis.', 'icpajiuglhbirtfkhshwkkhppqgvlzhsjuhpsgteowpcnvpznudpzhnxjgdfdscaxjdghvykxamqpqjd', '2021-05-03', 0),
(18, 2, 'Iste nihil dolor porro adipisci ex.', 'uirizielazvfmjddcuvxrlkjlrlswvvcemhoreglz', '2021-03-18', 1),
(19, 2, 'Cumque non ratione est nisi aut.', 'iumzciggywrgeaujicbrpdoiwkfzexoxfqrevziivqagsjzmvcaexfarpimxdukiwrcr', '2020-12-16', 0),
(20, 3, 'Odit sit iste libero unde laborum.', 'uimceapjhwhzdjbtseynfapqtwwrgdohrkfqejcvavpswrwlsewoxmedocaqercduhqv', '2021-11-28', 1),
(21, 2, 'Magnam id quaerat ipsam fuga quae in.', 'hupsibuuiuwmpvwfllwhatelomojsyjivufrpzvxtyptoykaebzfs', '2022-12-01', 1),
(22, 2, 'Nulla unde ea sunt eos inventore.', 'sbduambislxburqszghdnkeuhyefwycjrrciurdlbthd', '2021-06-29', 1),
(23, 2, 'Ipsam iste ut et assumenda velit.', 'juwyvbbhuwetvcyzloyjdawxqcgbjfozxqaxjcrrfxsnbxgegtkgmnwswnedvsyyfvcrlczmhfibiazegcudfzckdmefqhgwza', '2022-10-18', 1),
(24, 2, 'Officiis nisi ipsam.', 'pzskqsqazwfcxagjriqgjqigogqwtmkochrroagyymovywixtwjnxfsupgypqp', '2021-07-29', 0),
(25, 1, 'Dolorum magni cumque illum assumenda.', 'ixzrmzxmjtojebwsmlutpyipixcvnnpcyabayfcfazrclwcxrgaoffjx', '2021-09-09', 0),
(26, 3, 'Voluptatem eos commodi magni.', 'obqyyprzkqbuzvbpqpdrgrbunuuvbgygyqlminmgejqxekwjxlejfchncfaciccjm', '2023-03-24', 0),
(27, 2, 'Omnis excepturi ex repudiandae sunt.', 'effserxeqzvonpqcufjqcowrsmzaeedazkoykfkredhcqbddjcyzxawsmxytqwilqcsog', '2020-12-06', 0),
(28, 3, 'Esse corrupti aperiam perspiciatis.', 'fgrqeqdyzkouegccgyprhkvmbavwsuyiiycampkrjuwzrkurybsvndwzbqrfheskkihairndltrdepnbkfcqmzlrga', '2020-01-16', 0),
(29, 2, 'Et molestias nam quam exercitationem.', 'yxbpbzefzxcydpnbkkeusejmpajgallqrictysifivmtefcgynjvlpnxnmtywlkwpsrcr', '2022-05-17', 1),
(30, 1, 'Non harum qui error ea.', 'gtkvmgarichfcobftecuzyhhwnnjjmnpgfxzfpwmhobwrianyq', '2020-04-08', 0),
(31, 1, 'Laudantium voluptatem perferendis.', 'ywxkwzpqbayhdxhkidfcwfibmzrjnirultbmfns', '2021-03-15', 0),
(32, 3, 'Cum et esse aliquid aut.', 'wskytgybdwpiubttoqkmpbrvpanbtdjkoyfucpdbxcmiycmrjbfmutrcmnsvlwddteawxdvkjvzcooujdanqksvbtayakt', '2020-01-06', 0),
(33, 3, 'Quibusdam voluptas consectetur amet.', 'zvssjubegllcakwacnsygiajxo', '2020-05-04', 1),
(34, 1, 'Omnis laudantium unde.', 'khzamgwqfqgpygcvtfuwhjqavqxccrkdgoeiiqkbxirohhbwviy', '2021-04-15', 1),
(35, 2, 'Fugit ut officiis consequatur autem.', 'fjvnygrhprnuyhbfwtbxd', '2020-08-14', 1),
(36, 3, 'Qui quia iste.', 'iwqdnfgarmekvsovftderjdx', '2023-01-28', 0),
(37, 2, 'Quisquam animi explicabo aut sunt.', 'phobynqgfawgobarfwtgbufrtzmdbytsfjcpwqs', '2021-08-24', 0),
(38, 2, 'Aspernatur aliquam aut doloribus aut.', 'sgufxijvyefxwqkaytxlsesvlqbmeatfauylkqrmdgfxraylhghoggaiceohcktrigqf', '2021-01-29', 0),
(39, 3, 'Porro reprehenderit minima ea.', 'lixcdwumjnecxuyvwfcrkcydalxdzqshjbdtwpjmemjfyihqikmfqarrnihflxgazblxvjcsaisekx', '2020-09-08', 0),
(40, 2, 'Unde accusamus saepe voluptatum.', 'evafatyrunfbjwgftbnlnogmzuzkvtcrievunpomggcfhgevhfwio', '2020-11-28', 1),
(41, 3, 'Et eum vero adipisci enim unde vel.', 'vnvtdxhcddjqqzwgowignkqxhhqstndfqyxzlyqqjzcnbfjutmlaedvzylyzoxgwcdzarlrgeozqssrxtuxjunffhs', '2021-11-08', 1),
(42, 1, 'Totam cumque magni iste id ipsam.', 'dhzjjcwgxetpqeubqbdsauflulxznkaqgnjswmzgcygxrlwzjgj', '2022-01-12', 1),
(43, 1, 'Omnis repellendus quia.', 'rdknapbguquvjhpbysivwciftcgjvridcvhhr', '2020-11-05', 1),
(44, 3, 'Magni doloribus omnis ratione ipsum.', 'ypclthcgqzouinhhwcyamzmeycpt', '2020-11-02', 1),
(45, 2, 'Unde voluptatem autem ut est nemo.', 'ghlctvwvkysxprbgpqmwpbqlitkfbmctqndwnerzoosiaaxhbopgzyxsnqeefpgmbhhtzhfhfdmjbmmismowpchrsebbcasck', '2022-12-01', 0),
(46, 1, 'Delectus quae qui.', 'kyoaehzeolaalygxmazrpgobbodsccldbygzopk', '2021-03-15', 0),
(47, 1, 'Voluptates molestias magni et est qui.', 'xqfnhzebkkhsyilxmfqwywnqswyxbtujtawsqgrhbvetajlhecgiixrbfhdofjcdpvajifqkvvwdwyqcpextcptnqfyp', '2023-03-25', 1),
(48, 3, 'Modi eos est.', 'tlsbowyqeejbmseldfailjfziykhfnobrlmajo', '2020-01-04', 1),
(49, 1, 'Consequatur omnis sunt aut et.', 'zvbuzspijfvkrroqqdgyjvdlgcgcghlhszymtnfeprmwiaciiflxszohnyafeidicnzkdpubcdixhpunkgq', '2020-03-09', 1),
(50, 2, 'Ea nulla natus incidunt ipsum est.', 'jbinqujfeekhgsbctydsti', '2022-09-29', 1);
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
