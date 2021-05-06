import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Button, Dropdown, InputGroup, FormControl } from 'react-bootstrap';

export default class Fight extends React.Component {
  constructor(props) {
    super(props)
    this.temp = {
      "enemyName": "Wolven Thug",
      "enemyTexture": "wolvenThug",
      "deck": [ 1, 2 ],
      "background": "background"
    }
  }
  render() {
    this.temp = {
      "enemyName": "Wolven Thug",
      "enemyTexture": "wolvenThug",
      "deck": [ 1, 2 ],
      "background": "background"
    }
    if (this.props.fight != undefined){
      this.temp = this.props.fight
    }
    const title = this.props.title != undefined ? this.props.title : "Edit "  + this.temp.enemyName + " Fight"
    return (
        <div>
          <Dropdown>
            <Dropdown.Toggle
            variant="success" id="dropdown-basic" style = {{width:'100%', backgroundColor:'purple', borderColor: 'purple'}}>
              {title}
            </Dropdown.Toggle>
            <Dropdown.Menu className="fight-menu">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="nameInput">Enemy Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder={this.temp.enemyName}
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
                  placeholder={this.temp.enemyTexture}
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
                  placeholder={this.temp.background}
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
              <Button onClick = {() => this.props.downloadFight(this.temp)}>{this.props.text}</Button> 
            </Dropdown.Menu>
          </Dropdown>
        </div>
         
    )
  }
}