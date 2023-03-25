import { ReactNode, ElementType, ComponentType } from 'react';

export type rootElementType = ReactNode | ElementType | JSX.Element;
export type renderProps<RET extends rootElementType, CP = any> = {
  Elm: RET[] extends JSX.Element ? ComponentType<CP>[] : RET[];
  increaseElement: VoidFunction;
  currentElementsLength: number;
  isReachedMaxCount: boolean;
};

export interface IncreasableProps<RET extends rootElementType, CP = any> {
  defaultElementCount?: number;
  maxCount?: number;
  rootElement: RET;
  render(props: renderProps<RET, CP>): ReactNode | ReactNode[];
}

export interface IncreasableState<RET extends rootElementType, CP = any> {
  elements: RET[] extends JSX.Element ? ComponentType<CP>[] : RET[];
}
