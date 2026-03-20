import { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, X, Search,
  Grid2x2, List, Columns3, Square, LayoutGrid,
  Folder, FolderOpen, FileImage, Clock, ChevronDown,
  Images
} from 'lucide-react';
import '../styles/gallery.page.css';

/* ─── Types ─────────────────────────────────────────── */
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
  Icon: React.ElementType;
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

/* ─── View modes ─────────────────────────────────────── */
const viewModes: ViewMode[] = [
  { id: 'grid',      Icon: Grid2x2,     label: 'Grid'       },
  { id: 'list',      Icon: List,        label: 'List'       },
  { id: 'river',     Icon: Columns3,    label: 'River'      },
  { id: 'large',     Icon: Square,      label: 'Large'      },
  { id: 'pinterest', Icon: LayoutGrid,  label: 'Pinterest'  },
];

/* ─── Helpers ────────────────────────────────────────── */
/** Returns the most recent year that has at least one event with images */
function getDefaultYear(data: GalleryData): string {
  const sorted = Object.keys(data).sort((a, b) => parseInt(b) - parseInt(a));
  for (const y of sorted) {
    if (data[y]?.some(e => e.images.length > 0)) return y;
  }
  return sorted[0] ?? '';
}

/* ─── Component ──────────────────────────────────────── */
const GalleryPage = () => {
  const defaultYear                               = getDefaultYear(galleryData);
  const [selectedYear,  setSelectedYear]          = useState<string>(defaultYear);
  const [selectedEvent, setSelectedEvent]         = useState<GalleryEvent | null>(null);
  const [selectedImage, setSelectedImage]         = useState<GalleryImage | null>(null);
  const [viewMode,      setViewMode]              = useState<string>('grid');
  const [searchTerm,    setSearchTerm]            = useState<string>('');
  const [subfolders,    setSubfolders]            = useState<boolean>(false);
  const [vmOpen,        setVmOpen]                = useState<boolean>(false);

  const vmRef = useRef<HTMLDivElement>(null);

  /* Auto-select first event when year changes */
  useEffect(() => {
    const yearData = galleryData[selectedYear];
    if (yearData?.length) {
      setSelectedEvent(yearData[0]);
    } else {
      setSelectedEvent(null);
    }
  }, [selectedYear]);

  /* Close view-mode dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (vmRef.current && !vmRef.current.contains(e.target as Node)) {
        setVmOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Sorted years (desc) */
  const years = Object.keys(galleryData).sort((a, b) => parseInt(b) - parseInt(a));

  /* Current year (for "CURRENT" badge) */
  const currentYear = String(new Date().getFullYear());

  /* Images to show — filtered by search */
  const allImages: GalleryImage[] = selectedEvent?.images ?? [];
  const filteredImages = searchTerm.trim()
    ? allImages.filter(img =>
        img.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allImages;

  /* Lightbox navigation */
  const lightboxImages = filteredImages;
  const currentLightboxIdx = selectedImage
    ? lightboxImages.findIndex(i => i.id === selectedImage.id)
    : -1;

  const prevImage = () => {
    if (currentLightboxIdx <= 0) {
      setSelectedImage(lightboxImages[lightboxImages.length - 1]);
    } else {
      setSelectedImage(lightboxImages[currentLightboxIdx - 1]);
    }
  };

  const nextImage = () => {
    if (currentLightboxIdx >= lightboxImages.length - 1) {
      setSelectedImage(lightboxImages[0]);
    } else {
      setSelectedImage(lightboxImages[currentLightboxIdx + 1]);
    }
  };

  /* Keyboard navigation */
  useEffect(() => {
    if (!selectedImage) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape')     setSelectedImage(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage, currentLightboxIdx]);

  /* Active view mode */
  const activeVM = viewModes.find(v => v.id === viewMode) ?? viewModes[0];

  /* ── Image grid renderer ── */
  const renderImages = () => {
    if (!filteredImages.length) {
      return (
        <div className="gallery-empty">
          <Images size={48} />
          <p>No images found</p>
        </div>
      );
    }

    if (viewMode === 'list') {
      return (
        <div className="view-list">
          {filteredImages.map(img => (
            <div key={img.id} className="list-item" onClick={() => setSelectedImage(img)}>
              <img src={img.src} alt={img.name} loading="lazy" />
              <div className="list-item-info">
                <h4>{img.name}</h4>
                <p>{img.description}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    const gridClass = {
      grid:      'view-grid',
      river:     'view-river',
      large:     'view-large',
      pinterest: 'view-pinterest',
    }[viewMode] ?? 'view-grid';

    return (
      <div className={gridClass}>
        {filteredImages.map(img => (
          <div
            key={img.id}
            className="gallery-img-card"
            onClick={() => setSelectedImage(img)}
          >
            <img src={img.src} alt={img.name} loading="lazy" />
            <div className="gallery-img-hover-info">
              <p>{img.name}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  /* ── render ── */
  return (
    <div className="gallery-page">

      {/* ── Sidebar ── */}
      <aside className="gallery-sidebar">
        <div className="gallery-sidebar-header">
          <h2>Gallery Library</h2>
          <p className="gallery-sidebar-sub">
            <Images size={12} />
            Event photo archive
          </p>
        </div>

        <div className="gallery-sidebar-body">
          <div className="sidebar-section-label">
            <Clock size={11} />
            Timeline
          </div>

          {years.map(year => {
            const isActiveYear = selectedYear === year;
            const isCurrent    = year === currentYear;
            const events       = galleryData[year] ?? [];

            return (
              <div key={year}>
                <button
                  className={`year-btn${isActiveYear ? ' active' : ''}`}
                  onClick={() => setSelectedYear(year)}
                >
                  {isActiveYear
                    ? <FolderOpen size={14} />
                    : <Folder size={14} />
                  }
                  {year}
                  {isCurrent && (
                    <span className="year-btn-badge">NOW</span>
                  )}
                </button>

                {isActiveYear && events.length > 0 && (
                  <div className="event-list">
                    {events.map((event, idx) => (
                      <button
                        key={idx}
                        className={`event-btn${selectedEvent === event ? ' active' : ''}`}
                        onClick={() => setSelectedEvent(event)}
                      >
                        <span className="event-btn-name">{event.eventName}</span>
                        <span className="event-btn-meta">
                          <FileImage size={10} />
                          {event.date} · {event.images.length} photos
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="gallery-main">

        {/* Top Bar */}
        <div className="gallery-topbar">
          <div className="gallery-topbar-left">
            <div className="gallery-search-wrap">
              <Search size={14} />
              <input
                id="search-input-gallery"
                type="text"
                placeholder="Search photos…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <label className="gallery-subfolder-label">
              <input
                type="checkbox"
                checked={subfolders}
                onChange={e => setSubfolders(e.target.checked)}
              />
              Search in subfolders
            </label>
          </div>

          {/* View mode */}
          <div className="viewmode-dropdown-wrap" ref={vmRef}>
            <button className="viewmode-trigger" onClick={() => setVmOpen(v => !v)}>
              <activeVM.Icon size={15} />
              <span style={{ fontSize: '0.8rem' }}>{activeVM.label}</span>
              <ChevronDown size={13} />
            </button>
            {vmOpen && (
              <div className="viewmode-menu">
                {viewModes.map(({ id, Icon, label }) => (
                  <button
                    key={id}
                    className={`viewmode-option${viewMode === id ? ' active' : ''}`}
                    onClick={() => { setViewMode(id); setVmOpen(false); }}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="gallery-content">
          {selectedEvent ? (
            <>
              <div className="gallery-content-header">
                <h1>{selectedEvent.eventName}</h1>
                <p className="gallery-content-meta">
                  <FileImage size={12} />
                  {selectedEvent.date}
                  &nbsp;·&nbsp;
                  {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>
              {renderImages()}
            </>
          ) : (
            <div className="gallery-empty">
              <Folder size={52} />
              <p>Select an event to view photos</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={e => e.target === e.currentTarget && setSelectedImage(null)}>
          <div className="lightbox-box">

            {/* Image area */}
            <div className="lightbox-img-area">
              <button className="lightbox-close" onClick={() => setSelectedImage(null)} aria-label="Close">
                {/*<X size={15} />*/}
                <img className="closeThisGallery" src="/assets/system/close.png"/>
              </button>
              <button className="lightbox-nav prev" onClick={prevImage} aria-label="Previous">
                {/*<ChevronLeft size={18} />*/}
                <img className="lightboxGal-left" src="/assets/system/arrow-left.png" />
              </button>
              <img src={selectedImage.src} alt={selectedImage.name} />
              <button className="lightbox-nav next" onClick={nextImage} aria-label="Next">
                {/*<ChevronRight size={18} />*/}
                <img className="lightboxGal-right" src="/assets/system/arrow-right.png" />
              </button>
              <div className="lightbox-counter">
                {currentLightboxIdx + 1} / {lightboxImages.length}
              </div>
            </div>

            {/* Info panel */}
            <div className="lightbox-info">
              <span className="lightbox-badge">Preview</span>
              <h3>{selectedImage.name}</h3>
              <p>{selectedImage.description}</p>
              <div className="lightbox-meta-row">
                <div className="lightbox-meta-item">
                  <strong>Event:</strong> {selectedEvent?.eventName}
                </div>
                <div className="lightbox-meta-item">
                  <strong>Date:</strong> {selectedEvent?.date}
                </div>
                <div className="lightbox-meta-item">
                  <strong>Type:</strong> Image
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;