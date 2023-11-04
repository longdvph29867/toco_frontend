import "../../../style/comment.css";
import { commentService } from "../../service/viewsService";
import { useEffect, useState } from "../../utilities/lib";
import ItemComment from "./ItemComment";

export default function Comments(idProduct = null) {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    if(idProduct) {
      commentService.getCommentByProduct(idProduct)
      .then((res) => {
        // console.log(res);
        setCommentList(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [idProduct])
  
  return /*html*/ `
  <div class="comment">
    <div>
      <h3 class="title-comment">${commentList.length} Bình luận</h3>
      <!-- form comment -->
      <div class="contianer-form-reply container-form-comment">
        <div class="img-user-comment">
          <img style="width: 40px;" src="https://toco-production-v1.firebaseapp.com/assets/icons/logo_icon.png" alt="">
        </div>
        <form action="" class="form-reply">
          <input type="text" placeholder="Viết bình luận...">
          <div class="action-form-reply">
            <div class="error-form-reply">
              <span>Lorem, ipsum dolor sit amet consectetur adipisicing em non. </span>
            </div>
            <div class="btn-form-reply">
              <button type="button" class="btn-close-reply">Huỷ</button>
              <button class="btn-submit-reply" disabled>Phản hồi</button>
            </div>
          </div>
        </form>
      </div>
      <!-- list comments -->
      <div class="list-comment">
        <!-- item comment -->
        ${[...commentList].reverse().map((item, index) => {
          return ItemComment(item)
        }).join('')}

      </div>
    </div>
  </div>
  `;
}
