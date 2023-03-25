import React from 'react';
import { IncreasableProps, IncreasableState, rootElementType } from './types';

class Increasable<RET extends rootElementType> extends React.Component<IncreasableProps<RET>, IncreasableState<RET>> {
  private INITIAL_COUNT = 0;
  constructor(props: IncreasableProps<RET>) {
    super(props);
    const defaultCount =
      typeof this.props?.defaultElementCount === 'number' ? this.props.defaultElementCount : this.INITIAL_COUNT;
    const elements = Array.from(Array(defaultCount), () => this.props.rootElement);
    this.state = {
      elements,
    };
  }

  handleIncrease = (): void => {
    const maxCount = this.props.maxCount;
    const currentLength = this.state.elements.length;
    const addElement = () => {
      this.setState({
        elements: this.state.elements.concat(this.props.rootElement),
      });
    };
    if (typeof maxCount === 'number' && currentLength < maxCount) {
      addElement();
      console.log('1');
    } else if (typeof maxCount === 'undefined') {
      addElement();
      console.log('2');
    }
  };

  render() {
    const isReachedMaxCount = (this.props.maxCount || this.INITIAL_COUNT) >= this.state.elements.length;
    return (
      <>
        {this.props.render({
          Elm: this.state.elements,
          currentElementsLength: this.state.elements.length,
          increaseElement: this.handleIncrease,
          isReachedMaxCount,
        })}
      </>
    );
  }
}

export default Increasable;
