import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Button, Dropdown, InputGroup, FormControl, ButtonGroup } from 'react-bootstrap';
const fs = require('fs');
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
  props.isDragDisabled
    ? 'lightgrey'
    : props.isDragging
    ? 'lightgreen'
    : 'white'};
`

export default class Reaction extends React.Component {
  constructor(props) {
    super(props)

    // this.handler = this.handler.bind(this)
    this.temp = JSON.parse(JSON.stringify(this.props.reaction))
  }
  render() {
    this.temp = JSON.parse(JSON.stringify(this.props.reaction))
    const isDragDisabled = false
    return (
      <Draggable
        draggableId={this.props.reaction.name}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
          >
            {this.props.reaction.name + " - " + this.props.reaction.id}
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" style = {{backgroundColor: 'brown', borderColor: 'brown', width:'80%'}}>
                Edit
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="nameInput">Name</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder={this.props.reaction.name}
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    onChange={(e)=>{
                      // this.props.card.name=e.target.value
                      this.temp.name = e.target.value
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="bladeInput">Blade</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder={this.props.reaction.cost.blade}
                    aria-label="blade"
                    aria-describedby="basic-addon1"
                    onChange={(e)=>{
                      // this.props.card.name=e.target.value
                      this.temp.cost.blade = +e.target.value
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="flourishInput">Flourish</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder={this.props.reaction.cost.flourish}
                    aria-label="flourish"
                    aria-describedby="basic-addon1"
                    onChange={(e)=>{
                      // this.props.card.name=e.target.value
                      this.temp.cost.flourish = +e.target.value
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="lungeInput">Lunge</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder={this.props.reaction.cost.lunge}
                    aria-label="lunge"
                    aria-describedby="basic-addon1"
                    onChange={(e)=>{
                      // this.props.card.name=e.target.value
                      this.temp.cost.lunge = +e.target.value
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="brawnInput">Brawn</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder={this.props.reaction.cost.brawn}
                    aria-label="brawn"
                    aria-describedby="basic-addon1"
                    onChange={(e)=>{
                      // this.props.card.name=e.target.value
                      this.temp.cost.brawn = +e.target.value
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="brawnInput">Description</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder={this.props.reaction.description}
                    aria-label="texture"
                    aria-describedby="basic-addon1"
                    onChange={(e)=>{
                      // this.props.card.name=e.target.value
                      this.temp.description = e.target.value
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="reactions">Add to Deck</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder={this.temp.addToDeck}
                    aria-label="texture"
                    aria-describedby="basic-addon1"
                    onChange={(e)=>{
                      let input = e.target.value
                      let cards = []
                      while(input.indexOf(',') > -1){
                        cards.push(+input.substring(0, input.indexOf(',')))
                        input = input.substring(input.indexOf(',') + 1)
                      }
                      if( input.length > 0) {
                        cards.push(+input)
                      }
                      this.temp.addToDeck = cards
                    }}
                  />
                </InputGroup>
                <Button onClick={()=>this.props.handler(this.props.reaction.name, this.temp)}>Save</Button>
              </Dropdown.Menu>
            </Dropdown>
            <Button style={{backgroundColor:'red'}} onClick={()=> this.props.delete(this.temp.name)}>Delete</Button>
          </Container>
        )}
      </Draggable>
    )
  }
}
