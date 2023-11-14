import React, { useEffect } from 'react'

const { kakao } = window;
//스크립트로 kakao maps api를 심어서 가져오면 window전역 객체에 들어가게 됩니다.
// 그런데 함수형 컴포넌트에서는 이를 바로 인식하지 못한다고 합니다.
// 그렇기 때문에 코드 상단에 const { kakao } = window를 작성하여 함수형 컴포넌트에 인지 시키고 window에서 kakao객체를 뽑아서 사용하면 됩니다.

export default function Map(props) {

    const{careLocation, carePlaceName, careTel} = props;
    

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center : new kakao.maps.LatLng(33.450701, 126.570667),
            level : 3,
        };
        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(careLocation, function(result, status) {

            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">'+ carePlaceName +'</div>'
                });
                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            } 
        });    
    },[])

    return (
        <div>
            <h1>보호소 위치</h1>
            <div id="map" style={{
                width: '500px',
                height: '500px'
            }}></div>
            <div>
                <h2>
                    전화번호 : {careTel}
                </h2>
            </div>
        </div>
    )
}