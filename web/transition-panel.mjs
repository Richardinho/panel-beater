export function transitionPanel(panel, strategy){
  return new Promise((resolve)=> {
    /*
     *  apply from styles
     */

    Object.assign(panel.style, strategy.from);

    /*
     *  force a reflow
     */

    document.body.clientHeight; 

    panel.addEventListener("transitionend", () => {
      /*
       *  apply end styles
       */

      Object.assign(panel.style, strategy.reset);

      /*
       *  resolve promise when animation has completed
       */

      resolve(panel);
    }, { once: true });

    /*
     *  apply to styles
     */

    Object.assign(panel.style, strategy.to);
  });
}
