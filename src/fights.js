import React from 'react'
import Fight from'./fight'
import styled, { consolidateStreamedStyles } from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Button, Dropdown, InputGroup, FormControl } from 'react-bootstrap';



export default class FightDropdown extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props.fights)
    const fights = this.props.fights.map((fight, index) => 
      <Fight saveFight={this.props.saveFight} fight={fight} index={index} text={"Save Fight"}></Fight>
    )
    return (
        <div>
          <Dropdown>
            <Dropdown.Toggle
            variant="success" id="dropdown-basic" style = {{width:'100%', backgroundColor:'purple', borderColor: 'purple'}}>
              Edit Enemy Fights
            </Dropdown.Toggle>
            <Dropdown.Menu className="fight-menu">
               {fights}
            </Dropdown.Menu>
            <Button onClick={()=>this.props.downloadFight()}>Download Fights</Button>
          </Dropdown>
        </div>
         
    )
  }
}