import { forwardRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
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

  const labelClassName = `font-bold ${labelSizes[uiSize]}`;
  const inputClassName = `border border-solid rounded-sm outline-1 outline-primary ${inputSizes[uiSize]} ${className}`;

  return (
    <div className="w-full flex flex-col space-y-2.5">
      {label && (
        <label htmlFor="password" className={labelClassName}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={inputClassName}
        data-cy={dataCy}
        {...inputProps}
      />
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
