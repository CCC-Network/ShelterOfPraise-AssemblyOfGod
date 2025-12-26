start_id = 77          # continue numbering after Part 1 (1–38)
total_images = 47      # number of photos in part 2
base_url = "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_3/grandFellowship_part3_2025_"

file_number = 1        # part_2 filenames start at 1

for current_id in range(start_id, start_id + total_images):
    full_url = f"{base_url}{file_number}.jpg?raw=true"
    print(f'{{ id: {current_id}, src: "{full_url}", name: "LIFE (PART {current_id})", description: "We’re in a competition, BUT they ain`t our enemies!" }},')
    file_number += 1
