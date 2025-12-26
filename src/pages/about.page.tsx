import React, { useState, useEffect, useRef } from 'react';
import { User, Users, BookOpen, BarChart3, Grid3X3, List, ChevronRight } from 'lucide-react';
import * as d3 from 'd3';

// Sample data arrays for reusability
const historyData = {
  title: "Our Journey of Faith",
  founding: "1995",
  content: [
    {
      year: "1995",
      title: "Foundation",
      description: "Shelter of Praise Assembly of God was founded with a vision to create a loving community of believers in Cagayan de Oro."
    },
    {
      year: "2000",
      title: "Growth & Expansion",
      description: "Our congregation grew to over 200 members, and we expanded our community outreach programs."
    },
    {
      year: "2010",
      title: "New Facilities",
      description: "Construction of our current sanctuary was completed, providing a larger space for worship and fellowship."
    },
    {
      year: "2020",
      title: "Digital Ministry",
      description: "Adapted to serve our community through online services and digital outreach during challenging times."
    }
  ]
};

const membersData = [
  { id: 1, name: "Wilmer Balasa", role: "Senior Pastor", department: "Ministry", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/1_Wilmer.Balasa.jpg?raw=true", active: true },
  { id: 2, name: "Nora Balasa", role: "Senior Pastor", department: "Ministry", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/2_Nora.Baletin.Balasa.jpg?raw=true", active: true },
  { id: 3, name: "Jherico John Balasa", role: "Youth Pastor", department: "Worship", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/9_Jherico.John.Balasa.jpg?raw=true", active: true },
  { id: 4, name: "Christine Merra Balasa", role: "Leader", department: "Worship", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/4_Christine.Merra.Baletin.Balasa.jpg?raw=true", active: true },
  { id: 5, name: "Monico Dofeliz Degorio", role: "Associate Pastor", department: "Ministry", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/44_Monico.Dofeliz.Degorio.jpg?raw=true", active: true },
  { id: 6, name: "Kralle Maravelles", role: "Leader", department: "Ministry", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/16_Kralle.Maravelles.jpg?raw=true", active: true },
  { id: 7, name: "Rexter Clave Gabutin", role: "Leader", department: "Ministry", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/5.1_Rexter.Gabutin.jpg?raw=true", active: true },
  { id: 8, name: "Cherry Mae Faith Perote", role: "Leader", department: "Ministry", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/43_Cherry.Mae.Faith.Perote.jpg?raw=true", active: true },
  { id: 9, name: "Divmer Janssen Espallardo", role: "Leader", department: "Ministry", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/7_Divmer.Esperaldo.jpg?raw=true", active: true },
  { id: 10, name: "Eunel Dave Bolonos", role: "Leader", department: "Ministry", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/21_Eunel.Bolonos.jpg?raw=true", active: true },
  { id: 11, name: "Janna Dalagan", role: "Leader", department: "Production", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/17_Janna.Dallagan.jpg?raw=true", active: true },
  { id: 12, name: "Shamel Agua", role: "Leader", department: "Administration", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/25_Sham.Agua.10.2025.jpg?raw=true", active: true },
  { id: 13, name: "Khrystle Claire Deasis", role: "Leader", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/24_Khrystle.Deasis.jpg?raw=true", active: true },
  { id: 14, name: "Mary Ashley Entrina", role: "Leader", department: "Worship", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/22_Ashley.Entrina.jpg?raw=true", active: true },
  { id: 15, name: "Ailen Villagracia", role: "Leader", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/47_Ailen.Villagracia.jpg?raw=true", active: true },
  { id: 16, name: "Trisha Maravelles", role: "Leader", department: "Ministry", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/15_Trisha.Maraveles.jpg?raw=true", active: true },
  { id: 17, name: "Allaysa Fantilaga", role: "Leader", department: "Ministry", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/12_Allaysa.Fantilaga.jpg?raw=true", active: true },
  { id: 18, name: "Jeshaiah Fantilaga", role: "Leader", department: "Ministry", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/13_Jeshiah.Fantiliga.jpg?raw=true", active: true },
  { id: 19, name: "Abbygail Saldo", role: "Leader", department: "Relationship", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/AbygailSaldo/A_S_7.jpg?raw=true", active: true },
  { id: 20, name: "JB Maderse", role: "Leader", department: "Worship & Sports", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/27_JB.Maderse.jpg?raw=true", active: true },
  { id: 21, name: "Precious Loloy", role: "Leader", department: "Worship", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/30_Precious.Loloy.jpg?raw=true", active: true },
  { id: 22, name: "Carla Shine Pulmones", role: "Leader", department: "Worship", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/19_Carla.Shine.jpg?raw=true", active: true },
  { id: 23, name: "Kaye Trenilla", role: "Leader", department: "Worship", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/14_Kaye.Trenilla.jpg?raw=true", active: true },
  { id: 24, name: "Mark Stephen Frondozo", role: "Leader", department: "Worship", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/6_Mark.Stephen.Frondozo.jpg?raw=true", active: false },
  { id: 25, name: "KC Seria", role: "Leader", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/23_Kc.Seria.jpg?raw=true", active: true },
  { id: 26, name: "Gello Azucena", role: "Leader", department: "Worship", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/41_Gello.Azucena.jpg?raw=true", active: true },
  { id: 27, name: "Jhon Lee Tapio", role: "Leader", department: "Worship", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/36_JohnLee.Tapio.jpg?raw=true", active: true },
  { id: 28, name: "Mariel Flores", role: "Leader", department: "Worship", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/11_Mariel.Florres.jpg?raw=true", active: true },
  { id: 29, name: "Kim Nicole Suela", role: "Leader", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/20_Kim.Nicole.jpg?raw=true", active: true },
  { id: 30, name: "Junril Agerto", role: "House Leader", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/53_Junril.Agerto.jpg?raw=true", active: true },
  { id: 31, name: "Lyka Rose Berdaga", role: "House Leader", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/40_Lyka.Rose.Berdaga.jpg?raw=true", active: true },
  { id: 32, name: "Kate Toledo", role: "House Leader", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/42_Kate.Toledo.jpg?raw=true", active: true },
  { id: 33, name: "Christene Faith Sagsago", role: "House Leader", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/48_Christene.Faith.Sagsago.jpg?raw=true", active: true },
  { id: 34, name: "Drexlen Kate Balasa", role: "?", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/26_Drexlyn.Kate.Balasa.jpg?raw=true", active: true },
  { id: 35, name: "April Segre", role: "?", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/18_April.Segre.jpg?raw=true", active: true },
  { id: 36, name: "Kim Nicole Miranda", role: "Leader", department: "Relationship", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/38_Kim.Nicole.Miranda.jpg?raw=true", active: false },
  { id: 37, name: "Jhon Benedeck Liguan", role: "Leader", department: "Worship", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/39_John.Benedeck.Liguan.jpg?raw=true", active: true },
  { id: 38, name: "Carmen Sagsago", role: "Leader", department: "Administration", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/31_Carmen.Sagsago.jpg?raw=true", active: true },
  { id: 39, name: "Chejay Balasa", role: "Leader", department: "Administration", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/29_Chejay.Balasa.jpg?raw=true", active: true },
  { id: 40, name: "Evelyn Toledo", role: "Leader", department: "Administration", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/28_Evelyn.Toledo.jpg?raw=true", active: true },
  { id: 41, name: "Albert Elijino", role: "Leader", department: "Worship", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/32_Albert.Elejino.jpg?raw=true", active: true },
  { id: 42, name: "Whendylyn Balasa", role: "?", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/33_Whedylyn.Balasa.jpg?raw=true", active: true },
  { id: 43, name: "Marivic Toledo", role: "Leader", department: "Administration", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/34_MarivicToledo.jpg?raw=true", active: true },
  { id: 44, name: "Maricel Trenilla", role: "Leader", department: "Administration", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/49_Maricel.Trenilla.jpg?raw=true", active: true },
  { id: 45, name: "Agot Jhie Fantilaga", role: "Leader", department: "Administration", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/55_Agot.Jhie.Fantilaga.jpg?raw=true", active: true },
  { id: 46, name: "Shiela Marie Araujo", role: "Leader", department: "Ministry", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/51_Sheila.Marie.Araujo.jpg?raw=true", active: true },
  { id: 47, name: "Merfreda Trenilla", role: "Leader", department: "Administration", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/52_Merfreda.Trenilla.jpg?raw=true", active: true },
  { id: 48, name: "MJ Padsing", role: "Leader", department: "Administration", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/56_MJ.Padsing.jpg?raw=true", active: true },
  { id: 49, name: "Celfa Degorio", role: "?", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/50_Celfa.Degorio.jpg?raw=true", active: true },
  { id: 50, name: "Joy Frondozo", role: "?", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/54_Joy.Frondozo.jpg?raw=true", active: true },
  { id: 51, name: "Kristine Dejan", role: "?", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/45_Kristine.Dejan.jpg?raw=true", active: true },
  { id: 52, name: "Edrian Deparon", role: "?", department: "?", image: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/46_Edrian.Deparon.jpg?raw=true", active: true }
];

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [membersLayout, setMembersLayout] = useState('carousel');
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel animation
  useEffect(() => {
    if (activeTab === 'members' && membersLayout === 'carousel') {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % 2); // 2 slides total
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [activeTab, membersLayout]);

  const renderHistory = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{historyData.title}</h2>
        <p className="text-lg text-gray-600">Founded in {historyData.founding}</p>
      </div>
      
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
        {historyData.content.map((item, index) => (
          <div key={index} className="relative flex items-start mb-12">
            <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
            <div className="ml-16">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <div className="flex items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 ml-4">{item.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMembersCarousel = () => {
    const rows = [
      membersData.slice(0, 4),
      membersData.slice(4, 8),
      membersData.slice(8, 12),
      membersData.slice(12, 16),
      membersData.slice(16, 20),
      membersData.slice(20, 24),
      membersData.slice(24, 28),
      membersData.slice(28, 32),
      membersData.slice(32, 36),
      membersData.slice(36, 40),
      membersData.slice(40, 44),
      membersData.slice(44, 48),
      membersData.slice(48, 52),
      
    ];

    return (
      <div className="space-y-6 overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h2>
          <p className="text-lg text-gray-600">Meet the people who make our ministry possible</p>
        </div>
        
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="relative overflow-hidden">
            <div 
              className="flex space-x-4 transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(${
                  rowIndex % 2 === 0 
                    ? -currentSlide * 320 
                    : currentSlide * 320
                }px)`
              }}
            >
              {row.concat(row).map((member, index) => (
                <div 
                  key={`${member.id}-${index}`} 
                  className="flex-shrink-0 w-64 bg-white rounded-xl shadow-lg overflow-hidden border"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  {/* Person Profile | <User size={64} className="text-gray-400" />*/}
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800">{member.name}</h3>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                    <p className="text-sm text-gray-500">{member.department}</p>
                    <div className="mt-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        member.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {member.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMembersList = () => (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Team Directory</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {membersData.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        {/*<User size={20} className="text-gray-400" />*/}
                        <img src={member.image} style={{width: '40px', height: '40px' }}/>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    member.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {member.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMembersGraph = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    React.useEffect(() => {
      if (!svgRef.current) return;

      if (!svgRef.current) return;

      // Clear previous content
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const width = 1000;
      const height = 600;
      
      svg.attr("width", width).attr("height", height);

      // Create hierarchical data structure
      interface OrgNode {
        name: string;
        role: string;
        children?: OrgNode[];
      }

      const hierarchyData: OrgNode = {
        name: "Pastor John Dukes",
        role: "Senior Pastor",
        children: [
          {
            name: "Jerry Helfer",
            role: "Associate Pastor",
            children: [
              { name: "Patricia Sanders", role: "Worship Leader" },
              { name: "Stephanie Neal", role: "Youth Pastor" },
              { name: "Rhonda Rhodes", role: "Children's Director" }
            ]
          },
          {
            name: "Kurt Bates",
            role: "Deacon",
            children: [
              { name: "Stephanie Shankey", role: "Secretary" },
              { name: "James Hall", role: "Tech Director" },
              { name: "Tom Cooper", role: "Evangelist" }
            ]
          },
          {
            name: "Leslie Lawson",
            role: "Prayer Coordinator",
            children: [
              { name: "Kristin Watson", role: "Community Liaison" },
              { name: "Annette Black", role: "Hospitality" },
              { name: "Floyd Miles", role: "Maintenance" }
            ]
          },
          {
            name: "Cody Fisher",
            role: "Sound Engineer",
            children: [
              { name: "Theresa Webb", role: "Counselor" },
              { name: "Tim Simmons", role: "Security" }
            ]
          }
        ]
      };

      const root = d3.hierarchy<OrgNode>(hierarchyData);
      const treeLayout = d3.tree<OrgNode>().size([width - 100, height - 100]);
      treeLayout(root);

      // Create group for the entire tree
      const g = svg.append("g").attr("transform", "translate(50, 50)");

      // Add links
      const linkGenerator = d3.linkHorizontal<d3.HierarchyLink<OrgNode>, [number, number]>()
        .x(d => d.y)
        .y(d => d.x);

      g.selectAll<SVGPathElement, d3.HierarchyLink<OrgNode>>(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", linkGenerator)
        .style("fill", "none")
        .style("stroke", "#3b82f6")
        .style("stroke-width", 2);

      // Add nodes
      const nodes = g.selectAll<SVGGElement, d3.HierarchyNode<OrgNode>>(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`);

      // Add circles for nodes
      nodes.append("circle")
        .attr("r", 25)
        .style("fill", d => d.depth === 0 ? "#1e40af" : d.depth === 1 ? "#3b82f6" : "#60a5fa")
        .style("stroke", "#ffffff")
        .style("stroke-width", 3);

      // Add user icons
      nodes.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .style("fill", "white")
        .style("font-size", "16px")
        .text("👤");

      // Add name labels
      nodes.append("text")
        .attr("dy", d => d.children ? -40 : 40)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "12px")
        .style("fill", "#1f2937")
        .text(d => d.data.name);

      // Add role labels
      nodes.append("text")
        .attr("dy", d => d.children ? -25 : 55)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "#6b7280")
        .text(d => d.data.role);

    }, []);

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Organizational Structure</h2>
          <p className="text-lg text-gray-600">Church Leadership Hierarchy</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 overflow-x-auto">
          <svg ref={svgRef} width="100%" height="600"></svg>
        </div>
      </div>
    );
  };

  const renderMembers = () => {
    switch (membersLayout) {
      case 'carousel':
        return renderMembersCarousel();
      case 'list':
        return renderMembersList();
      case 'graph':
        return renderMembersGraph();
      default:
        return renderMembersCarousel();
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 relative">
      {/* Floating Navigation */}
      <div 
        className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300"
        onMouseEnter={() => setIsNavVisible(true)}
        onMouseLeave={() => setIsNavVisible(false)}
      >
        <div className={`bg-white shadow-lg rounded-r-lg transition-transform duration-300 ${
          isNavVisible ? 'translate-x-0' : '-translate-x-56'
        }`}>
          <div className="p-4 space-y-3">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📖 About Us</h3>
            
            <button
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'history' 
                  ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <BookOpen size={20} />
              <span>History</span>
            </button>

            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('members')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'members' 
                    ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Users size={20} />
                <span>Members</span>
              </button>
              
              {activeTab === 'members' && (
                <div className="ml-4 space-y-2">
                  <button
                    onClick={() => setMembersLayout('carousel')}
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded ${
                      membersLayout === 'carousel' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <Grid3X3 size={16} />
                    <span>Carousel</span>
                  </button>
                  <button
                    onClick={() => setMembersLayout('list')}
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded ${
                      membersLayout === 'list' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <List size={16} />
                    <span>List</span>
                  </button>
                  <button
                    onClick={() => setMembersLayout('graph')}
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded ${
                      membersLayout === 'graph' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <BarChart3 size={16} />
                    <span>Graph</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Hover indicator */}
          <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
            <div className="bg-white shadow-md rounded-r-md p-2">
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center text-gray-800">About Us</h1>
        
        <div className="min-h-screen">
          {activeTab === 'history' && renderHistory()}
          {activeTab === 'members' && renderMembers()}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;