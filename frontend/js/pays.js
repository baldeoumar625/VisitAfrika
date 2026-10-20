/**
 * PROJET: VISIT AFRIKA
 * FICHIER: pays.js
 * DESCRIPTION: Gestion de l'affichage des 54 pays d'Afrique, recherche, filtrage, modal et carte interactive.
 * Compatible hébergement statique (GitHub Pages) et environnement dynamique (API FastAPI).
 */

// Données statiques de secours complètes pour les 54 pays d'Afrique (Garantit le bon fonctionnement sur GitHub Pages)
const DEFAULT_COUNTRIES = [
  {
    id: "afrique_du_sud",
    name: "Afrique du Sud",
    region: "Afrique Australe",
    capital: "Pretoria",
    population: "60 millions",
    img: "images/pays/Afrique_Australe/afrique_du_sud.jpg",
    desc: "La nation arc-en-ciel, célèbre pour le parc Kruger, la montagne de la Table et sa diversité culturelle.",
    more: "les differents pays/afrique_du_sud.html"
  },
  {
    id: "algerie",
    name: "Algérie",
    region: "Afrique du Nord",
    capital: "Alger",
    population: "44 millions",
    img: "images/pays/Afrique_Nord/algerie.jpg",
    desc: "Plus grand pays d'Afrique, bordé par la Méditerranée et traversé par les immensités spectaculaires du Sahara.",
    more: "les differents pays/algerie.html"
  },
  {
    id: "angola",
    name: "Angola",
    region: "Afrique Centrale",
    capital: "Luanda",
    population: "35 millions",
    img: "images/pays/Afrique_Centrale/angola.png",
    desc: "Terre de contrastes entre littoral atlantique, chutes de Kalandula et falaises grandioses de la Serra da Leba.",
    more: "les differents pays/angola.html"
  },
  {
    id: "benin",
    name: "Bénin",
    region: "Afrique de l'Ouest",
    capital: "Porto-Novo",
    population: "13 millions",
    img: "images/pays/Afrique_Ouest/benin.jpg",
    desc: "Berceau du vaudou et des amazones du Danxomè, riche d'histoire, de cités lacustres et de parcs nationaux.",
    more: "les differents pays/benin.html"
  },
  {
    id: "botswana",
    name: "Botswana",
    region: "Afrique Australe",
    capital: "Gaborone",
    population: "2.6 millions",
    img: "images/pays/Afrique_Australe/botswana.jpg",
    desc: "Sanctuaire mondial de la faune sauvage avec le delta de l'Okavango et le parc national de Chobe.",
    more: "les differents pays/botswana.html"
  },
  {
    id: "burkina_faso",
    name: "Burkina Faso",
    region: "Afrique de l'Ouest",
    capital: "Ouagadougou",
    population: "22 millions",
    img: "images/pays/Afrique_Ouest/burkina_faso.jpg",
    desc: "Le pays des hommes intègres, réputé pour sa scène artistique vibrante, son cinéma (FESPACO) et son artisanat.",
    more: "les differents pays/burkina_faso.html"
  },
  {
    id: "burundi",
    name: "Burundi",
    region: "Afrique de l'Est",
    capital: "Gitega",
    population: "12 millions",
    img: "images/pays/Afrique_Est/burundi.jpg",
    desc: "Surnommé le cœur de l'Afrique, réputé pour ses tambours sacrés millénaires et les rives du lac Tanganyika.",
    more: "les differents pays/burundi.html"
  },
  {
    id: "cameroun",
    name: "Cameroun",
    region: "Afrique Centrale",
    capital: "Yaoundé",
    population: "27 millions",
    img: "images/pays/Afrique_Centrale/cameroun.jpg",
    desc: "L'Afrique en miniature réunissant savanes, forêts tropicales, plages volcaniques et cultures plurielles.",
    more: "les differents pays/cameroun.html"
  },
  {
    id: "capVert",
    name: "Cap-Vert",
    region: "Afrique de l'Ouest",
    capital: "Praia",
    population: "590 000",
    img: "images/pays/Afrique_Ouest/cap_vert.jpg",
    desc: "Archipel volcanique atlantique légendaire pour la morna, ses plages turquoise et ses vallées verdoyantes.",
    more: "les differents pays/capVert.html"
  },
  {
    id: "comores",
    name: "Comores",
    region: "Afrique de l'Est",
    capital: "Moroni",
    population: "850 000",
    img: "images/pays/Afrique_Est/comores.jpg",
    desc: "Les îles de la lune et du parfum (ylang-ylang, vanille) dans le canal du Mozambique, dominées par le volcan Karthala.",
    more: "les differents pays/comores.html"
  },
  {
    id: "congo",
    name: "Congo (Brazzaville)",
    region: "Afrique Centrale",
    capital: "Brazzaville",
    population: "5.8 millions",
    img: "images/pays/Afrique_Centrale/congo.jpg",
    desc: "Au cœur du bassin du Congo avec des réserves naturelles exceptionnelles et la culture élégante de la SAPE.",
    more: "les differents pays/congo.html"
  },
  {
    id: "cote_ivoire",
    name: "Côte d'Ivoire",
    region: "Afrique de l'Ouest",
    capital: "Yamoussoukro",
    population: "29 millions",
    img: "images/pays/Afrique_Ouest/cote_ivoire.jpg",
    desc: "Puissance économique et culturelle d'Afrique de l'Ouest, terre d'hospitalité, de plages et de cacao.",
    more: "les differents pays/cote_ivoire.html"
  },
  {
    id: "djibouti",
    name: "Djibouti",
    region: "Afrique de l'Est",
    capital: "Djibouti",
    population: "1.1 million",
    img: "images/pays/Afrique_Est/djibouti.jpg",
    desc: "Carrefour maritime stratégique aux paysages lunaires uniques, du lac Assal au golfe de Tadjourah.",
    more: "les differents pays/djibouti.html"
  },
  {
    id: "egypte",
    name: "Égypte",
    region: "Afrique du Nord",
    capital: "Le Caire",
    population: "109 millions",
    img: "images/pays/Afrique_Nord/egypte.jpg",
    desc: "Berceau d'une des plus grandes civilisations de l'humanité, avec les pyramides de Gizeh et le fleuve Nil.",
    more: "les differents pays/egypte.html"
  },
  {
    id: "erythree",
    name: "Érythrée",
    region: "Afrique de l'Est",
    capital: "Asmara",
    population: "3.6 millions",
    img: "images/pays/Afrique_Est/erythree.jpg",
    desc: "Perle de la mer Rouge avec l'architecture moderniste classée d'Asmara et les îles préservées des Dahlak.",
    more: "les differents pays/erythree.html"
  },
  {
    id: "eswatini",
    name: "Eswatini",
    region: "Afrique Australe",
    capital: "Mbabane",
    population: "1.2 million",
    img: "images/pays/Afrique_Australe/eswatini.jpg",
    desc: "Royaume montagnard réputé pour la conservation de ses traditions royales ancestrales et ses réserves naturelles.",
    more: "les differents pays/eswatini.html"
  },
  {
    id: "ethiopie",
    name: "Éthiopie",
    region: "Afrique de l'Est",
    capital: "Addis-Abeba",
    population: "123 millions",
    img: "images/pays/Afrique_Est/ethiopie.jpg",
    desc: "Terre millénaire non colonisée, patrie du café, des églises rupestres de Lalibela et des sommets du Simien.",
    more: "les differents pays/ethiopie.html"
  },
  {
    id: "gabon",
    name: "Gabon",
    region: "Afrique Centrale",
    capital: "Libreville",
    population: "2.3 millions",
    img: "images/pays/Afrique_Centrale/gabon.jpg",
    desc: "Le dernier paradis d'Éden africain avec 85% de forêt équatoriale et 13 parcs nationaux côtiers.",
    more: "les differents pays/gabon.html"
  },
  {
    id: "gambie",
    name: "Gambie",
    region: "Afrique de l'Ouest",
    capital: "Banjul",
    population: "2.6 millions",
    img: "images/pays/Afrique_Ouest/gambie.jpg",
    desc: "Surnommée la côte souriante de l'Afrique, longeant le fleuve Gambie et réputée pour son observation d'oiseaux.",
    more: "les differents pays/gambie.html"
  },
  {
    id: "ghana",
    name: "Ghana",
    region: "Afrique de l'Ouest",
    capital: "Accra",
    population: "33 millions",
    img: "images/pays/Afrique_Ouest/ghana.jpg",
    desc: "Pionnier des indépendances, patrie des forts historiques de la côte de l'Or et du dynamisme créatif d'Accra.",
    more: "les differents pays/ghana.html"
  },
  {
    id: "guinee",
    name: "Guinée",
    region: "Afrique de l'Ouest",
    capital: "Conakry",
    population: "14 millions",
    img: "images/pays/Afrique_Ouest/guinee.jpg",
    desc: "Château d'eau de l'Afrique de l'Ouest, pays du Fouta Djallon, de la Dame de Mali et des îles de Loos.",
    more: "les differents pays/guinee.html"
  },
  {
    id: "guinee_bissau",
    name: "Guinée-Bissau",
    region: "Afrique de l'Ouest",
    capital: "Bissau",
    population: "2.1 millions",
    img: "images/pays/Afrique_Ouest/guinee_bissau.jpg",
    desc: "Trésor écologique côtier abritant le paradisiaque archipel des Bijagos, classé réserve de biosphère.",
    more: "les differents pays/guinee_bissau.html"
  },
  {
    id: "guinee_equatoriale",
    name: "Guinée équatoriale",
    region: "Afrique Centrale",
    capital: "Malabo",
    population: "1.6 million",
    img: "images/pays/Afrique_Centrale/guinee_equatoriale.jpg",
    desc: "Seul pays hispanophone d'Afrique, partagé entre l'île volcanique de Bioko et sa région continentale du Rio Muni.",
    more: "les differents pays/guinee_equatoriale.html"
  },
  {
    id: "kenya",
    name: "Kenya",
    region: "Afrique de l'Est",
    capital: "Nairobi",
    population: "54 millions",
    img: "images/pays/Afrique_Est/kenya.jpg",
    desc: "Capitale mondiale du safari avec le Masaï Mara, les plages coralliennes de Mombasa et le mont Kenya.",
    more: "les differents pays/kenya.html"
  },
  {
    id: "lesotho",
    name: "Lesotho",
    region: "Afrique Australe",
    capital: "Maseru",
    population: "2.3 millions",
    img: "images/pays/Afrique_Australe/lesotho.jpg",
    desc: "Le royaume dans le ciel, entièrement perché à plus de 1 400 mètres d'altitude, royaume des cavaliers basotho.",
    more: "les differents pays/lesotho.html"
  },
  {
    id: "liberia",
    name: "Libéria",
    region: "Afrique de l'Ouest",
    capital: "Monrovia",
    population: "5.3 millions",
    img: "images/pays/Afrique_Ouest/liberia.jpg",
    desc: "Première république moderne d'Afrique, dotée de vastes forêts pluviales et de spots de surf réputés à Robertsport.",
    more: "les differents pays/liberia.html"
  },
  {
    id: "libye",
    name: "Libye",
    region: "Afrique du Nord",
    capital: "Tripoli",
    population: "6.8 millions",
    img: "images/pays/Afrique_Nord/libye.jpg",
    desc: "Patrimoine gréco-romain d'exception (Leptis Magna, Sabratha) et dunes dorées du grand Sahara oriental.",
    more: "les differents pays/libye.html"
  },
  {
    id: "madagascar",
    name: "Madagascar",
    region: "Afrique de l'Est",
    capital: "Antananarivo",
    population: "29 millions",
    img: "images/pays/Afrique_Est/madagascar.jpg",
    desc: "Île-continent dotée d'une biodiversité unique au monde : lémuriens, allée des baobabs et Tsingy de Bemaraha.",
    more: "les differents pays/madagascar.html"
  },
  {
    id: "malawi",
    name: "Malawi",
    region: "Afrique Australe",
    capital: "Lilongwe",
    population: "20 millions",
    img: "images/pays/Afrique_Australe/malawi.jpg",
    desc: "Le cœur chaleureux de l'Afrique, bordé par le gigantesque lac Malawi et ses centaines de poissons cichlidés colorés.",
    more: "les differents pays/malawi.html"
  },
  {
    id: "mali",
    name: "Mali",
    region: "Afrique de l'Ouest",
    capital: "Bamako",
    population: "22 millions",
    img: "images/pays/Afrique_Ouest/mali.jpg",
    desc: "Héritier de grands empires, de Tombouctou la mystique, des mosquées en terre de Djenné et du pays Dogon.",
    more: "les differents pays/mali.html"
  },
  {
    id: "maroc",
    name: "Maroc",
    region: "Afrique du Nord",
    capital: "Rabat",
    population: "37 millions",
    img: "images/pays/Afrique_Nord/maroc.jpg",
    desc: "Royaume des médinas impériales, des souks chatoyants de Marrakech, de l'Atlas enneigé et du Sahara.",
    more: "les differents pays/maroc.html"
  },
  {
    id: "maurice",
    name: "Maurice",
    region: "Afrique de l'Est",
    capital: "Port-Louis",
    population: "1.3 million",
    img: "images/pays/Afrique_Est/maurice.jpg",
    desc: "Joyau de l'océan Indien aux lagons turquoise, plages de sable blanc et culture créole cosmopolite.",
    more: "les differents pays/maurice.html"
  },
  {
    id: "mauritanie",
    name: "Mauritanie",
    region: "Afrique de l'Ouest",
    capital: "Nouakchott",
    population: "4.7 millions",
    img: "images/pays/Afrique_Ouest/mauritanie.jpg",
    desc: "Porte du désert avec la cité caravanière de Chinguetti, le banc d'Arguin et le mythique train du désert.",
    more: "les differents pays/mauritanie.html"
  },
  {
    id: "mozambique",
    name: "Mozambique",
    region: "Afrique Australe",
    capital: "Maputo",
    population: "32 millions",
    img: "images/pays/Afrique_Australe/mozambique.jpg",
    desc: "2 500 km de côtes sauvages bordées par l'archipel de Bazaruto, les requins-baleines et l'architecture coloniale.",
    more: "les differents pays/mozambique.html"
  },
  {
    id: "namibie",
    name: "Namibie",
    region: "Afrique Australe",
    capital: "Windhoek",
    population: "2.6 millions",
    img: "images/pays/Afrique_Australe/namibie.jpg",
    desc: "Les plus hautes dunes rouges du monde à Sossusvlei, le canyon de Fish River et la faune d'Etosha.",
    more: "les differents pays/namibie.html"
  },
  {
    id: "niger",
    name: "Niger",
    region: "Afrique de l'Ouest",
    capital: "Niamey",
    population: "25 millions",
    img: "images/pays/Afrique_Ouest/niger.jpg",
    desc: "Carrefour saharien aux spectaculaires massifs de l'Aïr, dunes du Ténéré et dernière harde de girafes d'Afrique de l'Ouest.",
    more: "les differents pays/niger.html"
  },
  {
    id: "nigeria",
    name: "Nigeria",
    region: "Afrique de l'Ouest",
    capital: "Abuja",
    population: "218 millions",
    img: "images/pays/Afrique_Ouest/nigeria.jpg",
    desc: "Géant de l'Afrique, moteur culturel mondial avec Nollywood, la musique Afrobeats et une énergie débordante.",
    more: "les differents pays/nigeria.html"
  },
  {
    id: "ouganda",
    name: "Ouganda",
    region: "Afrique de l'Est",
    capital: "Kampala",
    population: "47 millions",
    img: "images/pays/Afrique_Est/ouganda.jpg",
    desc: "La perle de l'Afrique abritant les derniers gorilles de montagne dans la forêt impénétrable de Bwindi.",
    more: "les differents pays/ouganda.html"
  },
  {
    id: "rd_congo",
    name: "RD Congo",
    region: "Afrique Centrale",
    capital: "Kinshasa",
    population: "99 millions",
    img: "images/pays/Afrique_Centrale/rd_congo.jpg",
    desc: "Géant équatorial doté d'une biodiversité inouïe au parc des Virunga, de volcans actifs et d'une effervescence musicale.",
    more: "les differents pays/rd_congo.html"
  },
  {
    id: "republique_centrafricaine",
    name: "Centrafrique",
    region: "Afrique Centrale",
    capital: "Bangui",
    population: "5.5 millions",
    img: "images/pays/Afrique_Centrale/republique_centrafricain.jpg",
    desc: "Cœur sauvage du continent avec le parc national de Dzanga-Sangha, sanctuaire d'éléphants de forêt et de gorilles.",
    more: "les differents pays/republique_centrafricaine.html"
  },
  {
    id: "rwanda",
    name: "Rwanda",
    region: "Afrique de l'Est",
    capital: "Kigali",
    population: "13 millions",
    img: "images/pays/Afrique_Est/rwanda.jpg",
    desc: "Le pays des mille collines, modèle de propreté et de renouveau, célèbre pour ses gorilles dans les volcans.",
    more: "les differents pays/rwanda.html"
  },
  {
    id: "sao_tome_principe",
    name: "Sao Tomé-et-Principe",
    region: "Afrique Centrale",
    capital: "São Tomé",
    population: "227 000",
    img: "images/pays/Afrique_Centrale/sao_tome_principe.jpg",
    desc: "Archipel volcanique préservé du golfe de Guinée, terre du chocolat fin et du mode de vie paisible « Leve Leve ».",
    more: "les differents pays/sao_tome_principe.html"
  },
  {
    id: "senegal",
    name: "Sénégal",
    region: "Afrique de l'Ouest",
    capital: "Dakar",
    population: "17 millions",
    img: "images/pays/Afrique_Ouest/senegal.jpg",
    desc: "Pays de la Teranga (hospitalité), avec l'île historique de Gorée, le lac Rose, Saint-Louis et les îles du Saloum.",
    more: "les differents pays/senegal.html"
  },
  {
    id: "seychelles",
    name: "Seychelles",
    region: "Afrique de l'Est",
    capital: "Victoria",
    population: "100 000",
    img: "images/pays/Afrique_Est/seychelles.jpg",
    desc: "Archipel paradisiaque aux rochers granitiques iconiques, plages de renommée mondiale et forêt de cocos de mer.",
    more: "les differents pays/seychelles.html"
  },
  {
    id: "sierra_leone",
    name: "Sierra Leone",
    region: "Afrique de l'Ouest",
    capital: "Freetown",
    population: "8.6 millions",
    img: "images/pays/Afrique_Ouest/sierra_leone.jpg",
    desc: "Célèbre pour ses plages sauvages bordées de palmiers le long de la péninsule de Freetown et ses sanctuaires de chimpanzés.",
    more: "les differents pays/sierra_leone.html"
  },
  {
    id: "somalie",
    name: "Somalie",
    region: "Afrique de l'Est",
    capital: "Mogadiscio",
    population: "17 millions",
    img: "images/pays/Afrique_Est/somalie.jpg",
    desc: "La Corne de l'Afrique avec la plus longue côte du continent, riche de poésie, d'art rupestre millénaire et de commerce.",
    more: "les differents pays/somalie.html"
  },
  {
    id: "soudan",
    name: "Soudan",
    region: "Afrique du Nord",
    capital: "Khartoum",
    population: "46 millions",
    img: "images/pays/Afrique_Nord/soudan.jpg",
    desc: "Terre des pyramides nubiennes de Méroé, confluent historique des deux Nils (Nil Bleu et Nil Blanc).",
    more: "les differents pays/soudan.html"
  },
  {
    id: "soudan_du_sud",
    name: "Soudan du Sud",
    region: "Afrique Centrale",
    capital: "Djouba",
    population: "11 millions",
    img: "images/pays/Afrique_Centrale/soudan_du_sud.jpg",
    desc: "Le plus jeune État du monde, traversé par les immenses marais du Sudd et de grandes migrations de faune sauvage.",
    more: "les differents pays/soudan_du_sud.html"
  },
  {
    id: "tanzanie",
    name: "Tanzanie",
    region: "Afrique de l'Est",
    capital: "Dodoma",
    population: "65 millions",
    img: "images/pays/Afrique_Est/tanzanie.jpg",
    desc: "Terre du majestueux mont Kilimandjaro, des grandes migrations du Serengeti et de l'île aux épices de Zanzibar.",
    more: "les differents pays/tanzanie.html"
  },
  {
    id: "tchad",
    name: "Tchad",
    region: "Afrique Centrale",
    capital: "N'Djamena",
    population: "17 millions",
    img: "images/pays/Afrique_Centrale/Tchad.jpg",
    desc: "Carrefour saharo-sahélien avec les spectaculaires lacs d'Ounianga et le massif escarpé de l'Ennedi.",
    more: "les differents pays/tchad.html"
  },
  {
    id: "togo",
    name: "Togo",
    region: "Afrique de l'Ouest",
    capital: "Lomé",
    population: "8.8 millions",
    img: "images/pays/Afrique_Ouest/togo.jpg",
    desc: "Bordé par l'Atlantique, réputé pour les forteresses de terre du Koutammakou, son grand marché et ses cascades.",
    more: "les differents pays/togo.html"
  },
  {
    id: "tunisie",
    name: "Tunisie",
    region: "Afrique du Nord",
    capital: "Tunis",
    population: "12 millions",
    img: "images/pays/Afrique_Nord/tunisie.jpg",
    desc: "Carthage antique, médinas classées de Tunis, plages ensoleillées de Djerba et décors sahariens de Matmata.",
    more: "les differents pays/tunisie.html"
  },
  {
    id: "zambie",
    name: "Zambie",
    region: "Afrique Australe",
    capital: "Lusaka",
    population: "20 millions",
    img: "images/pays/Afrique_Australe/zambie.jpg",
    desc: "Terre des spectaculaires chutes Victoria (Mosi-oa-Tunya) et des safaris à pied au cœur du parc South Luangwa.",
    more: "les differents pays/zambie.html"
  },
  {
    id: "zimbabwe",
    name: "Zimbabwe",
    region: "Afrique Australe",
    capital: "Harare",
    population: "16 millions",
    img: "images/pays/Afrique_Australe/zimbabwe.jpg",
    desc: "Célèbre pour les ruines du Grand Zimbabwe en pierre taillée, les chutes Victoria et le parc national Hwange.",
    more: "les differents pays/zimbabwe.html"
  }
];

// Sites touristiques par défaut pour la carte et la modal
const DEFAULT_SITES = [
  { name: "Pyramides de Gizeh", location: "Le Caire, Égypte", lat: 29.9792, lng: 31.1342, image_url: "images/sites_populaires/pyramides_de_gizeh.jpg", country_slug: "egypte" },
  { name: "Mont Kilimandjaro", location: "Tanzanie", lat: -3.0674, lng: 37.3556, image_url: "images/sites_populaires/kilimendjaro.jpg", country_slug: "tanzanie" },
  { name: "Chutes Victoria", location: "Livingstone, Zambie / Zimbabwe", lat: -17.9243, lng: 25.8572, image_url: "images/sites_populaires/chute_victoria.jpg", country_slug: "zambie" },
  { name: "Île de Gorée", location: "Dakar, Sénégal", lat: 14.6675, lng: -17.3986, image_url: "images/sites_populaires/ile_de_goree.jpg", country_slug: "senegal" },
  { name: "Mont Loura (Dame de Mali)", location: "Fouta Djallon, Guinée", lat: 12.0667, lng: -12.3000, image_url: "images/sites des pays/guinee/loura.png", country_slug: "guinee" },
  { name: "Parc National du Serengeti", location: "Tanzanie", lat: -2.3333, lng: 34.8333, image_url: "images/sites_populaires/serengeti.jpg", country_slug: "tanzanie" },
  { name: "Table Mountain", location: "Le Cap, Afrique du Sud", lat: -33.9628, lng: 18.4098, image_url: "images/sites_populaires/table_montain.jpg", country_slug: "afrique_du_sud" },
  { name: "Delta de l'Okavango", location: "Botswana", lat: -19.3000, lng: 22.9000, image_url: "images/pays/Afrique_Australe/botswana.jpg", country_slug: "botswana" },
  { name: "Désert du Namib", location: "Sossusvlei, Namibie", lat: -24.7272, lng: 15.3411, image_url: "images/pays/Afrique_Australe/namibie.jpg", country_slug: "namibie" },
  { name: "Tsingy de Bemaraha", location: "Madagascar", lat: -18.6667, lng: 44.7500, image_url: "images/pays/Afrique_Est/madagascar.jpg", country_slug: "madagascar" }
];

// Données actives (initialisées immédiatement avec les 54 pays de secours)
let countriesData = [...DEFAULT_COUNTRIES];
let countriesRaw = [...DEFAULT_COUNTRIES];

// Détection de l'URL API (local vs production/hébergement statique)
const getApiUrl = (path) => {
  if (window.location.port === '5502' || window.location.port === '5500') {
    return `http://127.0.0.1:8000${path}`;
  }
  // Sur GitHub Pages ou domaine sans backend, ne pas renvoyer une URL relative menant à 404
  return path;
};

/* ---------- État UI ---------- */
let state = {
  page: 1,
  perPage: 9,
  region: "all",
  query: ""
};

/* ---------- Références DOM ---------- */
const countriesSection = document.getElementById("countriesSection");
const searchInput = document.getElementById("searchInput");
const regionSelect = document.getElementById("regionSelect");
const perPageSelect = document.getElementById("perPage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pagesWrap = document.getElementById("pages");

/* Modal refs */
const modal = document.getElementById("countryModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalFlag = document.getElementById("modalFlag");
const modalRegion = document.getElementById("modalRegion");
const modalCapital = document.getElementById("modalCapital");
const modalPopulation = document.getElementById("modalPopulation");
const modalDesc = document.getElementById("modalDesc");
const moreLink = document.getElementById("moreLink");

/* ---------- Chargement des Données ---------- */
async function loadCountries() {
  // Affiche immédiatement les cartes avec les données par défaut pour éviter tout écran vide
  renderCards();

  // Ne tente la requête API que si nous sommes en local (port 8000, 5500, 5502) ou sur un vrai serveur backend
  const isLocalOrBackend = window.location.hostname === '127.0.0.1' || 
                           window.location.hostname === 'localhost' ||
                           (window.location.port && window.location.port !== '');

  if (isLocalOrBackend) {
    try {
      const response = await fetch(getApiUrl('/api/countries'));
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          countriesRaw = data;
          countriesData = data.map(c => {
            let img = c.image_url;
            if (!img || img.includes('default.jpg') || img.includes('default.png')) {
              const fallback = DEFAULT_COUNTRIES.find(dc => dc.id === c.slug);
              if (fallback) img = fallback.img;
            }
            return {
              id: c.slug,
              name: c.name,
              region: c.region || "Afrique",
              capital: c.capital || "N/A",
              population: c.population || "N/A",
              img: img || "images/pays/default.jpg",
              desc: c.description || "",
              more: `les differents pays/${c.slug === 'cap_vert' ? 'capVert' : c.slug}.html`
            };
          });
          renderCards();
        }
      }
    } catch (error) {
      console.warn("API indisponible, fonctionnement fluide en mode statique / hors-ligne:", error);
    }
  }
}

/* ---------- Filtrage & Affichage des Cartes ---------- */
function filterData() {
  const q = state.query.trim().toLowerCase();
  const r = state.region;

  return countriesData.filter(c => {
    const matchQuery = q === "" || 
                       (c.name && c.name.toLowerCase().includes(q)) || 
                       (c.desc && c.desc.toLowerCase().includes(q)) ||
                       (c.capital && c.capital.toLowerCase().includes(q));
    const matchRegion = r === "all" || c.region === r;
    return matchQuery && matchRegion;
  });
}

function renderCards() {
  if (!countriesSection) return;

  const filtered = filterData();
  const total = filtered.length;
  const start = (state.page - 1) * state.perPage;
  const end = start + state.perPage;
  const pageItems = filtered.slice(start, end);

  countriesSection.innerHTML = "";

  if (pageItems.length === 0) {
    countriesSection.innerHTML = `<div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px; font-size: 1.1rem; color: #666;">Aucun pays ne correspond à votre recherche.</div>`;
    renderPagination(total);
    return;
  }

  for (const c of pageItems) {
    const card = document.createElement("article");
    card.className = "card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-pressed", "false");
    card.innerHTML = `
      <div class="card-figure">
        <img src="${c.img}" alt="Photo de ${c.name}" loading="lazy" onerror="this.src='images/pays/default.jpg'" />
      </div>
      <div class="card-body">
        <div class="card-title">${c.name}</div>
        <div class="card-region">${c.region} • Capitale : ${c.capital}</div>
        <div class="card-desc">${c.desc}</div>
        <div class="card-actions">
          <button class="btn btn-open" data-id="${c.id}">Aperçu</button>
          <a class="btn ghost" href="${c.more}" target="_blank" rel="noopener">Découvrir</a>
        </div>
      </div>
    `;
    
    // Ouvrir modal au clic sur le bouton Aperçu ou Enter
    card.querySelector(".btn-open").addEventListener("click", () => openModal(c.id));
    card.addEventListener("keydown", (ev) => { 
      if (ev.key === "Enter") openModal(c.id); 
    });
    countriesSection.appendChild(card);
  }

  renderPagination(total);
}

/* ---------- Pagination ---------- */
function renderPagination(totalItems) {
  if (!pagesWrap || !prevBtn || !nextBtn) return;

  const totalPages = Math.max(1, Math.ceil(totalItems / state.perPage));
  pagesWrap.innerHTML = "";

  for (let p = 1; p <= totalPages; p++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = (p === state.page) ? "page active" : "page";
    btn.textContent = p;
    btn.addEventListener("click", () => {
      state.page = p;
      renderCards();
      window.scrollTo({ top: 200, behavior: "smooth" });
    });
    pagesWrap.appendChild(btn);
  }

  prevBtn.disabled = state.page <= 1;
  nextBtn.disabled = state.page >= totalPages;
}

/* ---------- Modal de Détail ---------- */
async function openModal(id) {
  if (!modal) return;

  const country = countriesData.find(c => c.id === id);
  if (!country) return;

  modal.setAttribute("aria-hidden", "false");
  modalTitle.textContent = country.name;
  modalSubtitle.textContent = `${country.region} • Capitale : ${country.capital}`;
  modalFlag.src = country.img;
  modalFlag.alt = `Image de ${country.name}`;
  modalFlag.onerror = function() { this.src = 'images/pays/default.jpg'; };
  modalRegion.textContent = country.region;
  modalCapital.textContent = country.capital;
  modalPopulation.textContent = country.population;
  modalDesc.textContent = country.desc;
  moreLink.href = country.more;

  // Charger les sites touristiques correspondants
  renderModalSites(id);

  if (modalClose) modalClose.focus();
}

async function renderModalSites(countrySlug) {
  let list = document.getElementById('sitesList');

  // Si le conteneur n'existe pas dans le HTML, on le crée dynamiquement
  if (!list) {
    const modalInfo = document.querySelector('.modal-info');
    const desc = document.getElementById('modalDesc');
    if (modalInfo && desc) {
      const container = document.createElement('div');
      container.id = 'modalSites';
      container.style.cssText = 'margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px;';
      container.innerHTML = `
        <p style="font-weight: bold; margin-bottom: 8px;"><i class="fas fa-map-location-dot"></i> Sites à découvrir :</p>
        <div id="sitesList" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
      `;
      modalInfo.insertBefore(container, desc);
      list = document.getElementById('sitesList');
    }
  }

  if (!list) return;

  // Filtrer parmi les sites par défaut
  const matchedSites = DEFAULT_SITES.filter(s => s.country_slug === countrySlug);
  list.innerHTML = '';

  if (matchedSites.length > 0) {
    matchedSites.forEach(s => {
      const badge = document.createElement('span');
      badge.style.cssText = 'background: #f8f9fa; border: 1px solid #dee2e6; padding: 4px 10px; border-radius: 15px; font-size: 0.85rem; color: #555;';
      badge.innerHTML = `<i class="fas fa-location-dot text-primary me-1"></i> ${s.name}`;
      list.appendChild(badge);
    });
  } else {
    list.innerHTML = `<span class="text-muted small">Explorez la page détaillée pour découvrir tous les trésors de ce pays.</span>`;
  }
}

function closeModal() {
  if (modal) modal.setAttribute("aria-hidden", "true");
}

/* Événements Modal */
if (modalClose) modalClose.addEventListener("click", closeModal);
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ---------- Événements Contrôles (Recherche, Filtres, Pagination) ---------- */
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    state.query = e.target.value;
    state.page = 1;
    renderCards();
  });
}

if (regionSelect) {
  regionSelect.addEventListener("change", (e) => {
    state.region = e.target.value;
    state.page = 1;
    renderCards();
  });
}

if (perPageSelect) {
  perPageSelect.addEventListener("change", (e) => {
    state.perPage = parseInt(e.target.value, 10);
    state.page = 1;
    renderCards();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (state.page > 1) { 
      state.page--; 
      renderCards(); 
      window.scrollTo({ top: 200, behavior: "smooth" }); 
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    state.page++; 
    renderCards(); 
    window.scrollTo({ top: 200, behavior: "smooth" });
  });
}

/* ---------- Carte Interactive d'Afrique (Leaflet) ---------- */
let map;
let markers = [];

async function initAfricaMap() {
  const mapElement = document.getElementById('africaMap');
  if (!mapElement || typeof L === 'undefined') return;

  // Initialisation de la carte
  map = L.map('africaMap').setView([2, 20], 3.2);

  // Couche cartographique OpenStreetMap / CartoDB
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // Utilisation directe des sites par défaut avec coordonnées
  DEFAULT_SITES.forEach(site => {
    if (site.lat && site.lng) {
      const marker = L.marker([site.lat, site.lng]).addTo(map);
      const popupContent = `
        <div class="map-popup" style="max-width: 180px;">
          <img src="${site.image_url}" alt="${site.name}" style="width:100%; height:75px; object-fit:cover; border-radius:4px;" onerror="this.src='images/pays/default.jpg'">
          <h4 style="margin: 6px 0 2px; font-size: 13px; font-weight: bold;">${site.name}</h4>
          <p style="margin: 0; font-size: 11px; color: #666;">${site.location}</p>
        </div>
      `;
      marker.bindPopup(popupContent, { maxWidth: 200 });
      markers.push(marker);
    }
  });
}

/* ---------- Démarrage de l'Application ---------- */
function init() {
  if (perPageSelect) {
    perPageSelect.value = String(state.perPage);
  }

  // Chargement des données des pays
  loadCountries();

  // Gestion du paramètre URL ?country=slug
  const urlParams = new URLSearchParams(window.location.search);
  const countryParam = urlParams.get('country');
  if (countryParam) {
    setTimeout(() => {
      openModal(countryParam);
    }, 150);
  }

  // Initialiser la carte Leaflet
  initAfricaMap();
}

// Lancement au chargement du DOM ou immédiatement si déjà chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
