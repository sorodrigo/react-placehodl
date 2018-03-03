import React from 'react';
import PropTypes from 'prop-types';
import frand from 'fast-random';

class Placehodl extends React.Component {
  generator = frand(this.props.seed);

  sizes = ['small', 'medium', 'large', 'xsmall', 'xlarge'];

  getSize = (size = 3) => {
    const index = parseInt(this.generator.nextInt(), 10) % size;
    return this.sizes[index];
  };

  getLine = (words = 3, size) =>
    Array(words)
      .fill(0)
      .map(() => (
        <div className={`react-placehodl-word ${this.getSize(size)}`} />
      ));

  getParagraph = (lines = 3, words, size) =>
    Array(lines)
      .fill(0)
      .map(() => (
        <div className={`react-placehodl-paragraph ${this.getSize(size)}`}>
          {this.getLine(words)}
        </div>
      ));

  render() {
    const { children, className } = this.props;
    const { getSize, getLine, getParagraph } = this;
    return (
      <div className={`react-placehodl ${className}`}>
        {children({ getSize, getLine, getParagraph })}
      </div>
    );
  }
}

Placehodl.propTypes = {
  seed: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.func.isRequired
};

export default Placehodl;
