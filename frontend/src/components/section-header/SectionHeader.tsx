import { FC } from 'react';
import './section-header.css'

interface ISectionHeaderProps {
  text: string;
}

const SectionHeader: FC<ISectionHeaderProps> = ({ text }) => {
  return (
    <h2 className='section-header'>
      {text}
    </h2>
  );
}

export default SectionHeader;
