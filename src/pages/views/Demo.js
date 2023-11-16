import { viewsService } from "../../service/viewsService";
import { showMesssage, useEffect } from "../../utilities/lib";

export default function Demo() {
  useEffect(() => {
    viewsService
      .getCatagories()
      .then((res) => {
        console.log(res);
        showMesssage(true, "thanh cong");
      })
      .catch((err) => {
        console.log(err);
        showMesssage(false, "ERR");
      });

    document.querySelector("button").addEventListener("click", function () {
      showMesssage(false, "thanh cong");
    });
  }, []);
  return /*html*/ `
    <div>HomePage
    <button> Show</button></div>
  `;
}
