import React from 'react'
import styles from './loading.less'
import loadingUrl from '../../assets/loading.png'

const LoadingCom: React.FC<{}> = () => {
  return (
    <div className={styles.loading}>
      <img className={styles.loading_img} src={loadingUrl} />
    </div>
  )
}

export default LoadingCom
