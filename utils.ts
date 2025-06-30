import { Character, House } from "./types.ts";


export async function getAllCharacters () : Promise<Character[]>  {
    const response = await fetch(`https://hp-api.onrender.com/api/characters`);
    const data = await response.json();

    const characters: Character[] = data.map((c:any)=>({
        id: c.id,
        name:c.name,
        alternate_names: c.alternate_names,
        species: c.species,
        gender: c.gender,
        house: c.house || null
    }));

    return characters;
};

export async function getHouse (name:string | undefined) : Promise<House | null> {
    if(!name) return null;
    const charactersAll = await getAllCharacters();
    const members = charactersAll.filter((c) => typeof c.house === "string" && c.house === name);
    const characters = await Promise.all(members.map((async c=>({
        ...c,
        house: await getHouse(String(c.house))
    }))));

    return{
        name,
        characters
    }
}