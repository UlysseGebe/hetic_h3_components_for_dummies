// import centered from '@storybook/addon-centered/vue';
// import { withKnobs, text } from '@storybook/addon-knobs';
// import MyButton from './MyButton.js';

// export default {
//   title: '02 - Molecules|MyButton',
//   decorators: [
//     centered,
//     withKnobs,
//   ],
// }

export const Heading = () => html`
  <my-button
    look="secondary"
    text="My Button"
    size="large"
    is-loading="false"
  ></my-button>
`;