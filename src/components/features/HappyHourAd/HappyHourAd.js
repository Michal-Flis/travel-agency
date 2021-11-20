import React from 'react';
import styles from './HappyHourAd.scss';
import PropTypes from 'prop-types';

class HappyHourAd extends React.Component {
  constructor(){
    super();

    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  getCountdownTime(){
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));

    if(currentTime.getUTCHours() >= 12){
      nextNoon.setUTCDate(currentTime.getUTCDate()+1);
    }

    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }

  getDescription(time){
    if (time > 23 * 60 * 60){
      return this.props.description;
    } else {
      return null;
    }
  }

  render(){
    const {title} = this.props;
    const timeToNoon = this.getCountdownTime();
    return(
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.promoDescription}>
          {this.getDescription(timeToNoon) || this.getCountdownTime()}
        </div>
      </div>
    );
  }
}

HappyHourAd.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default HappyHourAd;