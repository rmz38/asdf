import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Button, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
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

export default class AddReaction extends React.Component {
  constructor(props) {
    super(props)
    this.temp = {
      "id": -1,
      "name":"temp",
      "description":"temp",
      "cost": {
        "blade": 0,
        "flourish": 0,
        "lunge": 0,
        "brawn": 0
      },
      "reward": 0,
      "addToDeck": [1],
      "delete": [],
      "win": false,
      "lose":false
    }
  }
  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" style = {{width:'100%', backgroundColor: 'brown', borderColor: 'brown'}}>
          Add Reaction
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="nameInput">Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={"name"}
              aria-label="name"
              aria-describedby="basic-addon1"
              onChange={(e)=>{
                this.temp.name = e.target.value
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="nameInput">Description</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={"desc"}
              aria-label="name"
              aria-describedby="basic-addon1"
              onChange={(e)=>{
                this.temp.description = e.target.value
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="bladeInput">Blade</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={0}
              aria-label="blade"
              aria-describedby="basic-addon1"
              onChange={(e)=>{
                this.temp.cost.blade = +e.target.value
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="flourishInput">Flourish</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={0}
              aria-label="flourish"
              aria-describedby="basic-addon1"
              onChange={(e)=>{
                this.temp.cost.flourish = +e.target.value
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="lungeInput">Lunge</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={0}
              aria-label="lunge"
              aria-describedby="basic-addon1"
              onChange={(e)=>{
                this.temp.cost.lunge = +e.target.value
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="brawnInput">Brawn</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={0}
              aria-label="brawn"
              aria-describedby="basic-addon1"
              onChange={(e)=>{
                this.temp.cost.brawn = +e.target.value
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="reactions">Add to Deck</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={[]}
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
          <Button onClick={()=>this.props.addReaction(this.temp, this.props.cardname)}>Add</Button>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}
