# react-placehodl
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

### Example
```jsx
 import Placehodl from 'react-placehodl';

 const Placeholder = props => {
   return (
     <Placehodl seed={props.seed} prefix="my-placeholder">
       {({ getParagraph, getLine, getSize }) => (
         <React.Fragment>
           {/* outputs paragraph with 10 lines, 3 words, 5 sizes */}
           {getParagraph(10, 3, 5)}
           <div className="placeholder-paragraph">
             {Array(10)
               .fill(0)
               .map((line, i) => (
                 <div
                   key={`placeholder-line-container-${i}`}
                   className="placeholder-line-container"
                 >
                   {/* outputs line with 3 words, 5 sizes */}
                   {getLine(3, 5)}
                   <Icon name="info" />
                 </div>
               ))}
           </div>
           <div className="placeholder-paragraph">
             {Array(10)
               .fill(0)
               .map((line, i) => (
                 <div key={`placeholer-line-${i}`} className="placeholder-line">
                   {Array(3)
                     .fill(0)
                     .map((word, j) => (
                       <div
                         key={`placeholder-word-${j}`}
                         className={`placeholder-line-container ${getSize(5)}`}
                       >
                         {/* outputs word 5 possible sizes */}
                       </div>
                     ))}
                 </div>
               ))}
           </div>
         </React.Fragment>
       )}
     </Placehodl>
   );
 };
```
