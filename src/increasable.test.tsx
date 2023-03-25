import type { ReactNode } from 'react';
import { fireEvent, render } from '@testing-library/react';
import Increasable from './increasable';
import { describe, it } from 'vitest';

const sampleClass = 'sample-class';
const INNER_HTML = 'HELLO';

function SampleComponent({ children }: { children?: ReactNode }): JSX.Element {
  return <div className={sampleClass}>{children}</div>;
}

describe('Increasable with props', () => {
  it('Increasable Should render With Required Props', () => {
    const RENDER = render(
      <Increasable
        rootElement={SampleComponent}
        render={({ Elm }) => {
          return (
            <>
              {Elm.map((Item) => (
                <Item />
              ))}
            </>
          );
        }}
      />
    );
    expect(RENDER).toHaveReturned;
  });

  it('Component Should Render Two Instance of Root Element By default', () => {
    const { getAllByText } = render(
      <Increasable
        defaultElementCount={2}
        rootElement={SampleComponent}
        render={({ Elm }) => {
          return Elm.map((Item) => <Item> {INNER_HTML} </Item>);
        }}
      />
    );
    expect(getAllByText(INNER_HTML).length === 2).toBe(true);
  });

  it('Component Should Add More Instance By Click', () => {
    let clickCount = 0;
    const { getAllByText } = render(
      <Increasable
        rootElement={SampleComponent}
        render={({ Elm, increaseElement, currentElementsLength }) => {
          expect(currentElementsLength === clickCount);
          return (
            <>
              {Elm.map((Item) => (
                <Item>{INNER_HTML}</Item>
              ))}
              <button id="clickable" onClick={increaseElement} type="button">
                click
              </button>
            </>
          );
        }}
      />
    );
    const clickableBtn = document.querySelector('#clickable');
    if (clickableBtn) {
      fireEvent.click(clickableBtn);
      clickCount += 1;
    }
    expect(getAllByText(INNER_HTML).length === clickCount).toBe(true);
  });

  it('By Defining Max Reach Count Prop Component Shouldnt Generate More By Click', () => {
    const maxCount = 2;
    const { getAllByText } = render(
      <Increasable
        rootElement={SampleComponent}
        maxCount={maxCount}
        render={({ Elm, increaseElement }) => {
          return (
            <>
              {Elm.map((Item) => (
                <Item>{INNER_HTML}</Item>
              ))}
              <button id="clickable" onClick={increaseElement} type="button">
                click
              </button>
            </>
          );
        }}
      />
    );

    const clickableBtn = document.querySelector('#clickable');
    if (clickableBtn) {
      fireEvent.click(clickableBtn);
      fireEvent.click(clickableBtn);
      fireEvent.click(clickableBtn);
      fireEvent.click(clickableBtn);
      fireEvent.click(clickableBtn);
      expect(getAllByText(INNER_HTML).length).toBe(maxCount);
    }
  });
});
