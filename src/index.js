import React from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import AddCard from './addCard'
import AddReaction from './addReaction'
import initialData from './initial-data'
import Column from './column'
import ReactionColumn from './reactionColumn'
import { Button, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const Container = styled.div`
  display:flex;
`
class App extends React.Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);
    // Set the state directly. Use props if necessary.
    this.state = initialData
    console.log(this.state);
  }
  addCard = (nc) => {
    if (!(nc.name in this.state.cards)){
      let newCard = JSON.parse(JSON.stringify(nc))
      newCard.id = this.state.cardCounter
      this.state.cardCounter += 1
      this.state.cards[newCard.name] = newCard
      this.state.columns["column-" + newCard.level].cardIds.push(newCard.name)
      this.setState(this.state)
    }
  }
  addReaction = (nr) => {
    if (!(nr.name in this.state.reactions)){
      let newReaction = JSON.parse(JSON.stringify(nr))
      newReaction.id = this.state.reactionCounter
      this.state.reactionCounter += 1
      this.state.reactions[newReaction.name] = newReaction
      this.state.reactionColumn.reactionIds.unshift(newReaction.name)
      this.setState(this.state)
    }
  }
  uploadCards = (e) => {
    const fileReader = new FileReader();
    try{
      fileReader.readAsText(e.target.files[0], "UTF-8");
    } catch {
      return
    }
    fileReader.onload = e => {
      const cards = JSON.parse(e.target.result).Cards
      console.log(cards);
      this.state.cards = cards;
      for (const [key, value] of Object.entries(this.state.columns)) {
        this.state.columns[key].cardIds = []
      }
      let max = -1
      for (const [key, value] of Object.entries(cards)) {
        const item = cards[key]
        this.state.columns["column-" + item.level].cardIds.push(key)
        max = cards[key].id > max ? cards[key].id : max
      }
      this.state.cardCounter = max + 1
      console.log(this.state);
      const newState = {
        ...this.state
      }
      this.setState(newState)
    };
  }
  uploadReactions = (e) => {
    const fileReader = new FileReader();
    try{
      fileReader.readAsText(e.target.files[0], "UTF-8");
    } catch {
      return
    }
    fileReader.onload = e => {
      const reactions = JSON.parse(e.target.result).Responses
      console.log(reactions);
      this.state.reactions = {};
      // in case key doesnt match name, since keys dont matter in game code\
      let max = -1
      for (const [key, value] of Object.entries(reactions)) {
        this.state.reactions[reactions[key].name] = value
        this.state.reactionColumn.reactionIds.push(reactions[key].name)
        max = reactions[key].id > max ? reactions[key].id : max
      }
      this.state.reactionCounter = max + 1
      console.log(this.state);
      const newState = {
        ...this.state
      }
      this.setState(newState)
    };
  }
  downloadCards = () => {
    const filename = "cards.json"
    const contentType = "application/json;charset=utf-8;"
    const objectData = JSON.stringify({Cards:this.state.cards}, null, 2)
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      let blob = new Blob([decodeURIComponent(encodeURI(
        objectData))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      let a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(objectData);
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
  downloadReactions = () => {
    const filename = "responses.json"
    const contentType = "application/json;charset=utf-8;"
    const objectData = JSON.stringify({Responses:this.state.reactions}, null, 2)
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      let blob = new Blob([decodeURIComponent(encodeURI(
        objectData))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      let a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(objectData);
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
  //card handler
  cardhandler= (name, val, columnid)=>{
    console.log(this.state)
    delete this.state.cards[name]
    this.state.cards[val.name] = val
    let index = this.state.columns[columnid].cardIds.indexOf(name)
    this.state.columns[columnid].cardIds[index] = val.name

    this.setState({
      ...this.state
    })
  }
  //reaction handler
  reactionhandler= (name, val)=>{
    console.log(this.state)
    delete this.state.reactions[name]
    this.state.reactions[val.name] = val
    let index = this.state.reactionColumn.reactionIds.indexOf(name)
    this.state.reactionColumn.reactionIds[index] = val.name

    this.setState({
      ...this.state
    })
  }
  onDragEnd = result => {
    console.log(this.state)
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index || 
      (destination.droppableId in this.state.columns && source.droppableId == this.state.reactionColumn.id) ||
      (destination.droppableId == this.state.reactionColumn.id && source.droppableId in this.state.columns)
    ) {
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]
    if (start === finish && source.droppableId !== "reactionCol") {
      const newCardIds = Array.from(start.cardIds)
      newCardIds.splice(source.index, 1)
      // console.log(draggableId)
      newCardIds.splice(destination.index, 0, draggableId)
      console.log(newCardIds)
      const newColumn = {
        ...start,
        cardIds: newCardIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }
      this.setState(newState)
      return
    }
    if (start === finish) {
      const col = this.state.reactionColumn
      const newReactionIds = Array.from(col.reactionIds)
      newReactionIds.splice(source.index, 1)
      // console.log(draggableId)
      newReactionIds.splice(destination.index, 0, draggableId)
      console.log(newReactionIds)
      const newColumn = {
        ...col,
        reactionIds: newReactionIds
      }

      const newState = {
        ...this.state,
        reactionColumn: {
          ...newColumn
        }
      }
      this.setState(newState)
      return
    }
    // Moving from one list to another
    const startCardIds = Array.from(start.cardIds)
    startCardIds.splice(source.index, 1)
    const newStart = {
      ...start,
      cardIds: startCardIds
    }

    const finishCardIds = Array.from(finish.cardIds)
    finishCardIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      cardIds: finishCardIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      },
      cards: {
        ...this.state.cards,
        [draggableId]: {
          ...this.state.cards[draggableId],
          level: newFinish.level
        }
      }
    }
    this.setState(newState)
  }

  render() {
    const reactions = this.state.reactionColumn.reactionIds.map(
      reactionID => this.state.reactions[reactionID]
    )
    console.log(this.state)
    return (
      <div>
        <div style={{height:140, display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div style={{display:'flex', flexDirection: 'column', paddingLeft: 10}}>
            <label>
              Upload Card
              <input name = "cardupload" type="file" onChange={this.uploadCards}></input>
            </label>
            <AddCard addCard = {this.addCard}></AddCard>
            <Button onClick = {this.downloadCards}>Download Cards</Button>
          </div>
          <div style={{display:'flex', flexDirection: 'column'}}>
            <label>
              Upload Reaction
              <input name = "reactionupload" type="file" onChange={this.uploadReactions}></input>
            </label>
            <AddReaction addReaction = {this.addReaction}></AddReaction>
            <Button onClick = {this.downloadReactions}>Download Reactions</Button>
          </div>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
            {this.state.columnOrder.map(columnId => {
              const column = this.state.columns[columnId]
              // console.log(this.state.cards)
              const cards = column.cardIds.map(
                cardId => this.state.cards[cardId]
              )
              return (
                <Column key={column.id} column={column} cards={cards} handler={this.cardhandler} />
              )
            })}
              <ReactionColumn key='reac' column={this.state.reactionColumn} reactions={reactions} handler={this.reactionhandler}/>
          </Container>
        </DragDropContext>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
