import { getAllCharacters, getHouse } from "./utils.ts";



export const resolvers = {
  
  Query: {
    getCharacter: async (_:unknown, args: {id:string}) => {
      const charactersAll = await getAllCharacters();
      const character = charactersAll.find((c) => (c.id === args.id));
      if(!character) return null;
      
      return {
        ...character,
        house: await getHouse(String(character.house!.name))

      }

    },

    getCharacters: async (_:unknown, args: {ids: string[]}) => {
      const charactersAll = await getAllCharacters();
      const characters = args.ids ? charactersAll.filter(c => args.ids!.includes(c.id)) : charactersAll;
      return await Promise.all(characters.map(async(c)=> ({
        ...c,
        house: await getHouse(undefined)
      })))
    }

  },
};
