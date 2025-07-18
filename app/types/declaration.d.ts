declare module '*.png' {
    const value: any;
    export default value;
  }
  declare module '*.jpg' {
    const value: any;
    export default value;
  }
  declare module '*.jpeg' {
    const value: any;
    export default value;
  }
  declare module '*.gif' {
    const value: any;
    export default value;
  }
  declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }