import React from 'react';
import PropTypes from 'prop-types';
import frand from 'fast-random';

class Placehodl extends React.Component {
  generator = frand(this.props.seed);
  sizes = ['small', 'medium', 'large', 'xsmall', 'xlarge'];

  componentDidUpdate() {
    this.generator = frand(this.props.seed);
  }

  getSize = (size = 3) => {
    const index = parseInt(this.generator.nextInt(), 10) % size;
    return this.sizes[index];
  };

  getLine = (words = 3, size) => {
    const { prefix } = this.props;
    return (
      <div className={`${prefix}-line`}>
        {Array(words)
          .fill(0)
          .map(() => (
            <div className={`${prefix}-word ${this.getSize(size)}`} />
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
          .map(() => this.getLine(words, size))}
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
  prefix: PropTypes.string
};

Placehodl.defaultProps = {
  prefix: 'react-placehodl'
};

export default Placehodl;
