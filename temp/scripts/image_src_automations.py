
base_url = "https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/events/2025/grandFellowship2025/part_2/grandFellowship_part2_2025_"

for i in range(1, 39 + 1):
    full_url = f"{base_url}{i}.jpg?raw=true"
    print(f'{{ id: {i}, src: "{full_url}", name: "LIFE (PART {i})", description: "Parang kelan lang when we filled the streets and the atmosphere with bursting colors! ✨" }},')
