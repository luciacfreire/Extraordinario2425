export const typeDefs = `#graphql
  
  type House {
    name: String!
    characters: [Character!]!
  }

  type Character {
    id:ID!
    name: String!
    alternate_names:[String!]!
    species:String!
    gender:String!
    house: House
  }
  
  type Query {
    getCharacter(id:ID!):Character
    getCharacters(ids:[String]): [Character!]!
  }
`;
