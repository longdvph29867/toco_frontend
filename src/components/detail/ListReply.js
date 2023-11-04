import { useEffect, useState } from "../../utilities/lib";
import Itemreply from "./Itemreply";

export default function ListReply( idComment, replies) {
  const [showReply, setShowReply] = useState(false)
  useEffect(() => {
    const btnShowReply = document.querySelector(`.btn-show-reply-${idComment}`)
    btnShowReply.addEventListener('click', function () {
      setShowReply(!showReply)
    })
  })
  
  return /*html*/`
  <!-- btn show reply -->
  <div>
    <button class="btn-show-reply btn-show-reply-${idComment} ${replies.length === 0 ? 'hidden' : ''}">
      <div class="arrow-down ${showReply ? 'arrow-up' : ''}"></div>
      <span>${replies.length} Phản hồi</span>
    </button>
  </div>
  <!-- list replies -->
  <div class="list-replies ${showReply ? '' : 'hidden'}">
  
    <!-- item-reply -->
    ${[...replies].reverse().map(item => {
      return Itemreply(item)
    }).join('')}
  </div>
  `
}
