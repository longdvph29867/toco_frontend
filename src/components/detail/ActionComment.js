import { useEffect, useState } from "../../utilities/lib"

export default function ActionComment(data) {
  const [showFormReply, setShowFormReply] = useState(false)
  useEffect (() => {
    const btnShowReply = document.querySelector(`.btn-show-form-reply-${data._id}`)
    const btnHiddenReply = document.querySelector(`.btn-close-form-reply-${data._id}`)
    btnShowReply.addEventListener('click', function () {
      setShowFormReply(true)
    })
    btnHiddenReply.addEventListener('click', function () {
      setShowFormReply(false)
    })
  })
  return /*html*/`
  <!-- action -->
  <div>
    <div class="action-comment">
      <button class="btn-like-comment btn-like-comment-active">
        <i class="fa-solid fa-thumbs-up"></i>
      </button>
      <div class="quantity-like-comment">200</div>
        <button class="btn-add-reply btn-show-form-reply-${data._id}">Phản hồi</button>
    </div>
    <div class="contianer-form-reply ${showFormReply ? '' : 'hidden'}">
      <div class="img-user-comment">
        <img src="https://toco-production-v1.firebaseapp.com/assets/icons/logo_icon.png" alt="">
      </div>
      <form action="" class="form-reply">
        <input type="text" placeholder="Phản hồi...">
        <div class="action-form-reply">
          <div class="error-form-reply">
            <span>Lorem, ipsum dolor sit amet consectetur adipisicing em non. </span>
          </div>
          <div class="btn-form-reply">
            <button type="button" class="btn-close-reply btn-close-form-reply-${data._id}">Huỷ</button>
            <button class="btn-submit-reply" disabled>Phản hồi</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  `
}
