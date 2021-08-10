import './index.css'

const EmojiCard = props => {
  const {eachEmoji, isEmojiClicked} = props
  const {id, emojiName, emojiUrl} = eachEmoji

  const onClickEmoji = () => {
    isEmojiClicked(id)
  }

  return (
    <li className="list-item">
      <button className="list-item-button" type="button" onClick={onClickEmoji}>
        <img src={emojiUrl} alt={emojiName} className="list-emoji" />
      </button>
    </li>
  )
}

export default EmojiCard
