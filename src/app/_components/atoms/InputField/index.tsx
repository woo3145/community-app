import { forwardRef } from 'react';
import styles from './styles.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  size?: any;
  dataCy?: string;
}
const InputField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, size = 'md', className, dataCy, ...inputProps } = props;
  return (
    <div className={`${styles.inputBox} ${styles[size]}`}>
      <label htmlFor="password">{label}</label>
      <input
        ref={ref}
        {...inputProps}
        className={`${className}`}
        data-cy={dataCy}
      />
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
