import { timeAgo } from "../../utilities/lib";
import ActionComment from "./ActionComment";
import ListReply from "./ListReply";

export default function ItemComment(data) {
  return /*html*/`
    <!-- comment item -->
    <div class="item-comment">
      <div class="img-user-comment">
        <img src="https://toco-production-v1.firebaseapp.com/assets/icons/logo_icon.png" alt="">
      </div>
      <div class="container-comment">
        <div class="user-name-comment">
          <p>${data.fullName}</p>
          <p>${timeAgo(data.createAt)}</p>
        </div>
        <p class="content-comment">${data.text}</p>
        <div>
          ${ActionComment(data)}
        </div>
          ${ListReply(data._id ,data.replies)}
      </div>
    </div>


  `
}
