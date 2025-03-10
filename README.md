# SageTodo

A simple todo app.

You'll find comments throughout the code with some of my thoughts and a bit of self-review.

To run locally:
```sh
npm run dev
```

To run tests:
```sh
npm run test
```

To run storybook:
```sh
npm run storybook
```



### Why Vite?
I was instructed to use Create React App to create this, however [as of the 14th Feb 2025](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) it is depreciated. I spent some time trying to use it anyway, but quickly came up against build error after build error and dependency issues galore.

For the sake of my sanity I'm using Vite, which appears to be what the Carbon team have done for their component library demo.

Rest assured, in a commercial setting, CRA being a hard requirement, I would make my fingers bleed to get it to work somehow.