import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';

import { withRouter } from 'react-router';

import BarcodeInputField from '../barcodeInputField';

import VideoSkeleton from './Video.skeleton';

import './video.css';

const Video = ({ history }) => {
  const [ videoInit, setVideoInit ] = useState(false);
  const [ videoError, setVideoError ] = useState(false);
  const [ attempts, setAttempts ] = useState(0);
  const [ barcode, setBarcode ] = useState(null);

  const onProductFound = (code) => {
    if (code === 'not-found') {
      history.push(`/product/${code}?code=${barcode}`);
    } else {
      history.push(`/product/${code}`);
    }
  }

  const onInitSuccess = () => {
    Quagga.start();
    setVideoInit(true);
  }

  const onDetected = (result) => {
    Quagga.offDetected(onDetected);
    fetch(`https://world.openfoodfacts.org/api/v0/product/${result.codeResult.code}.json`)
      .then(res => res.json())
      // eslint-disable-next-line no-use-before-define
      .then(res => onInfoFetched(res));
  }

  const onInfoFetched = (res) => {
    const { status, code } = res;
    setBarcode(code);
    setAttempts(prevState => prevState + 1);

    if (status === 1) {
      onProductFound(code);
    } else {
      Quagga.onDetected(onDetected);
    }
  }

  useEffect(() => {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#video')
        },
        numOfWorkers: 1,
        locate: true,
        decoder : {
          readers : ['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader']
        }
      }, (err) => {
          if (err) {
            setVideoError(true);
            return;
          }
          onInitSuccess();
      });
      Quagga.onDetected(onDetected);
      return () => Quagga.stop();
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (attempts > 3) {
      onProductFound('not-found');
    }
  }, [attempts]);

  return (
    <div>
      <div className="video__explanation">
        <p>Сканирование продукта штрих-код и получить его пищевую ценность <span role="img" aria-label="apple">🍎</span></p>
      </div>
      <div className="video__container">
        {videoError ?
          <div className="skeleton__unsopported">
            <div>
              <p>Ваше устройство не поддерживает доступ к камере или что-то пошло не так <span role="img" aria-label="thinking-face">🤔</span></p>
              <p>Вы можете ввести штрих-код ниже</p>
              <BarcodeInputField />
            </div>
          </div>
          :
          <div>
            <div className="video" id="video" />
            {videoInit ? '' : <VideoSkeleton />}
          </div>
        }
      </div>
    </div>
    );
}

export default withRouter(Video);
