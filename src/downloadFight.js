import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Button, Dropdown, InputGroup, FormControl } from 'react-bootstrap';

export default class DownloadFight extends React.Component {
  constructor(props) {
    super(props)
    this.temp = {
      "enemyName": "Wolven Thug",
      "enemyTexture": "wolvenThug.jpg",
      "deck": [ 1, 2 ],
      "background": "background.jpg"
    }
  }
  render() {
    return (
        <div>
          <label>
            Create Fight
          </label>
          <Dropdown>
            <Dropdown.Toggle
            variant="success" id="dropdown-basic" style = {{width:'100%', backgroundColor:'purple', borderColor: 'purple'}}>
              Edit Enemy Fight
            </Dropdown.Toggle>
            <Dropdown.Menu className="fight-menu">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="nameInput">Enemy Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder={"name"}
                  aria-label="name"
                  aria-describedby="basic-addon1"
                  onChange={(e)=>{
                    this.temp.enemyName = e.target.value
                  }}
              />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="nameInput">Enemy Texture</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder={"texture"}
                  aria-label="name"
                  aria-describedby="basic-addon1"
                  onChange={(e)=>{
                    this.temp.enemyTexture = e.target.value
                  }}
              />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="nameInput">Background</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder={"texture"}
                  aria-label="name"
                  aria-describedby="basic-addon1"
                  onChange={(e)=>{
                    this.temp.background = e.target.value
                  }}
              />
              </InputGroup>
              <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="reactions">Deck</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder={this.temp.deck}
                aria-label="texture"
                aria-describedby="basic-addon1"
                onChange={(e)=>{
                  let input = e.target.value
                  let deck = []
                  while(input.indexOf(',') > -1){
                    deck.push(+input.substring(0, input.indexOf(',')))
                    input = input.substring(input.indexOf(',') + 1)
                  }
                  if( input.length > 0) {
                    deck.push(+input)
                  }
                  this.temp.deck = deck
                }}
              />
            </InputGroup>
              <Button onClick = {() => this.props.downloadFight(this.temp)}>Download Fight</Button> 
            </Dropdown.Menu>
          </Dropdown>
        </div>
         
    )
  }
}