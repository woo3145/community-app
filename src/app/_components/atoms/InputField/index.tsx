import { forwardRef } from 'react';
import styles from './styles.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  uiSize?: 'sm' | 'md' | 'lg';
  dataCy?: string;
}
const InputField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, uiSize = 'md', className, dataCy, ...inputProps } = props;
  const inputSizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-5 text-md',
    lg: 'py-3 px-5 text-md',
  };
  const labelSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-md',
  };
  return (
    <div className={`w-full flex flex-col ${labelSizes[uiSize]}`}>
      <label htmlFor="password" className="mb-2.5 font-bold">
        {label}
      </label>
      <input
        ref={ref}
        className={`${className} ${inputSizes[uiSize]} border border-1 border-solid rounded-sm mb-2.5 focus:border-blue-400`}
        data-cy={dataCy}
        {...inputProps}
      />
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
