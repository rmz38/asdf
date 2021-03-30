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

export default class AddCard extends React.Component {
  constructor(props) {
    super(props)
    this.temp = {
      "id": -1,
        "name": "temp",
        "texture": "temp",
        "reactions": [],
        "resources": {
        "blade": 0,
          "flourish": 0,
          "lunge": 0,
          "brawn": 0
      },
      "level": 1
    }
  }
  render() {
    return (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" style = {{width:'100%'}}>
            Add Card
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
                <InputGroup.Text id="bladeInput">Blade</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder={0}
                aria-label="blade"
                aria-describedby="basic-addon1"
                onChange={(e)=>{
                  this.temp.resources.blade = +e.target.value
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
                  this.temp.resources.flourish = +e.target.value
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
                  this.temp.resources.lunge = +e.target.value
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
                  this.temp.resources.brawn = +e.target.value
                }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="brawnInput">Texture</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder={"temp"}
                aria-label="texture"
                aria-describedby="basic-addon1"
                onChange={(e)=>{
                  this.temp.texture = e.target.value
                }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="brawnInput">Level</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder={this.temp.level}
                aria-label="texture"
                aria-describedby="basic-addon1"
                onChange={(e)=>{
                  this.temp.level = +e.target.value
                }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="reactions">Reactions</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder={[]}
                aria-label="texture"
                aria-describedby="basic-addon1"
                onChange={(e)=>{
                  let input = e.target.value
                  let responses = []
                  while(input.indexOf(',') > -1){
                    responses.push(+input.substring(0, input.indexOf(',')))
                    input = input.substring(input.indexOf(',') + 1)
                  }
                  if( input.length > 0) {
                    responses.push(+input)
                  }
                  this.temp.responses = responses
                }}
              />
            </InputGroup>
            <Button onClick={()=>this.props.addCard(this.temp)}>Add</Button>
          </Dropdown.Menu>
        </Dropdown>
    )
  }
}
