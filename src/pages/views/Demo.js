import { viewsService } from "../../service/viewsService"
import { showMesssage, useEffect } from "../../utilities/lib"

export default function Demo() {
  useEffect( () => {
    viewsService.getCatagories()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

    document.querySelector('button').addEventListener('click', function() {
      showMesssage(true, "thanh cong")
    })
  },[])
  return /*html*/`
    <div>HomePage
    <button> Show</button></div>
  `
}
