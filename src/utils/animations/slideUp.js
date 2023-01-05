import React from 'react';

// Material UI
import Slide from '@material-ui/core/Slide';

export const SlideUp = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
