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

  render() {
    const { children, className } = this.props;
    const { getSize } = this;
    return (
      <div className={`react-placehodl ${className}`}>
        {children({ getSize })}
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
