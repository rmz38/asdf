import React from 'react'
import styled from 'styled-components'
import Card from './card'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const CardList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDraggingOver ? 'skyblue' : 'white'}
  flex-grow: 1;
  min-height: 100px;
`

export default class Column extends React.Component {
  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
  }
  handler(index, oldname, val){
    this.props.handler(oldname, val, this.props.column.id)
    // this.props.cards[index] = val
    // this.setState({
    //   ...this.props
    // })
    // this.props.handler(oldname, val, columnid)
  }
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id} type="CARD">
          {(provided, snapshot) => (
            <CardList
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.cards.map((card, index) => (
                <Card key={card.name + card.id} card={card} index={index} handler={this.handler} 
                    id ={card.name}
                    delete={this.props.delete}
                    reactions={this.props.getReactions(card.reactions)}
                    reactionDelete={this.props.reactionDelete}
                    reactionHandler={this.props.reactionHandler}
                    addReaction={this.props.addReaction}
                    refreshScreen={this.props.refreshScreen}
                    color = {this.props.color}
                    pointCards = {this.props.getCards(Object.keys(this.props.getReactions(card.reactions)).map((reaction, index ) =>
                      this.props.getReactions(card.reactions)[reaction].addToDeck[0]
                    ))}
                    />
              ))}
              {provided.placeholder}
            </CardList>
          )}
        </Droppable>
      </Container>
    )
  }
}
