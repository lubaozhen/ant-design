import * as React from 'react';
import classNames from 'classnames';

import Radio from './radio';
import { RadioChangeEvent } from './interface';
import { AbstractCheckboxProps } from '../checkbox/Checkbox';
import { ConfigContext } from '../config-provider';
import RadioGroupContext from './context';
import useStyle from './style';

export type RadioButtonProps = AbstractCheckboxProps<RadioChangeEvent>;

const RadioButton = (props: RadioButtonProps, ref: React.Ref<any>) => {
  const radioGroupContext = React.useContext(RadioGroupContext);
  const { getPrefixCls } = React.useContext(ConfigContext);

  const { prefixCls: customizePrefixCls, ...radioProps } = props;
  const prefixCls = getPrefixCls('radio-button', customizePrefixCls);

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls, getPrefixCls());

  if (radioGroupContext) {
    radioProps.checked = props.value === radioGroupContext.value;
    radioProps.disabled = props.disabled || radioGroupContext.disabled;
  }

  const classString = classNames(radioProps.className, hashId);

  return wrapSSR(
    <Radio prefixCls={prefixCls} {...radioProps} className={classString} type="radio" ref={ref} />,
  );
};

export default React.forwardRef(RadioButton);
