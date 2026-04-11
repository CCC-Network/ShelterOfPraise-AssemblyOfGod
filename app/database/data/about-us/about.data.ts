// src/pages/about/about.data.ts

/* ── Types ──────────────────────────────────────────────────── */
export interface MemberProfile {
  id: number;
  name: string;
  role: string;
  department: string;
  image: string;
  active: boolean;
  // Extended profile fields (used in CongregationProfileView)
  age?: number;
  birthdate?: string;
  school?: string;
  address?: string;
  favoriteVerse?: string;
  album?: string[]; // gallery image URLs
}

export interface HistoryItem {
  year: string;
  title: string;
  description: string;
}

export interface HistoryData {
  title: string;
  founding: string;
  content: HistoryItem[];
}

/* ── History Data ───────────────────────────────────────────── */
export const historyData: HistoryData = {
  title: "Our Journey of Faith",
  founding: "1995",
  content: [
    {
      year: "1995",
      title: "Foundation",
      description:
        "Shelter of Praise Assembly of God was founded with a vision to create a loving community of believers in Cagayan de Oro.",
    },
    {
      year: "2000",
      title: "Growth & Expansion",
      description:
        "Our congregation grew to over 200 members, and we expanded our community outreach programs.",
    },
    {
      year: "2010",
      title: "New Facilities",
      description:
        "Construction of our current sanctuary was completed, providing a larger space for worship and fellowship.",
    },
    {
      year: "2020",
      title: "Digital Ministry",
      description:
        "Adapted to serve our community through online services and digital outreach during challenging times.",
    },
  ],
};

/* ── Org Chart Data (used by Graph view) ───────────────────── */
export interface OrgNode {
  name: string;
  role: string;
  image?: string;
  children?: OrgNode[];
}

export const orgChartData: OrgNode = {
  name: "Wilmer Balasa",
  role: "Senior Pastor",
  image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/1_Wilmer.Balasa.jpg?raw=true",
  children: [
    {
      name: "Monico Dofeliz Degorio",
      role: "Associate Pastor",
      image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/44_Monico.Dofeliz.Degorio.jpg?raw=true",
      children: [
        { name: "Jherico John Balasa",   role: "Youth Pastor",   image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/9_Jherico.John.Balasa.jpg?raw=true" },
        { name: "Kralle Maravelles",     role: "Ministry Leader", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/16_Kralle.Maravelles.jpg?raw=true" },
        { name: "Rexter Clave Gabutin",  role: "Ministry Leader", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/5.1_Rexter.Gabutin.jpg?raw=true" },
      ],
    },
    {
      name: "Nora Balasa",
      role: "Senior Pastor",
      image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/2_Nora.Baletin.Balasa.jpg?raw=true",
      children: [
        { name: "Christine Merra Balasa", role: "Worship Leader", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/4_Christine.Merra.Baletin.Balasa.jpg?raw=true" },
        { name: "Shamel Agua",            role: "Administration",  image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/25_Sham.Agua.10.2025.jpg?raw=true" },
        { name: "Carmen Sagsago",         role: "Administration",  image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/31_Carmen.Sagsago.jpg?raw=true" },
      ],
    },
    {
      name: "Janna Dalagan",
      role: "Production Leader",
      image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/17_Janna.Dallagan.jpg?raw=true",
      children: [
        { name: "Albert Elijino",       role: "Worship Leader",  image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/32_Albert.Elejino.jpg?raw=true" },
        { name: "Jhon Lee Tapio",       role: "Worship Leader",  image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/36_JohnLee.Tapio.jpg?raw=true" },
      ],
    },
  ],
};

/* ── Members Data ───────────────────────────────────────────── */
export const membersData: MemberProfile[] = [
  {
    id: 1, name: "Wilmer Balasa", role: "Senior Pastor", department: "Ministry",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/1_Wilmer.Balasa.jpg?raw=true",
    active: true, favoriteVerse: "Joshua 24:15", address: "Kalilangan, Bukidnon",
    album: [
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/WilmerBalasa/W_B_1.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/WilmerBalasa/W_B_2.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/WilmerBalasa/W_B_3.jpg?raw=true"
    ],
  },
  {
    id: 2, name: "Nora Balasa", role: "Senior Pastor", department: "Ministry",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/2_Nora.Baletin.Balasa.jpg?raw=true",
    active: true, favoriteVerse: "Proverbs 31:25", address: "Kalilangan, Bukidnon",
    album: [
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/NoraBalasa/N_B_1.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/NoraBalasa/N_B_2.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/NoraBalasa/N_B_3.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/NoraBalasa/N_B_4.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/NoraBalasa/N_B_5.jpg?raw=true"
    ],
  },
  {
    id: 3, name: "Jherico John Balasa", role: "Youth Pastor", department: "Worship",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/9_Jherico.John.Balasa.jpg?raw=true",
    active: true, album: [
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JhericoBalasa/J_J_B_1.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JhericoBalasa/J_J_B_2.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JhericoBalasa/J_J_B_3.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JhericoBalasa/J_J_B_4.jpg?raw=true"
    ],
  },
  {
    id: 4, name: "Christine Merra Balasa", role: "Leader", department: "Worship",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/4_Christine.Merra.Baletin.Balasa.jpg?raw=true",
    active: true, album: [
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/ChristineMerraBalasa/C_M_B_1.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/ChristineMerraBalasa/C_M_B_2.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/ChristineMerraBalasa/C_M_B_3.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/ChristineMerraBalasa/C_M_B_4.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/ChristineMerraBalasa/C_M_B_5.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/ChristineMerraBalasa/C_M_B_6.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/ChristineMerraBalasa/C_M_B_7.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/ChristineMerraBalasa/C_M_B_8.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/ChristineMerraBalasa/C_M_B_9.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/ChristineMerraBalasa/C_M_B_10.jpg?raw=true",
      "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/ChristineMerraBalasa/C_M_B_11.jpg?raw=true"
    ],
  },
  {
    id: 5, name: "Monico Dofeliz Degorio", role: "Associate Pastor", department: "Ministry",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/44_Monico.Dofeliz.Degorio.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 6, name: "Kralle Maravelles", role: "Leader", department: "Ministry",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/16_Kralle.Maravelles.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 7, name: "Rexter Clave Gabutin", role: "Leader", department: "Ministry",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/5.1_Rexter.Gabutin.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 8, name: "Cherry Mae Faith Perote", role: "Leader", department: "Ministry",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/43_Cherry.Mae.Faith.Perote.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 9, name: "Divmer Janssen Espallardo", role: "Leader", department: "Ministry",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/7_Divmer.Esperaldo.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 10, name: "Eunel Dave Bolonos", role: "Leader", department: "Ministry",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/21_Eunel.Bolonos.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 11, name: "Janna Dalagan", role: "Leader", department: "Production",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/17_Janna.Dallagan.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 12, name: "Shamel Agua", role: "Leader", department: "Administration",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/25_Sham.Agua.10.2025.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 13, name: "Khrystle Claire Deasis", role: "Leader", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/24_Khrystle.Deasis.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 14, name: "Mary Ashley Entrina", role: "Leader", department: "Worship",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/22_Ashley.Entrina.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 15, name: "Ailen Villagracia", role: "Leader", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/47_Ailen.Villagracia.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 16, name: "Trisha Maravelles", role: "Leader", department: "Ministry",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/15_Trisha.Maraveles.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 17, name: "Allaysa Fantilaga", role: "Leader", department: "Ministry",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/12_Allaysa.Fantilaga.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 18, name: "Jeshaiah Fantilaga", role: "Leader", department: "Ministry",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/13_Jeshiah.Fantiliga.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 19, name: "Abbygail Saldo", role: "Leader", department: "Relationship",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/AbygailSaldo/A_S_7.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 20, name: "JB Maderse", role: "Leader", department: "Worship & Sports",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/27_JB.Maderse.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 21, name: "Precious Loloy", role: "Leader", department: "Worship",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/30_Precious.Loloy.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 22, name: "Carla Shine Pulmones", role: "Leader", department: "Worship",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/19_Carla.Shine.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 23, name: "Kaye Trenilla", role: "Leader", department: "Worship",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/14_Kaye.Trenilla.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 24, name: "Mark Stephen Frondozo", role: "Leader", department: "Worship",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/6_Mark.Stephen.Frondozo.jpg?raw=true",
    active: false, album: [],
  },
  {
    id: 25, name: "KC Seria", role: "Leader", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/23_Kc.Seria.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 26, name: "Gello Azucena", role: "Leader", department: "Worship",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/41_Gello.Azucena.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 27, name: "Jhon Lee Tapio", role: "Leader", department: "Worship",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/36_JohnLee.Tapio.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 28, name: "Mariel Flores", role: "Leader", department: "Worship",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/11_Mariel.Florres.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 29, name: "Kim Nicole Suela", role: "Leader", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/20_Kim.Nicole.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 30, name: "Junril Agerto", role: "House Leader", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/53_Junril.Agerto.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 31, name: "Lyka Rose Berdaga", role: "House Leader", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/40_Lyka.Rose.Berdaga.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 32, name: "Kate Toledo", role: "House Leader", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/42_Kate.Toledo.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 33, name: "Christene Faith Sagsago", role: "House Leader", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/48_Christene.Faith.Sagsago.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 34, name: "Drexlen Kate Balasa", role: "—", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/26_Drexlyn.Kate.Balasa.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 35, name: "April Segre", role: "—", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/18_April.Segre.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 36, name: "Kim Nicole Miranda", role: "Leader", department: "Relationship",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/38_Kim.Nicole.Miranda.jpg?raw=true",
    active: false, album: [],
  },
  {
    id: 37, name: "Jhon Benedeck Liguan", role: "Leader", department: "Worship",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/39_John.Benedeck.Liguan.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 38, name: "Carmen Sagsago", role: "Leader", department: "Administration",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/31_Carmen.Sagsago.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 39, name: "Chejay Balasa", role: "Leader", department: "Administration",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/29_Chejay.Balasa.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 40, name: "Evelyn Toledo", role: "Leader", department: "Administration",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/28_Evelyn.Toledo.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 41, name: "Albert Elijino", role: "Leader", department: "Worship",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/32_Albert.Elejino.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 42, name: "Whendylyn Balasa", role: "—", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/33_Whedylyn.Balasa.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 43, name: "Marivic Toledo", role: "Leader", department: "Administration",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/34_MarivicToledo.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 44, name: "Maricel Trenilla", role: "Leader", department: "Administration",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/49_Maricel.Trenilla.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 45, name: "Agot Jhie Fantilaga", role: "Leader", department: "Administration",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/55_Agot.Jhie.Fantilaga.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 46, name: "Shiela Marie Araujo", role: "Leader", department: "Ministry",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/51_Sheila.Marie.Araujo.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 47, name: "Merfreda Trenilla", role: "Leader", department: "Administration",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/52_Merfreda.Trenilla.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 48, name: "MJ Padsing", role: "Leader", department: "Administration",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/56_MJ.Padsing.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 49, name: "Celfa Degorio", role: "—", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/50_Celfa.Degorio.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 50, name: "Joy Frondozo", role: "—", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/54_Joy.Frondozo.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 51, name: "Kristine Dejan", role: "—", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/45_Kristine.Dejan.jpg?raw=true",
    active: true, album: [],
  },
  {
    id: 52, name: "Edrian Deparon", role: "—", department: "—",
    image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/46_Edrian.Deparon.jpg?raw=true",
    active: true, album: [],
  },
];
