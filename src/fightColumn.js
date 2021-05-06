import React from 'react'
import styled from 'styled-components'
import Fight from './reaction'
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
const FightList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDraggingOver ? 'skyblue' : 'white'}
  flex-grow: 1;
  min-height: 100px;
`

export default class FightColumn extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props.reactions)
  }
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id} type="FIGHT">
          {(provided, snapshot) => (
            <FightList
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.fights.map((fight, index) => (
                // <Reaction delete = {this.props.delete} key={reaction.name} reaction={reaction} index={index} handler={this.props.handler}/>
                <Fight saveFight={this.props.saveFight} fight={fight} index={index} text={"Save Fight"}></Fight>
              ))}
              {provided.placeholder}
            </FightList>
          )}
        </Droppable>
      </Container>
    )
  }
}