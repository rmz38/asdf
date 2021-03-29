import cards from "./cards";
import reactions from "./reactions";
const initialData = {
  cards: cards,
  reactions: reactions,
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'level 1',
      level: 1,
      cardIds: ["Slash", "Bide Time","Guard", "Grab"]
    },
    'column-2': {
      id: 'column-2',
      title: 'level 2',
      level: 2,
      cardIds: ["Grappled", "Exposed", "Staggered"]
    },
    'column-3': {
      id: 'column-3',
      title: 'level 3',
      level: 3,
      cardIds: ["Stunned", "Wounded", "Blinded"]
    },
    'column-4': {
      id: 'column-3',
      title: 'level 4',
      level: 4,
      cardIds: ["Crushed", "Impaled"]
    },
    'column-5': {
      id: 'column-3',
      title: 'level 5',
      level: 5,
      cardIds: ["Incapacitated"]
    }
  },
  reactionColumn: {
    id: 'reactionCol',
    title: 'reaction column',
    reactionIds: []
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3','column-4','column-5']
}

export default initialData
