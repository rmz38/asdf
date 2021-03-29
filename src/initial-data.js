import cards from "./cards";
import reactions from "./reactions";
const reactionNames = Object.keys(JSON.parse(JSON.stringify(reactions)))
console.log(reactionNames)
const initialData = {
  cards: cards,
  reactions: reactions,
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Level 1',
      level: 1,
      cardIds: ["Slash", "Bide Time","Guard", "Grab"]
    },
    'column-2': {
      id: 'column-2',
      title: 'Level 2',
      level: 2,
      cardIds: ["Grappled", "Exposed", "Staggered"]
    },
    'column-3': {
      id: 'column-3',
      title: 'Level 3',
      level: 3,
      cardIds: ["Stunned", "Wounded", "Blinded"]
    },
    'column-4': {
      id: 'column-4',
      title: 'Level 4',
      level: 4,
      cardIds: ["Crushed", "Impaled"]
    },
    'column-5': {
      id: 'column-5',
      title: 'Level 5',
      level: 5,
      cardIds: ["Incapacitated"]
    }
  },
  reactionColumn: {
    id: 'reactionCol',
    title: 'Reactions',
    reactionIds: reactionNames
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3','column-4','column-5']
}

export default initialData
