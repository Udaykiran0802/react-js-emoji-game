/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.

import {Component} from 'react'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'
import './index.css'

class EmojiGame extends Component {
  state = {newEmojisList: [], isGameOver: false, topScore: 0}

  shuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  setIsGameOver = value => {
    this.setState({isGameOver: value})
  }

  resetGame = () => {
    this.setIsGameOver(false)
    this.setState({newEmojisList: []})
  }

  setTopScore = currentScore => {
    const {topScore} = this.state
    if (currentScore > topScore) {
      this.setState({topScore: currentScore})
    }
  }

  finishGameAndSetTopScore = newScore => {
    this.setIsGameOver(true)
    this.setTopScore(newScore)
  }

  isEmojiClicked = emojiId => {
    const {emojisList} = this.props
    const {newEmojisList} = this.state
    const isEmojiPresent = newEmojisList.includes(emojiId)
    const clickedEmojisLength = newEmojisList.length

    if (isEmojiPresent) {
      this.finishGameAndSetTopScore(clickedEmojisLength)
    } else {
      if (emojisList.length - 1 === clickedEmojisLength) {
        this.finishGameAndSetTopScore(emojisList.length)
      }
      this.setState(prevState => ({
        newEmojisList: [...prevState.newEmojisList, emojiId],
      }))
    }
  }

  renderEmojiList = () => {
    const getShuffledEmojisList = this.shuffledEmojisList()

    return (
      <ul className="emoji-list-container">
        {getShuffledEmojisList.map(eachEmoji => (
          <EmojiCard
            key={eachEmoji.id}
            eachEmoji={eachEmoji}
            isEmojiClicked={this.isEmojiClicked}
          />
        ))}
      </ul>
    )
  }

  renderScoreCard = () => {
    const {emojisList} = this.props
    const {newEmojisList} = this.state
    const isWon = newEmojisList.length === emojisList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
        score={newEmojisList.length}
      />
    )
  }

  render() {
    const {newEmojisList, isGameOver, topScore} = this.state
    console.log(newEmojisList)

    return (
      <div className="app-container">
        <NavBar
          currentScore={newEmojisList.length}
          isGameOver={isGameOver}
          topScore={topScore}
        />
        <div className="emojis-game-card-container">
          {isGameOver ? this.renderScoreCard() : this.renderEmojiList()}
        </div>
      </div>
    )
  }
}
export default EmojiGame
