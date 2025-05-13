import UilBriefcaseAlt from '@iconscout/react-unicons/dist/icons/uil-briefcase-alt';
import UilAward from '@iconscout/react-unicons/dist/icons/uil-award';
import { FC } from 'react';
import { InfoCardStyle } from './Style';

export interface IInfoCard {
  counter?: string;
  text?: string;
  type?: 'primary' | 'secondary' | 'info' | 'warning' | 'success';
  icon?: string;
}

const InfoCard: FC<IInfoCard> = (props) => {
  const { counter = '21k', text = 'Total Products', icon = 'briefcase', type = 'primary' } = props;

  const renderIcon = () => {
    switch (icon) {
      case 'UilBriefcaseAlt':
        return <UilBriefcaseAlt />;
      case 'UilAward':
        return <UilAward />;
      default:
        return <></>;
    }
  };

  return (
    <InfoCardStyle type={type}>
      <span className="ninjadash-infocard-icon">{renderIcon()}</span>
      <p className="ninjadash-infocard-text">{text}</p>
      <h2 className="ninjadash-infocard-label">{counter}</h2>
    </InfoCardStyle>
  );
};

export default InfoCard;
