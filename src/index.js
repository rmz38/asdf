import React from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import AddCard from './addCard'
import AddReaction from './addReaction'
import DownloadFight from './downloadFight'
import initialData from './initial-data'
import Column from './column'
import ReactionColumn from './reactionColumn'
import { Button, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Xarrow from 'react-xarrows'
const Container = styled.div`
  display:flex;
`
const rootStyle = { display: 'flex', justifyContent: 'center' };
const rowStyle = { margin: '200px 0', display: 'flex', justifyContent: 'space-between', }
const boxStyle = { padding: '10px', border: '1px solid black', };

class App extends React.Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props)
    // Set the state directly. Use props if necessary.
    this.state = initialData
    // this.archer = React.createRef()
    this.dothething = this.dothething.bind(this);
    this.color = {color:"#00ff00"}
    this.ref1 = React.createRef()
    this.ref2 = React.createRef()

  }
  dothething = () => {
    console.log("Asdf")
    // this.color.color = "#0000ff"
    console.log("Asdfasdf")
    this.setState(this.state)
  }
  componentDidMount() {
    // this.dothething = this.archer.current.refreshScreen
    // this.archer.current.refreshScreen()
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
  addReaction = (nr, cardname) => {
    if (!(nr.name in this.state.reactions)){
      let newReaction = JSON.parse(JSON.stringify(nr))
      newReaction.id = this.state.reactionCounter
      this.state.reactionCounter += 1
      this.state.reactions[newReaction.name] = newReaction
      this.state.reactionColumn.reactionIds.unshift(newReaction.name)
      if (cardname != null) {
        this.state.cards[cardname].reactions.push(newReaction.id)
      }
      this.setState(this.state)
    }
  }
  getReactions = (reactionids) => {
    reactionids = new Set(reactionids)
    const reactions = this.state.reactions
    const reactionObjects = {}
    for (const [key, value] of Object.entries(reactions)) {
      if (reactionids.has(reactions[key].id)){
        reactionObjects[key] = reactions[key]
      }
    }
    return reactionObjects
  }
  getCards = (cardids) => {
    cardids = new Set(cardids)
    const cards = this.state.cards
    const cardObjects = {}
    for (const [key, value] of Object.entries(cards)) {
      if (cardids.has(cards[key].id)) {
        cardObjects[key] = cards[key]
      }
    }
    return cardObjects
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
      this.state.reactions = {};
      // in case key doesnt match name, since keys dont matter in game code\
      let max = -1
      for (const [key, value] of Object.entries(reactions)) {
        this.state.reactions[reactions[key].name] = value
        this.state.reactionColumn.reactionIds.push(reactions[key].name)
        max = reactions[key].id > max ? reactions[key].id : max
      }
      this.state.reactionCounter = max + 1
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
  download = (data) => {
    const filename = "enemyFight.json"
    const contentType = "application/json;charset=utf-8;"
    const objectData = JSON.stringify(data, null, 2)
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
    delete this.state.reactions[name]
    this.state.reactions[val.name] = val
    let index = this.state.reactionColumn.reactionIds.indexOf(name)
    this.state.reactionColumn.reactionIds[index] = val.name

    this.setState({
      ...this.state
    })
  }
  deleteCard = (name) => {
    let cardid = this.state.cards[name].id
    let cardlevel = this.state.cards[name].level
    delete this.state.cards[name]
    let newCol = []
    //delete card from cards and columns
    for (let j = 0; j < this.state.columns['column-'+cardlevel].cardIds.length; j++){
      if (this.state.columns['column-'+cardlevel].cardIds[j] != name){
        newCol.push(this.state.columns['column-'+cardlevel].cardIds[j])
      }
    }
    this.state.columns['column-'+cardlevel].cardIds = newCol
    //delete card from reactions
    for (const [key, value] of Object.entries(this.state.reactions)) {
      let cshuffled = this.state.reactions[key].addToDeck
      let newCards = []
      for (let i = 0; i < cshuffled.length; i++){
        if (cshuffled[i] != cardid) {
          newCards.push(cshuffled[i])
        }
      }
      this.state.reactions[key].addToDeck = newCards
    }
    this.setState({
      ...this.state
    })
  }

  deleteReaction = (name) => {
    let reactionid = this.state.reactions[name].id
    delete this.state.reactions[name]
    let newCol = []
    for (let k = 0; k < this.state.reactionColumn.reactionIds.length; k++){
      if (this.state.reactionColumn.reactionIds[k] != name) {
        newCol.push(this.state.reactionColumn.reactionIds[k])
      }
    }
    this.state.reactionColumn.reactionIds = newCol
    for (const [key, value] of Object.entries(this.state.cards)) {
      let resps = this.state.cards[key].reactions
      let newReactions = []
      for (let i = 0; i < resps.length; i++){
        if (resps[i] != reactionid) {
          newReactions.push(resps[i])
        }
      }
      this.state.cards[key].reactions = newReactions
    }
    this.setState({
      ...this.state
    })
  }
  onDragEnd = result => {
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
      newCardIds.splice(destination.index, 0, draggableId)
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
      newReactionIds.splice(destination.index, 0, draggableId)
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
    return (
      <div id="canvas">
        <div style={{height:140, display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div style={{display:'flex', flexDirection: 'column', paddingLeft: 10}}>
            <label id="smh">
              Upload Card
              <input name = "cardupload" type="file" onChange={this.uploadCards}></input>
            </label>
            <AddCard addCard = {this.addCard}></AddCard>
            <Button onClick = {this.downloadCards}>Download Cards</Button>
            {/* <button id="smh2"></button> */}
          </div>
          <div style={{display:'flex', flexDirection: 'column', paddingLeft: 10}}>
            <DownloadFight downloadFight = {this.download} ></DownloadFight>
          </div>
          <div style={{display:'flex', flexDirection: 'column'}}>
            <label >
              Upload Reaction
              <input name = "reactionupload" type="file" onChange={this.uploadReactions}></input>
            </label>
            <AddReaction cardname={null} addReaction = {this.addReaction}></AddReaction>
            <Button onClick = {this.downloadReactions}>Download Reactions</Button>
          </div>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
            {this.state.columnOrder.map(columnId => {
              const column = this.state.columns[columnId]
              const cards = column.cardIds.map(
                cardId => this.state.cards[cardId]
              )
              return (
                  <Column key={column.id} column={column} 
                    cards={cards} handler={this.cardhandler} 
                    delete ={this.deleteCard} 
                    reactionHandler = {this.reactionhandler} 
                    reactionDelete = {this.deleteReaction}
                    getReactions={this.getReactions}
                    addReaction = {this.addReaction}
                    refreshScreen={this.dothething}
                    getCards={this.getCards}
                    color={this.color}/>
              )
            })}
              <ReactionColumn key='reac' column={this.state.reactionColumn} reactions={reactions} 
                  delete = {this.deleteReaction} handler={this.reactionhandler}/>
          </Container>
        </DragDropContext>
        {/* <Xarrow start="smh" end="smh" extendSVGcanvas={100000}></Xarrow> */}
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
