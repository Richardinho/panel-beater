const EXIT_DURATION = 1;
const ENTRY_DURATION = EXIT_DURATION * 1;

export const strategies = {

  /*
   *  right to left exit
   */

  rtlexit : {
    from : {
      transform : 'translate(0, 0)',
    },
    to : {
      transition : `${EXIT_DURATION}s ease transform`,
      transform : 'translate(100%, 0)',
    },
    reset : {
      transition : 'initial',
    },
  },

  /*
   *  left to right entry
   */

  ltrentry : {
    from : {
      transform : 'translate(-100%, 0)',
    },
    to : {
      transition : `${ENTRY_DURATION}s ease transform`,
      transform : 'translate(0, 0)',
    },
    reset : {
      transition : 'initial',
    },
  },

  /*
   * bottom to top entry
   */

  bttentry : {
    from : {
      transform : 'translate(0, 100%)'
    },
    to : {
      transition: `${ENTRY_DURATION}s ease transform`,
      transform : 'translate(0, 0)'
    },
    reset : {
      transition : 'initial'
    },
  },

  /*
   *  bottom to top exit
   */

  bttexit : {
    from : {
      transform : 'translate(0, 0)'
    },
    to : {
      transition: `${EXIT_DURATION}s ease transform`,
      transform : 'translate(0, -100%)'
    },
    reset : {
      transition : 'initial'
    },
  },

  /*
   *  right to left exit
   */

  rtlexit : {
    from : {
      transform : 'translate(0%, 0)'
    },
    to : {
      transition : `${EXIT_DURATION}s ease transform`,
      transform : 'translate(-100%, 0)'
    },
    reset : {
      transition : 'initial'
    },
  },
};
