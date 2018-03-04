import React from 'react';
import PropTypes from 'prop-types';
import frand from 'fast-random';

class Placehodl extends React.Component {
  generator = frand(this.props.seed);

  componentDidUpdate() {
    this.generator.seed(this.props.seed);
  }

  getSize = (size = 3) => {
    const { sizes } = this.props;
    if (size > sizes.length) {
      throw new Error(
        `Index (${
          sizes.length
        } % ${size}) may not be available in [${sizes}]. Use only a size <= sizes.length`
      );
    }
    const index = parseInt(this.generator.nextInt(), 10) % size;
    return sizes[index];
  };

  getLine = (words = 3, size) => {
    const { prefix } = this.props;
    return (
      <div className={`${prefix}-line`}>
        {Array(words)
          .fill(0)
          .map((w, i) => (
            <div
              key={`${prefix}-word-${i}`}
              className={`${prefix}-word ${this.getSize(size)}`}
            />
          ))}
      </div>
    );
  };

  getParagraph = (lines = 3, words, size) => {
    const { prefix } = this.props;
    return (
      <div className={`${prefix}-paragraph`}>
        {Array(lines)
          .fill(0)
          .map((l, i) =>
            React.createElement(
              // Use createElement instead of using a Fragment for React <= 15 compatibility
              () => this.getLine(words, size),
              { key: `${prefix}-paragraph-${i}` }
            )
          )}
      </div>
    );
  };

  render() {
    const { children, className, prefix } = this.props;
    const { getSize, getLine, getParagraph } = this;
    return (
      <div className={`${prefix} ${className || ''}`}>
        {children({ getSize, getLine, getParagraph })}
      </div>
    );
  }
}

Placehodl.propTypes = {
  seed: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  sizes: PropTypes.arrayOf(PropTypes.string)
};

Placehodl.defaultProps = {
  prefix: 'react-placehodl',
  sizes: ['small', 'medium', 'large', 'xsmall', 'xlarge']
};

export default Placehodl;
