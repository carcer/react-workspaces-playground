import { configure } from '@storybook/react';

configure(require.context('@ocdlimited/abp.react.account/src', true, /.stories.tsx$/), module);