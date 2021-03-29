import React from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'

import initialData from './initial-data'
import Column from './column'
import ReactionColumn from './reactionColumn'
import 'bootstrap/dist/css/bootstrap.min.css';
const Container = styled.div`
  display:flex;
`
class App extends React.Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);
    // Set the state directly. Use props if necessary.
    this.state = initialData
  }
  //card handler
  cardhandler= (name, val, columnid)=>{
    console.log(this.state)
    delete this.state.cards[name]
    this.state.cards[val.name] = val
    let index = this.state.columns[columnid].cardIds.indexOf(name)
    this.state.columns[columnid].cardIds[index] = val.name

    this.setState({
      ...this.state
    })
  }
  //reaction handler
  reactionhandler= (name, val)=>{
    console.log(this.state)
    delete this.state.reactions[name]
    this.state.reactions[val.name] = val
    let index = this.state.reactionColumn.reactionIds.indexOf(name)
    this.state.reactionColumn.reactionIds[index] = val.name

    this.setState({
      ...this.state
    })
  }
  onDragEnd = result => {
    console.log(this.state)
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index || 
      (destination.droppableId in this.state.columns && source.droppableId == this.state.reactionColumn.id) ||
      (destination.droppableId == this.state.reactionColumn.id && source.droppableId in this.state.columns)
    ) {
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]
    if (start === finish && source.droppableId !== "reactionCol") {
      const newCardIds = Array.from(start.cardIds)
      newCardIds.splice(source.index, 1)
      // console.log(draggableId)
      newCardIds.splice(destination.index, 0, draggableId)
      console.log(newCardIds)
      const newColumn = {
        ...start,
        cardIds: newCardIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }
      this.setState(newState)
      return
    }
    if (start === finish) {
      const col = this.state.reactionColumn
      const newReactionIds = Array.from(col.reactionIds)
      newReactionIds.splice(source.index, 1)
      // console.log(draggableId)
      newReactionIds.splice(destination.index, 0, draggableId)
      console.log(newReactionIds)
      const newColumn = {
        ...col,
        reactionIds: newReactionIds
      }

      const newState = {
        ...this.state,
        reactionColumn: {
          ...newColumn
        }
      }
      this.setState(newState)
      return
    }
    // Moving from one list to another
    const startCardIds = Array.from(start.cardIds)
    startCardIds.splice(source.index, 1)
    const newStart = {
      ...start,
      cardIds: startCardIds
    }

    const finishCardIds = Array.from(finish.cardIds)
    finishCardIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      cardIds: finishCardIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      },
      cards: {
        ...this.state.cards,
        [draggableId]: {
          ...this.state.cards[draggableId],
          level: newFinish.level
        }
      }
    }
    this.setState(newState)
  }

  render() {
    const reactions = this.state.reactionColumn.reactionIds.map(
      reactionID => this.state.reactions[reactionID]
    )
    console.log(this.state)
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId]
            // console.log(this.state.cards)
            const cards = column.cardIds.map(
              cardId => this.state.cards[cardId]
            )
            return (
              <Column key={column.id} column={column} cards={cards} handler={this.cardhandler} />
            )
          })}
            <ReactionColumn key='reac' column={this.state.reactionColumn} reactions={reactions} handler={this.reactionhandler}/>
        </Container>
      </DragDropContext>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
