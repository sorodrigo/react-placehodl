# react-placehodl 📌
React placeholders made simple.

![react-placehodl](placehodl.gif)

## Installation
```bash
$ npm i react-placehodl
```

## Motivation
Placeholders are cool. Placeholder are way cooler than spinners. Current libraries implementing 
placeholder are super complicated. There's prefabricated components with pre-made styles you must
 import, and there's ways to make custom ones that interact with these libraries. This doesn't 
 really allow much flexibility, which is the motivation of this lib.
 
## Render Prop
Yeah, yeah, yeah... We're all aware of the hype going on with the render prop. Just happens to be 
that a placeholder is the perfect use case for them.

## API

### Props
The `<Placehodl />` component has the following props:
- seed => Seed for the size randomizer. (Powered by _fast-random_).
- sizes => Array of size classNames that will be applied to each word.
- prefix => Prefix used in all elements classes.
- className => Root level class name.
- children => Function that gets passed the generator methods.

### Generator methods
- getParagraph => Returns a paragraph composed by lines. 
```js
// lines - corresponds with number of lines in the paragraph
// words - corresponds with number of words per line
// size - corresponds with number of size possibilities for each word.
getParagraph(lines: int, words: int, size: int) => (paragraph: jsx)
```

- getLine => Returns a line composed by words
```js
// words - corresponds with number of words in the line
// size - corresponds with number of size possibilities for each word.
getLine(words: int, size: int) => (line: jsx)
```

- getSize => Returns a className corresponding to one of the size possibilities.
```js
// size - corresponds with number of size possibilities in the returned className.
getSize(size: int) => (className: string)
```

## Examples

### Use of getParagraph (works out of the box use case)
```jsx
 import Placehodl from 'react-placehodl';
 
 // outputs paragraph with 10 lines, 3 words, 5 sizes
 const Placeholder = props => {
   return (
     <Placehodl seed={props.seed} prefix="my-placeholder">
       {({ getParagraph }) => getParagraph(10, 3, 5)}
     </Placehodl>
   );
 };
```

### Use of getLine (medium customization use case)
```jsx
  import Placehodl from 'react-placehodl';
  
  // outputs line with 3 words, 5 sizes
  const Placeholder = props => {
    return (
      <Placehodl seed={props.seed} prefix="my-placeholder">
        {({ getLine }) => (
          <div className="my-placeholder-paragraph">
            {Array(10)
              .fill(0)
              .map((line, i) => (
                <div
                  key={`placeholder-line-container-${i}`}
                  className="my-placeholder-line-container"
                >
                  {getLine(3, 5)}
                  <Icon name="info" />
                </div>
              ))}
          </div>
        )}
      </Placehodl>
    );
  };
```

### Use of getSize (advanced customization use case)
```jsx
import Placehodl from 'react-placehodl';

// outputs word 5 possible sizes
const Placeholder = props => {
  return (
    <Placehodl seed={props.seed} prefix="my-placeholder">
      {({ getSize }) => (
        <div className="my-placeholder-paragraph">
          {Array(10)
            .fill(0)
            .map((line, i) => (
              <div key={`placeholer-line-${i}`} className="my-placeholder-line">
                {Array(3)
                  .fill(0)
                  .map((word, j) => (
                    <div
                      key={`placeholder-word-${j}`}
                      className={`my-placeholder-line-container ${getSize(5)}`}
                    />
                  ))}
              </div>
            ))}
        </div>
      )}
    </Placehodl>
  );
};
```
