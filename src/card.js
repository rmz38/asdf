import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Button, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import Reaction from './reaction'
import AddReaction from './addReaction'
import Xarrow from "react-xarrows";
import { ArcherElement } from 'react-archer';
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
    this.color = "#00000000"
    this.state = {color:"#00000000", toggle:false}
  }
  toggleArrow = () => {
    if(this.state.toggle) {
      this.setState({
        ...this.state,
        color:"#00000000",
        toggle: !this.state.toggle
      })
    } else {
      this.setState({
        ...this.state,
        color:"#0000ff",
        toggle: !this.state.toggle
      })
    }
  }
  render() {
    this.temp = JSON.parse(JSON.stringify(this.props.card))
    const isDragDisabled = false
    let texture;
    try {
      texture = require('./cards/' + this.props.card.texture + '.png');
    } catch {
      texture = require('./cards/notfound.png')
    }
    const reactionComponents =[]
    let index = 0
    for (const [key, value] of Object.entries(this.props.reactions)) {
      let reaction = this.props.reactions[key]
      reactionComponents.push(
        <Reaction handler = {this.props.reactionHandler}
          delete = {this.props.reactionDelete}
          key={reaction.name} reaction={reaction} index={index}></Reaction>
        )
      index++
    }
    const pointCards = []
    // for (const [key, value] of Object.entries(this.props.pointCards)) {
    //   pointCards.push({
    //     targetId: key,
    //     targetAnchor: 'middle',
    //     sourceAnchor: 'middle',
    //     // style: { strokeDasharray: '5,5', strokeColor: this.props.color.color },
    //     style: { strokeDasharray: '5,5', strokeColor: '#' + Math.floor(Math.random()*16777215).toString(16) + '80' },
    //   })
    //   // console.log(reaction.name)
    // }
    // console.log(pointCards)

    for (const [key, value] of Object.entries(this.props.pointCards)) {
      pointCards.push(<Xarrow
        start={this.props.card.name}
        end={key}
        startAnchor="middle"
        endAnchor="middle"
        path= "smooth"
        dashness={true}
        // curveness={0}
        color={this.state.toggle ? this.state.color  : "#00000000"}
        extendSVGcanvas={10000000}
        >
      </Xarrow>)
      // console.log(reaction.name)
    }

    // const relation = [{
    //   targetId: 'element2',
    //   targetAnchor: 'top',
    //   sourceAnchor: 'bottom',
    //   style: { strokeDasharray: '5,5' },
    // }]
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
            {/* <ArcherElement
              id={this.props.card.name}
              relations={pointCards}
            > */}
              <div>
              {pointCards}
              <Button onClick={()=>this.toggleArrow()}>Toggle Arrow</Button>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width:'100%'}}>
                  Edit
                </Dropdown.Toggle>

                <Dropdown.Menu className="card-menu">
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
                  {reactionComponents}
                  <AddReaction cardname = {this.props.card.name} addReaction={this.props.addReaction}></AddReaction>
                  {/* {this.props.reactions.map((reaction, index) =>(
                    <Reaction handler = {this.props.reactionHandler}
                        delete = {this.props.reactionDelete}
                        key={reaction.name} reaction={reaction} index={index}></Reaction>
                  ))} */}
                <Button onClick={()=>this.props.handler(this.props.index, this.props.card.name, this.temp)}>Save</Button>
                </Dropdown.Menu>
              </Dropdown>
              <img id = {this.props.id} src={texture} style={{width:150}}></img>
              <Button style ={{backgroundColor:'red'}} onClick= {()=>this.props.delete(this.props.card.name)}>Delete</Button>
            </div>
            {/* </ArcherElement> */}
          </Container>
        )}
      </Draggable>
    )
  }
}
