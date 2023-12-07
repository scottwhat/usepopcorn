
import { useEffect } from "react"; 
export function useKey(key, action) {

    useEffect(
        function () {
          function callback(e) {
            if (e.code.toLowerCase() === key.toLowerCase()) {
              action();
            }
          }
          document.addEventListener("keydown", action);
    
          //once the component unmounts remove the extra event listener
          return function () {
            document.removeEventListener("keydown", action);
          };
        },
        //always include all vars so that if they change it rerenders 
        [action, key ]
      );

}