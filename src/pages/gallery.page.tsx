import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Search, Grid, List, Columns, Square, Grid3x3, ChevronDown } from 'lucide-react';

// Type definitions
interface GalleryImage {
  id: number;
  src: string;
  name: string;
  description: string;
}

interface GalleryEvent {
  eventName: string;
  date: string;
  images: GalleryImage[];
}

interface GalleryData {
  [year: string]: GalleryEvent[];
}

interface ViewMode {
  id: string;
  icon: any;
  label: string;
}

// Sample data structure - you can replace this with your actual data
const galleryData: GalleryData = {
  "2025": [
    {
      eventName: "Grand fellowship",
      date: "October 26-27, 2025",
      images: [
        { id: 1, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_1.jpg?raw=true", name: "LIFE (PART 1)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 2, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_2.jpg?raw=true", name: "LIFE (PART 2)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 3, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_3.jpg?raw=true", name: "LIFE (PART 3)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 4, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_4.jpg?raw=true", name: "LIFE (PART 4)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 5, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_5.jpg?raw=true", name: "LIFE (PART 5)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 6, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_6.jpg?raw=true", name: "LIFE (PART 6)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 7, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_7.jpg?raw=true", name: "LIFE (PART 7)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 8, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_8.jpg?raw=true", name: "LIFE (PART 8)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 9, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_9.jpg?raw=true", name: "LIFE (PART 9)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 10, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_10.jpg?raw=true", name: "LIFE (PART 10)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 11, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_11.jpg?raw=true", name: "LIFE (PART 11)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 12, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_12.jpg?raw=true", name: "LIFE (PART 12)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 13, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_13.jpg?raw=true", name: "LIFE (PART 13)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 14, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_14.jpg?raw=true", name: "LIFE (PART 14)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 15, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_15.jpg?raw=true", name: "LIFE (PART 15)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 16, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_16.jpg?raw=true", name: "LIFE (PART 16)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 17, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_17.jpg?raw=true", name: "LIFE (PART 17)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 18, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_18.jpg?raw=true", name: "LIFE (PART 18)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 19, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_19.jpg?raw=true", name: "LIFE (PART 19)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 20, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_20.jpg?raw=true", name: "LIFE (PART 20)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 21, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_21.jpg?raw=true", name: "LIFE (PART 21)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 22, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_22.jpg?raw=true", name: "LIFE (PART 22)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 23, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_23.jpg?raw=true", name: "LIFE (PART 23)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 24, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_24.jpg?raw=true", name: "LIFE (PART 24)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 25, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_25.jpg?raw=true", name: "LIFE (PART 25)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 26, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_26.jpg?raw=true", name: "LIFE (PART 26)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 27, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_27.jpg?raw=true", name: "LIFE (PART 27)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 28, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_28.jpg?raw=true", name: "LIFE (PART 28)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 29, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_29.jpg?raw=true", name: "LIFE (PART 29)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 30, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_30.jpg?raw=true", name: "LIFE (PART 30)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 31, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_31.jpg?raw=true", name: "LIFE (PART 31)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 32, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_32.jpg?raw=true", name: "LIFE (PART 32)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 33, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_33.jpg?raw=true", name: "LIFE (PART 33)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 34, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_34.jpg?raw=true", name: "LIFE (PART 34)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 35, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_35.jpg?raw=true", name: "LIFE (PART 35)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 36, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_36.jpg?raw=true", name: "LIFE (PART 36)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 37, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_37.jpg?raw=true", name: "LIFE (PART 37)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 38, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_1/grandFellowship_part1_2025_38.jpg?raw=true", name: "LIFE (PART 38)", description: "FIRST NIGHT of our GRAND FELLOWSHIP 🤩✨" },
        { id: 39, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_1.jpg?raw=true", name: "LIFE (PART 39)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },     
        { id: 40, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_2.jpg?raw=true", name: "LIFE (PART 40)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },     
        { id: 41, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_3.jpg?raw=true", name: "LIFE (PART 41)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },     
        { id: 42, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_4.jpg?raw=true", name: "LIFE (PART 42)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },     
        { id: 43, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_5.jpg?raw=true", name: "LIFE (PART 43)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },     
        { id: 44, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_6.jpg?raw=true", name: "LIFE (PART 44)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },     
        { id: 45, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_7.jpg?raw=true", name: "LIFE (PART 45)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },     
        { id: 46, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_8.jpg?raw=true", name: "LIFE (PART 46)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },     
        { id: 47, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_9.jpg?raw=true", name: "LIFE (PART 47)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },     
        { id: 48, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_10.jpg?raw=true", name: "LIFE (PART 48)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 49, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_11.jpg?raw=true", name: "LIFE (PART 49)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 50, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_12.jpg?raw=true", name: "LIFE (PART 50)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 51, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_13.jpg?raw=true", name: "LIFE (PART 51)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 52, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_14.jpg?raw=true", name: "LIFE (PART 52)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 53, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_15.jpg?raw=true", name: "LIFE (PART 53)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 54, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_16.jpg?raw=true", name: "LIFE (PART 54)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 55, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_17.jpg?raw=true", name: "LIFE (PART 55)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 56, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_18.jpg?raw=true", name: "LIFE (PART 56)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 57, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_19.jpg?raw=true", name: "LIFE (PART 57)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 58, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_20.jpg?raw=true", name: "LIFE (PART 58)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 59, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_21.jpg?raw=true", name: "LIFE (PART 59)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 60, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_22.jpg?raw=true", name: "LIFE (PART 60)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 61, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_23.jpg?raw=true", name: "LIFE (PART 61)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 62, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_24.jpg?raw=true", name: "LIFE (PART 62)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 63, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_25.jpg?raw=true", name: "LIFE (PART 63)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 64, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_26.jpg?raw=true", name: "LIFE (PART 64)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 65, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_27.jpg?raw=true", name: "LIFE (PART 65)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 66, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_28.jpg?raw=true", name: "LIFE (PART 66)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 67, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_29.jpg?raw=true", name: "LIFE (PART 67)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 68, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_30.jpg?raw=true", name: "LIFE (PART 68)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 69, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_31.jpg?raw=true", name: "LIFE (PART 69)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 70, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_32.jpg?raw=true", name: "LIFE (PART 70)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 71, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_33.jpg?raw=true", name: "LIFE (PART 71)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 72, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_34.jpg?raw=true", name: "LIFE (PART 72)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 73, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_35.jpg?raw=true", name: "LIFE (PART 73)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 74, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_36.jpg?raw=true", name: "LIFE (PART 74)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 75, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_37.jpg?raw=true", name: "LIFE (PART 75)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 76, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_38.jpg?raw=true", name: "LIFE (PART 76)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },    
        { id: 77, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_39.jpg?raw=true", name: "LIFE (PART 77)", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" },
        { id: 77, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_1.jpg?raw=true", name: "LIFE (PART 77)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 78, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_2.jpg?raw=true", name: "LIFE (PART 78)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 79, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_3.jpg?raw=true", name: "LIFE (PART 79)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 80, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_4.jpg?raw=true", name: "LIFE (PART 80)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 81, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_5.jpg?raw=true", name: "LIFE (PART 81)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 82, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_6.jpg?raw=true", name: "LIFE (PART 82)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 83, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_7.jpg?raw=true", name: "LIFE (PART 83)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 84, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_8.jpg?raw=true", name: "LIFE (PART 84)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 85, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_9.jpg?raw=true", name: "LIFE (PART 85)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 86, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_10.jpg?raw=true", name: "LIFE (PART 86)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 87, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_11.jpg?raw=true", name: "LIFE (PART 87)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 88, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_12.jpg?raw=true", name: "LIFE (PART 88)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 89, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_13.jpg?raw=true", name: "LIFE (PART 89)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 90, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_14.jpg?raw=true", name: "LIFE (PART 90)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 91, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_15.jpg?raw=true", name: "LIFE (PART 91)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 92, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_16.jpg?raw=true", name: "LIFE (PART 92)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 93, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_17.jpg?raw=true", name: "LIFE (PART 93)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 94, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_18.jpg?raw=true", name: "LIFE (PART 94)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 95, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_19.jpg?raw=true", name: "LIFE (PART 95)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 96, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_20.jpg?raw=true", name: "LIFE (PART 96)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 97, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_21.jpg?raw=true", name: "LIFE (PART 97)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 98, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_22.jpg?raw=true", name: "LIFE (PART 98)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 99, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_23.jpg?raw=true", name: "LIFE (PART 99)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 100, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_24.jpg?raw=true", name: "LIFE (PART 100)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 101, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_25.jpg?raw=true", name: "LIFE (PART 101)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 102, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_26.jpg?raw=true", name: "LIFE (PART 102)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 103, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_27.jpg?raw=true", name: "LIFE (PART 103)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 104, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_28.jpg?raw=true", name: "LIFE (PART 104)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 105, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_29.jpg?raw=true", name: "LIFE (PART 105)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 106, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_30.jpg?raw=true", name: "LIFE (PART 106)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 107, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_31.jpg?raw=true", name: "LIFE (PART 107)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 108, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_32.jpg?raw=true", name: "LIFE (PART 108)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 109, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_33.jpg?raw=true", name: "LIFE (PART 109)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 110, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_34.jpg?raw=true", name: "LIFE (PART 110)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 111, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_35.jpg?raw=true", name: "LIFE (PART 111)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 112, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_36.jpg?raw=true", name: "LIFE (PART 112)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 113, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_37.jpg?raw=true", name: "LIFE (PART 113)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 114, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_38.jpg?raw=true", name: "LIFE (PART 114)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 115, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_39.jpg?raw=true", name: "LIFE (PART 115)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 116, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_40.jpg?raw=true", name: "LIFE (PART 116)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 117, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_41.jpg?raw=true", name: "LIFE (PART 117)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 118, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_42.jpg?raw=true", name: "LIFE (PART 118)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 119, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_43.jpg?raw=true", name: "LIFE (PART 119)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 120, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_44.jpg?raw=true", name: "LIFE (PART 120)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 121, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_45.jpg?raw=true", name: "LIFE (PART 121)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 122, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_46.jpg?raw=true", name: "LIFE (PART 122)", description: "We�re in a competition, BUT they ain`t our enemies!" },
{ id: 123, src: "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_47.jpg?raw=true", name: "LIFE (PART 123)", description: "We�re in a competition, BUT they ain`t our enemies!" }
      ]
    }
  ],
  "2024": [
    {
      eventName: "Christmas Celebration",
      date: "December 25, 2024",
      images: [
        { id: 1, src: "/api/placeholder/400/300", name: "Christmas Tree Lighting", description: "Beautiful moment of our Christmas tree lighting ceremony" },
        { id: 2, src: "/api/placeholder/400/300", name: "Children's Choir", description: "Our wonderful children singing Christmas carols" },
        { id: 3, src: "/api/placeholder/400/300", name: "Family Gathering", description: "Families coming together to celebrate" },
        { id: 4, src: "/api/placeholder/400/300", name: "Gift Exchange", description: "Joyful gift exchange among church members" },
        { id: 5, src: "/api/placeholder/400/300", name: "Community Prayer", description: "Community coming together in prayer" },
        { id: 6, src: "/api/placeholder/400/300", name: "Holiday Feast", description: "Shared meal during the celebration" }
      ]
    },
    {
      eventName: "Easter Service",
      date: "March 31, 2024",
      images: [
        { id: 7, src: "/api/placeholder/400/300", name: "Sunrise Service", description: "Early morning Easter sunrise service" },
        { id: 8, src: "/api/placeholder/400/300", name: "Baptism Ceremony", description: "New members being baptized on Easter" },
        { id: 9, src: "/api/placeholder/400/300", name: "Easter Egg Hunt", description: "Children enjoying the Easter egg hunt" },
        { id: 10, src: "/api/placeholder/400/300", name: "Cross Decoration", description: "Beautiful Easter cross display" }
      ]
    }
  ],
  "2023": [
    {
      eventName: "Youth Camp",
      date: "July 15, 2023",
      images: [
        { id: 11, src: "/api/placeholder/400/300", name: "Camp Activities", description: "Youth participating in outdoor activities" },
        { id: 12, src: "/api/placeholder/400/300", name: "Evening Worship", description: "Beautiful evening worship session" },
        { id: 13, src: "/api/placeholder/400/300", name: "Group Photo", description: "All youth camp participants together" }
      ]
    },
    {
      eventName: "Thanksgiving Service",
      date: "November 23, 2023",
      images: [
        { id: 14, src: "/api/placeholder/400/300", name: "Thanksgiving Feast", description: "Community thanksgiving dinner" },
        { id: 15, src: "/api/placeholder/400/300", name: "Prayer Circle", description: "Members joining hands in gratitude prayer" }
      ]
    }
  ],
  "2022": [
    {
      eventName: "Church Anniversary",
      date: "September 10, 2022",
      images: [
        { id: 16, src: "/api/placeholder/400/300", name: "Anniversary Cake", description: "Celebrating our church's milestone anniversary" },
        { id: 17, src: "/api/placeholder/400/300", name: "Historical Photos", description: "Display of church history through the years" },
        { id: 18, src: "/api/placeholder/400/300", name: "Community Celebration", description: "The entire community celebrating together" }
      ]
    }
  ]
};

const viewModes: ViewMode[] = [
  { id: 'grid', icon: Grid, label: 'Grid View' },
  { id: 'list', icon: List, label: 'List View' },
  { id: 'river', icon: Columns, label: 'River View' },
  { id: 'large', icon: Square, label: 'Large View' },
  { id: 'pinterest', icon: Grid3x3, label: 'Pinterest View' }
];

const GalleryPage = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [viewMode, setViewMode] = useState<string>('grid');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isViewModeOpen, setIsViewModeOpen] = useState<boolean>(false);

  const years = Object.keys(galleryData).sort((a, b) => parseInt(b) - parseInt(a));

  // Auto-select first event when year changes
  useEffect(() => {
    const yearData = galleryData[selectedYear];
    if (yearData && yearData.length > 0) {
      setSelectedEvent(yearData[0]);
    }
  }, [selectedYear]);

  // Get all images from selected event
  const getCurrentImages = (): GalleryImage[] => {
    if (!selectedEvent) return [];
    return selectedEvent.images || [];
  };

  // Image popup navigation
  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const images = getCurrentImages();
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setSelectedImage(images[prevIndex]);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const images = getCurrentImages();
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(images[nextIndex]);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  // Get current view mode info
  const currentViewMode = viewModes.find(mode => mode.id === viewMode) || viewModes[0];

  // Render images based on view mode
  const renderImages = () => {
    const images = getCurrentImages();
    
    const getGridClass = () => {
      switch (viewMode) {
        case 'grid': return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4';
        case 'list': return 'flex flex-col gap-3';
        case 'river': return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
        case 'large': return 'grid grid-cols-1 md:grid-cols-2 gap-6';
        case 'pinterest': return 'columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4';
        default: return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4';
      }
    };

    return (
      <div className={getGridClass()}>
        {images.map((image) => (
          <div
            key={image.id}
            className={`cursor-pointer hover:opacity-80 transition-opacity ${
              viewMode === 'list' ? 'flex gap-3 p-3 bg-white rounded-lg shadow-sm' : 
              viewMode === 'pinterest' ? 'break-inside-avoid mb-4' : ''
            }`}
            onClick={() => handleImageClick(image)}
          >
            {viewMode === 'list' ? (
              <>
                <img
                  src={image.src}
                  alt={image.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="custom-h4 mb-1">{image.name}</h4>
                  <p className="custom-span text-xs">{image.description}</p>
                </div>
              </>
            ) : (
              <>
                <img
                  src={image.src}
                  alt={image.name}
                  className={`w-full object-cover rounded-lg ${
                    viewMode === 'large' ? 'h-64' : 
                    viewMode === 'pinterest' ? 'h-auto' : 'h-48'
                  }`}
                />
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Floating Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="custom-h3">Gallery Library</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-600">💖 List of events</span>
          </div>
        </div>

        {/* Year Folders */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-600 mb-2">⏳Timeline</div>
            
            {years.map((year) => (
              <div key={year}>
                <button
                  onClick={() => setSelectedYear(year)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedYear === year
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📁 {year}
                </button>
                
                {/* Event Sub-folders */}
                {selectedYear === year && galleryData[year] && (
                  <div className="ml-4 mt-1 space-y-1">
                    {galleryData[year].map((event, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedEvent(event)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                          selectedEvent === event
                            ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        📄 {event.eventName}
                        <div className="text-gray-500 text-xs mt-1">
                          {event.date} • {event.images.length} images
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="text-sm text-gray-600"></div>
            <div className="text-sm text-gray-600"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
              id="search-input-gallery"
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-black">
              <input type="checkbox" className="rounded" />
              Search in subfolders
            </label>
          </div>

          {/* View Mode Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsViewModeOpen(!isViewModeOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              <currentViewMode.icon className="w-4 h-4" />
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {isViewModeOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                {viewModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setViewMode(mode.id);
                      setIsViewModeOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      viewMode === mode.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    <mode.icon className="w-4 h-4" />
                    {mode.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Image Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedEvent ? (
            <div>
              <div className="mb-6">
                <h1 className="custom-h2 mb-2">{selectedEvent.eventName}</h1>
                <p className="text-gray-600">{selectedEvent.date} • {selectedEvent.images.length} images</p>
              </div>
              {renderImages()}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">📁</div>
                <p>Select a folder to view images</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Popup */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-5xl max-h-full bg-white rounded-lg overflow-hidden">
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-10 bg-white rounded-full p-2"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous button */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 z-10 bg-white rounded-full p-2"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 z-10 bg-white rounded-full p-2"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="flex">
              <div className="flex-1">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.name}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>
              <div className="w-80 p-6 bg-gray-50">
                <div className="mb-4">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Preview</span>
                </div>
                <h3 className="custom-h3 mb-3">{selectedImage.name}</h3>
                <p className="custom-p text-gray-700 mb-4">{selectedImage.description}</p>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <strong>Event:</strong> {selectedEvent?.eventName}
                  </div>
                  <div>
                    <strong>Date:</strong> {selectedEvent?.date}
                  </div>
                  <div>
                    <strong>Type:</strong> Image
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isViewModeOpen && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setIsViewModeOpen(false)}
        />
      )}
    </div>
  );
};

export default GalleryPage;