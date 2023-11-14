import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../CSS/mainTop.css';

const MainTop = () => {
  const images = [
    'https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg',
    'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG',
    'https://modo-phinf.pstatic.net/20161226_61/1482734734945eeCYP_JPEG/mosaN7fhZ4.jpeg?type=w1100',
    'https://image.dongascience.com/Photo/2016/09/14750507361195.jpg',
    'https://contents.creators.mypetlife.co.kr/content/uploads/2021/07/10081500/cb047018639_l-1.jpg',
    'https://cdn.newstof.com/news/photo/202303/20152_20196_3216.jpg',

    // Add more image URLs as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동으로 슬라이드 넘김 활성화
    autoplaySpeed: 3500, // 넘어가는 속도를 2초로 설정 (ms 단위)
  };

  return (
    <>
    <div id='bar'>
        
        <div id='menu'>
            <span><a href='#'>보호소 찾기</a></span>
            <span><a href='#'>품종별 조회</a></span>
        </div>
        <div id='title'>
            <h1>멍멍왈왈</h1>
        </div>
        <div id='login'>
            <a href='#'>로그인 / 회원가입</a>
        </div>
        
    </div>
    <div id='slider_container'>
      <Slider {...settings} className='imageSlider'>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
    </> 
  );
};

export default MainTop;