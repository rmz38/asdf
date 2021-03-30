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
  display:flex;
  flex-direction: column;
`

export default class Card extends React.Component {
  constructor(props) {
    super(props)

    // this.handler = this.handler.bind(this)
    this.temp = JSON.parse(JSON.stringify(this.props.card))
  }
  render() {
    const isDragDisabled = false
    let texture;
    try {
      texture = require('./cards/' + this.props.card.texture + '.png');
    } catch {
      texture = require('./cards/notfound.png')
    }
    return (
      <Draggable
        draggableId={this.props.card.name}
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
            {this.props.card.name + " - " + this.props.card.id}
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width:'100%'}}>
                Edit
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="nameInput">Name</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder={this.props.card.name}
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
                    placeholder={this.props.card.resources.blade}
                    aria-label="blade"
                    aria-describedby="basic-addon1"
                    onChange={(e)=>{
                      // this.props.card.name=e.target.value
                      this.temp.resources.blade = +e.target.value
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="flourishInput">Flourish</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder={this.props.card.resources.flourish}
                    aria-label="flourish"
                    aria-describedby="basic-addon1"
                    onChange={(e)=>{
                      // this.props.card.name=e.target.value
                      this.temp.resources.flourish = +e.target.value
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="lungeInput">Lunge</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder={this.props.card.resources.lunge}
                    aria-label="lunge"
                    aria-describedby="basic-addon1"
                    onChange={(e)=>{
                      // this.props.card.name=e.target.value
                      this.temp.resources.lunge = +e.target.value
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="brawnInput">Brawn</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder={this.props.card.resources.brawn}
                    aria-label="brawn"
                    aria-describedby="basic-addon1"
                    onChange={(e)=>{
                      // this.props.card.name=e.target.value
                      this.temp.resources.brawn = +e.target.value
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="brawnInput">Texture</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder={this.props.card.texture}
                    aria-label="texture"
                    aria-describedby="basic-addon1"
                    onChange={(e)=>{
                      // this.props.card.name=e.target.value
                      this.temp.texture = e.target.value
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="responses">Reactions</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder={this.props.card.reactions}
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
                      this.temp.reactions = responses
                    }}
                  />
                </InputGroup>
              <Button onClick={()=>this.props.handler(this.props.index, this.props.card.name, this.temp)}>Save</Button>
              </Dropdown.Menu>
            </Dropdown>
            <img src={texture} style={{width:150}}></img>
            {/*<Button style ={{backgroundColor:'red'}}>Delete</Button>*/}
          </Container>
        )}
      </Draggable>
    )
  }
}
