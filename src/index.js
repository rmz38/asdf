import React from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'

import initialData from './initial-data'
import Column from './column'
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
  handler= (name, val, columnid)=>{
    console.log(this.state)
    delete this.state.cards[name]
    this.state.cards[val.name] = val
    let index = this.state.columns[columnid].cardIds.indexOf(name)
    this.state.columns[columnid].cardIds[index] = val.name

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
    if (start === finish) {
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
              <Column key={column.id} column={column} cards={cards} handler={this.handler} />
            )
          })}
            <Column key='reac' column={this.state.reactionColumn} cards={reactions} handler={this.handler}/>
        </Container>
      </DragDropContext>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
