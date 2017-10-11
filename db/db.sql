CREATE DATABASE  IF NOT EXISTS `fss` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `fss`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: fss
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_fact` int(11) NOT NULL,
  `author` varchar(50) DEFAULT NULL,
  `text_main` varchar(500) DEFAULT NULL,
  `up` tinyint(1) DEFAULT NULL,
  `down` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_fact` (`id_fact`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_fact`) REFERENCES `facts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `countries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country` varchar(50) DEFAULT NULL,
  `capital` varchar(50) DEFAULT NULL,
  `id_region` int(11) NOT NULL,
  `relation` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_region` (`id_region`),
  CONSTRAINT `countries_ibfk_1` FOREIGN KEY (`id_region`) REFERENCES `regions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (3,'Андорра','Андорра-ла-Велья',2,1),(4,'Греция','Афины',2,1),(5,'Словакия','Братислава',2,1),(6,'Бельгия','Брюссель',2,1),(7,'Венгрия','Будапешт',2,1),(8,'Румыния','Бухарест',2,1),(9,'Лихтенштейн','Вадуц',2,1),(10,'Мальта','Валетта',2,1),(11,'Польша','Варшава',2,1),(12,'Ватикан','Ватикан',2,1),(13,'Австрия','Вена',2,1),(14,'Литва','Вильнюс',2,1),(15,'Ирландия','Дублин',2,1),(16,'Хорватия','Загреб',2,1),(17,'Украина','Киев',2,1),(18,'Молдавия','Кишинёв',2,1),(19,'Дания','Копенгаген',2,1),(20,'Португалия','Лиссабон',2,1),(21,'Великобритания','Лондон',2,1),(22,'Словения','Любляна',2,1),(23,'Люксембург','Люксембург',2,1),(24,'Испания','Мадрид',2,1),(25,'Беларусь','Минск',2,1),(26,'Монако','Монако',2,1),(27,'Россия','Москва',2,1),(28,'Норвегия','Осло',2,1),(29,'Франция','Париж',2,1),(30,'Черногория','Подгорица',2,1),(31,'Чехия','Прага',2,1),(32,'Исландия','Рейкьявик',2,1),(33,'Латвия','Рига',2,1),(34,'Италия','Рим',2,1),(35,'Сан-Марино','Сан-Марино',2,1),(36,'Босния и Герцеговина','Сараево',2,1),(37,'Македония','Скопье',2,1),(38,'Болгария','София',2,1),(39,'Швеция','Стокгольм',2,1),(40,'Эстония','Таллинн',2,1),(41,'Албания','Тирана',2,1),(42,'Финляндия','Хельсинки',2,1),(43,'Косово','Приштина',2,1),(48,'Германия','Берлин',2,1),(49,'Нидерланды','Амстердам',2,1),(50,'Швейцария','Берн',2,1),(51,'Сербия','Белград',2,1),(52,'Объединённые Арабские Эмираты','Абу-Даби',4,1),(53,'Иордания','Амман',4,1),(54,'Турция','Анкара',4,1),(55,'Казахстан','Астана',4,1),(56,'Туркмения','Ашхабад',4,1),(57,'Ирак','Багдад',4,1),(58,'Азербайджан','Баку',4,1),(59,'Таиланд','Бангкок',4,1),(60,'Бруней','Бандар-Сери-Бегаван',4,1),(61,'Ливан','Бейрут',4,1),(62,'Киргизия','Бишкек',4,1),(63,'Лаос','Вьентьян',4,1),(64,'Бангладеш','Дакка',4,1),(65,'Сирия','Дамаск',4,1),(66,'Индия','Нью-Дели',4,1),(67,'Индонезия','Джакарта',4,1),(68,'Восточный Тимор','Дили',4,1),(69,'Катар','Доха',4,1),(70,'Таджикистан','Душанбе',4,1),(71,'Армения','Ереван',4,1),(72,'Израиль','Иерусалим',4,1),(73,'Пакистан','Исламабад',4,1),(74,'Афганистан','Кабул',4,1),(75,'Непал','Катманду',4,1),(76,'Малайзия','Куала-Лумпур',4,1),(77,'Мальдивы','Мале',4,1),(78,'Бахрейн','Манама',4,1),(79,'Филиппины','Манила',4,1),(80,'Оман','Маскат',4,1),(81,'Мьянма','Нейпьидо',4,1),(82,'Кипр','Никосия',4,1),(83,'Китайская Народная Республика','Пекин',4,1),(84,'Камбоджа','Пномпень',4,1),(85,'Корейская Народно-Демократическая Республика','Пхеньян',4,1),(86,'Йемен','Сана',4,1),(87,'Республика Корея','Сеул',4,1),(88,'Сингапур','Сингапур',4,1),(89,'Узбекистан','Ташкент',4,1),(90,'Грузия','Тбилиси',4,1),(91,'Иран','Тегеран',4,1),(92,'Япония','Токио',4,1),(93,'Бутан','Тхимпху',4,1),(94,'Монголия','Улан-Батор',4,1),(95,'Вьетнам','Ханой',4,1),(96,'Шри-Ланка','Шри-Джаяварденепура-Котте',4,1),(97,'Кувейт','Эль-Кувейт',4,1),(98,'Саудовская Аравия','Эр-Рияд',4,1),(99,'Государство Палестина','Рамалла',4,1),(100,'Китайская Республика (Тайвань)','Тайбэй',4,1),(101,'Нигерия','Абуджа',5,1),(102,'Эфиопия',' Аддис-Абеба',5,1),(103,'Гана','Акра',5,1),(104,'Алжир','Алжир',5,1),(105,'Мадагаскар','Антананариву',5,1),(106,'Эритрея','Асмэра',5,1),(107,'Мали','Бамако',5,1),(108,'Центральноафриканская Республика','Банги',5,1),(109,'Гамбия','Банжул',5,1),(110,'Гвинея-Бисау','Бисау',5,1),(111,'Республика Конго','Браззавиль',5,1),(112,'Бурунди','Бужумбура',5,1),(113,'Сейшельские Острова','Виктория',5,1),(114,'Намибия','Виндхук',5,1),(115,'Ботсвана','Габороне',5,1),(116,'Сенегал','Дакар',5,1),(117,'Джибути','Джибути',5,1),(118,'Южный Судан','Джуба',5,1),(119,'Танзания','Додома',5,1),(120,'Египет','Каир',5,1),(121,'Уганда','Кампала',5,1),(122,'Руанда','Кигали',5,1),(123,'Демократическая Республика Конго','Киншаса',5,1),(124,'Гвинея','Конакри',5,1),(125,'Габон','Либревиль',5,1),(126,'Малави','Лилонгве',5,1),(127,'Того','Ломе',5,1),(128,'Ангола','Луанда',5,1),(129,'Замбия','Лусака',5,1),(130,'Экваториальная Гвинея','Санта-Исабель',5,1),(131,'Мозамбик','Мапуту',5,1),(132,'Лесото','Масеру',5,1),(133,'Свазиленд','Мбабане',5,1),(134,'Сомали','Могадишо',5,1),(135,'Либерия','Монровия',5,1),(136,'Коморские Острова','Морони',5,1),(137,'Кения','Найроби',5,1),(138,'Чад','Нджамена',5,1),(139,'Нигер','Ниамей',5,1),(140,'Мавритания','Нуакшот',5,1),(141,'Маврикий','Порт-Луи',5,1),(142,'Бенин','Котону',5,1),(143,'Кабо-Верде','Прая',5,1),(144,'Южно-Африканская Республика','Претория',5,1),(145,'Марокко','Рабат',5,1),(146,'Сан-Томе и Принсипи','Сан-Томе',5,1),(147,'Ливия','Триполи',5,1),(148,'Тунис','Тунис',5,1),(149,'Буркина-Фасо','Уагадугу',5,1),(150,'Сьерра-Леоне','Фритаун',5,1),(151,'Зимбабве','Хараре',5,1),(152,'Судан','Хартум',5,1),(153,'Кот-д’Ивуар','Ямусукро',5,1),(154,'Камерун','Яунде',5,1),(155,'Сомалиленд','Харгейса',5,1),(156,'Сахарская Арабская Демократическая Республика','Эль-Аюн',5,1),(157,'Парагвай','Асунсьон',6,1),(158,'Сент-Китс и Невис','Бастер',6,1),(159,'Белиз','Бельмопан',6,1),(160,'Колумбия','Богота',6,1),(161,'Бразилия','Бразилиа',6,1),(162,'Барбадос','Бриджтаун',6,1),(163,'Аргентина','Буэнос-Айрес',6,1),(164,'Соединённые Штаты Америки','Вашингтон',6,1),(165,'Куба','Гавана',6,1),(166,'Гватемала','Гватемала',6,1),(167,'Гайана','Джорджтаун',6,1),(168,'Венесуэла','Каракас',6,1),(169,'Сент-Люсия','Кастри',6,1),(170,'Сент-Винсент и Гренадины','Кингстаун',6,1),(171,'Ямайка','Кингстон',6,1),(172,'Эквадор','Кито',6,1),(173,'Перу','Лима',6,1),(174,'Никарагуа','Манагуа',6,1),(175,'Мексика','Мехико',6,1),(176,'Уругвай','Монтевидео',6,1),(177,'Багамские Острова','Нассау',6,1),(178,'Канада','Оттава',6,1),(179,'Панама','Панама',6,1),(180,'Суринам','Парамарибо',6,1),(181,'Гаити','Порт-о-Пренс',6,1),(182,'Тринидад и Тобаго','Порт-оф-Спейн',6,1),(183,'Доминика','Розо',6,1),(184,'Сальвадор','Сан-Сальвадор',6,1),(185,'Коста-Рика','Сан-Хосе',6,1),(186,'Доминиканская Республика','Санто-Доминго',6,1),(187,'Чили','Сантьяго',6,1),(188,'Антигуа и Барбуда','Сент-Джонс',6,1),(189,'Гренада','Сент-Джорджес',6,1),(190,'Боливия','Сукре',6,1),(191,'Гондурас','Тегусигальпа',6,1),(192,'Самоа','Апиа',7,1),(193,'Новая Зеландия','Веллингтон',7,1),(194,'Австралия','Канберра',7,1),(195,'Маршалловы Острова','Маджуро',7,1),(196,'Палау','Нгерулмуд',7,1),(197,'Тонга','Нукуалофа',7,1),(198,'Микронезия','Паликир',7,1),(199,'Вануату','Порт-Вила',7,1),(200,'Папуа — Новая Гвинея','Порт-Морсби',7,1),(201,'Фиджи','Сува',7,1),(202,'Тувалу','Фунафути',7,1),(203,'Соломоновы Острова','Хониара',7,1),(204,'Кирибати','Южная Тарава',7,1),(205,'Науру','Ярен',7,1);
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facts`
--

DROP TABLE IF EXISTS `facts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title_preview` varchar(50) DEFAULT NULL,
  `img_preview` varchar(50) DEFAULT NULL,
  `text_preview` varchar(200) DEFAULT NULL,
  `title_main` varchar(200) DEFAULT NULL,
  `text_main` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facts`
--

LOCK TABLES `facts` WRITE;
/*!40000 ALTER TABLE `facts` DISABLE KEYS */;
INSERT INTO `facts` VALUES (38,'Флаг другой планеты','2192.jpg','Мало кто знает, но у наших соседей-планет уже появились собственные флаги с цветами, обозначающими их настоящее и возможное будущее','Флаг Марса','<div style=\"text-align: left;\"><p class=\"MsoNormal\" style=\"text-align: center;\">Флаг Марса — не имеющий никакого официального статуса\r\nтриколор, который утверждён как флаг планеты Марс некоммерческой организацией\r\nпо освоению Марса — Марсианским обществом (Mars Society), а также Планетарным\r\nобществом (The Planetary Society). Он не может являться официальным в\r\nюридическом смысле этого слова, так как Договор о космическом пространстве\r\nзапрещает присвоение небесных тел при помощи любых средств.<o:p></o:p></p><p class=\"MsoNormal\" style=\"text-align: center;\"><img src=\"http://localhost:8888/images/facts/mars_flag.jpg\"></p>\r\n\r\n<p class=\"MsoNormal\" style=\"text-align: center;\">В настоящее время флаг Марса развевается над Флэшинской\r\nмарсианской арктической исследовательской станцией на острове Девон, Канада и\r\nна некоторых объектах городка Марсианской Пустынной научно-исследовательской\r\nстанции в штате Юта, США. Флаг также был отправлен в космос — он был доставлен\r\nна орбиту американским астронавтом Джоном Мейсом Грансфелдом во время\r\nкосмического полёта 1999 года на шаттле «Дискавери».<o:p></o:p></p>\r\n\r\n<p class=\"MsoNormal\" style=\"text-align: center;\">Флаг изображает будущую историю Марса: красная полоса\r\nсимволизирует Марс, каким он является сегодня; зелёная и синяя символизируют\r\nэтапы возможного освоения планеты человечеством, если оно будет иметь желание и\r\nвозможности для этого (то есть терраформирование). Цвета флага и их значение\r\nбазируются на известной трилогии Кима Стэнли Робинсона «Красный Марс», «Зелёный\r\nМарс», «Синий Марс». Проект был первоначально предложен инженером NASA Паскалем\r\nЛи.<o:p></o:p></p>\r\n\r\n<p class=\"MsoNormal\">Источник: <a href=\"https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9C%D0%B0%D1%80%D1%81%D0%B0\">https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9C%D0%B0%D1%80%D1%81%D0%B0</a><o:p></o:p></p></div>');
/*!40000 ALTER TABLE `facts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_1` int(11) NOT NULL,
  `id_2` int(11) NOT NULL,
  `id_3` int(11) NOT NULL,
  `id_4` int(11) NOT NULL,
  `country_1` varchar(50) DEFAULT NULL,
  `country_2` varchar(50) DEFAULT NULL,
  `country_3` varchar(50) DEFAULT NULL,
  `country_4` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_1` (`id_1`),
  KEY `id_2` (`id_2`),
  KEY `id_3` (`id_3`),
  KEY `id_4` (`id_4`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`id_1`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`id_2`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`id_3`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_4` FOREIGN KEY (`id_4`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (44,201,194,193,202,'Фиджи','Австралия','Новая Зеландия','Тувалу'),(46,58,104,73,140,'Азербайджан','Алжир','Пакистан','Мавритания'),(47,41,200,199,128,'Албания','Папуа — Новая Гвинея','Вануату','Ангола'),(48,3,18,8,138,'Андорра','Молдавия','Румыния','Чад'),(49,188,126,182,137,'Антигуа и Барбуда','Малави','Тринидад и Тобаго','Кения'),(50,92,63,87,196,'Япония','Лаос','Республика Корея','Палау'),(51,163,174,166,35,'Аргентина','Никарагуа','Гватемала','Сан-Марино'),(52,172,168,160,71,'Эквадор','Венесуэла','Колумбия','Армения'),(54,177,115,169,119,'Багамские Острова','Ботсвана','Сент-Люсия','Танзания'),(55,171,144,158,199,'Ямайка','Южно-Африканская Республика','Сент-Китс и Невис','Вануату'),(56,63,139,102,64,'Лаос','Нигер','Эфиопия','Бангладеш'),(57,204,151,121,129,'Кирибати','Зимбабве','Уганда','Замбия'),(59,29,31,27,49,'Франция','Чехия','Россия','Нидерланды'),(60,5,22,16,51,'Словакия','Словения','Хорватия','Сербия'),(61,162,131,60,159,'Барбадос','Мозамбик','Бруней','Белиз'),(62,78,167,75,69,'Бахрейн','Гайана','Непал','Катар'),(63,26,10,67,11,'Монако','Мальта','Индонезия','Польша'),(64,13,173,178,19,'Австрия','Перу','Канада','Дания'),(65,68,48,128,6,'Восточный Тимор','Германия','Ангола','Бельгия'),(66,197,50,90,19,'Тонга','Швейцария','Грузия','Дания'),(67,95,83,145,85,'Вьетнам','Китайская Народная Республика','Марокко','Корейская Народно-Демократическая Республика'),(68,89,54,56,148,'Узбекистан','Турция','Туркмения','Тунис'),(69,120,86,57,65,'Египет','Йемен','Ирак','Сирия'),(70,152,156,53,99,'Судан','Сахарская Арабская Демократическая Республика','Иордания','Государство Палестина'),(71,74,147,118,97,'Афганистан','Ливия','Южный Судан','Кувейт'),(72,198,195,143,191,'Микронезия','Маршалловы Острова','Кабо-Верде','Гондурас'),(73,25,7,14,30,'Беларусь','Венгрия','Литва','Черногория'),(74,28,39,32,42,'Норвегия','Швеция','Исландия','Финляндия'),(75,142,124,110,103,'Бенин','Гвинея','Гвинея-Бисау','Гана'),(76,141,113,108,190,'Маврикий','Сейшельские Острова','Центральноафриканская Республика','Боливия'),(77,55,62,37,122,'Казахстан','Киргизия','Македония','Руанда'),(78,205,114,100,79,'Науру','Намибия','Китайская Республика (Тайвань)','Филиппины'),(79,15,139,153,66,'Ирландия','Нигер','Кот-д’Ивуар','Индия'),(80,185,165,59,186,'Коста-Рика','Куба','Таиланд','Доминиканская Республика'),(81,82,181,12,9,'Кипр','Гаити','Ватикан','Лихтенштейн'),(82,135,21,76,164,'Либерия','Великобритания','Малайзия','Соединённые Штаты Америки'),(83,112,93,189,96,'Бурунди','Бутан','Гренада','Шри-Ланка'),(84,132,84,61,94,'Лесото','Камбоджа','Ливан','Монголия'),(85,81,107,154,149,'Мьянма','Мали','Камерун','Буркина-Фасо'),(86,43,203,134,36,'Косово','Соломоновы Острова','Сомали','Босния и Герцеговина'),(87,4,72,184,176,'Греция','Израиль','Сальвадор','Уругвай'),(88,34,38,91,175,'Италия','Болгария','Иран','Мексика'),(89,161,20,24,175,'Бразилия','Португалия','Испания','Мексика'),(90,123,117,170,127,'Демократическая Республика Конго','Джибути','Сент-Винсент и Гренадины','Того'),(91,101,105,155,130,'Нигерия','Мадагаскар','Сомалиленд','Экваториальная Гвинея'),(92,179,157,23,187,'Панама','Парагвай','Люксембург','Чили'),(93,180,116,146,192,'Суринам','Сенегал','Сан-Томе и Принсипи','Самоа'),(94,80,52,152,53,'Оман','Объединённые Арабские Эмираты','Судан','Иордания'),(95,98,88,77,136,'Саудовская Аравия','Сингапур','Мальдивы','Коморские Острова'),(96,183,133,106,70,'Доминика','Свазиленд','Эритрея','Таджикистан'),(97,107,17,122,125,'Мали','Украина','Руанда','Габон'),(98,150,115,40,119,'Сьерра-Леоне','Ботсвана','Эстония','Танзания'),(99,109,190,111,103,'Гамбия','Боливия','Республика Конго','Гана'),(100,7,33,71,13,'Венгрия','Латвия','Армения','Австрия');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_fact` int(11) NOT NULL,
  `id_session` varchar(50) DEFAULT NULL,
  `is_like` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_fact` (`id_fact`),
  CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`id_fact`) REFERENCES `facts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=279 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `records`
--

DROP TABLE IF EXISTS `records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `region` varchar(50) DEFAULT NULL,
  `score` int(4) DEFAULT NULL,
  `game` varchar(50) DEFAULT NULL,
  `level_game` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `records`
--

LOCK TABLES `records` WRITE;
/*!40000 ALTER TABLE `records` DISABLE KEYS */;
INSERT INTO `records` VALUES (37,'па','апа','Европа',1327,'угадать флаг по стране','сложный');
/*!40000 ALTER TABLE `records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (2,'Европа'),(4,'Азия'),(5,'Африка'),(6,'Америка'),(7,'Австралия и Океания');
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','q');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'fss'
--

--
-- Dumping routines for database 'fss'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-08 13:37:13
