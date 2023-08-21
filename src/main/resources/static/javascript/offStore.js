const map = new naver.maps.Map("map",{
    center : new naver.maps.LatLng(37.5338151, 126.8969784),
    zoom : 18,
    zoomControl : true,
    zoomControlOptions : {
        position : naver.maps.Position.TOP_RIGHT,
        style : naver.maps.ZoomControlStyle.SMALL
    }
});//id가 map인 곳에 띄우라는 뜻
const marker = new naver.maps.Marker({
    position : new naver.maps.LatLng(37.5338151, 126.8969784),
    map : map//왼쪽map (속성이름), 오른쪽 map (위에 선언된 변수map)
});

let infoWindow = new naver.maps.InfoWindow();
let contentString = [
    "<div class='iw_inner'",
    "	<h3>신라호텔</h3>",
    "	<p>서울특별시 중구 동호로 249</p>",
    "</div>"
].join("");//""기준으로 문자열 다 붙임

//marker에 클릭이벤트 추가 : 마커 누르면 정보띄우기
naver.maps.Event.addListener(marker,"click",function(e){
    infoWindow = new naver.maps.InfoWindow({
        content : contentString
    });
    //태그를 넣은 infoWindow를 map의 marker위에 생성
    infoWindow.open(map,marker);
});

//map에 클릭이벤트 추가
naver.maps.Event.addListener(map,"click",function(e){
    console.log(e);
    marker.setPosition(e.coord);//클릭한 위치로 마커 이동
    map.setCenter(e.coord);		//클릭한 위치로 지도 중심 이동
    if(infoWindow.getMap()){	//정보창이 지도에 노출되어 있는 상태면
        infoWindow.close();
    }
    
    //위경도를 통해서 해당 위치의 주소를 구하기(reverseGeocode)
    naver.maps.Service.reverseGeocode({
        location : e.coord
    }, function(status, response){
        console.log(response);
        const address = response.result.items[1].address;
        console.log(address);
        contentString = [
            "<div class='iw_inner'",
            "	<p>"+address+"</p>",
            "</div>"
        ].join("");
    });
});
