# A_Eye
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/b81fcb02-1485-4ef5-8a0f-ae98df7eb9b2" width="100%" height="100%">

</br>

# 1. 개요
## 💡 프로젝트 소개
### AI를 기반으로 한 맞춤형 광고 송출 및 광고 신청 플랫폼 서비스
  - 엘리베이터 CCTV를 통해 객체를 인식하여, 연령과 성별을 분석한다.
  - 분석된 결과를 기반으로 맞춤화된 광고를 제공한다.
  - 광고주는 노출되기 원하는 연령과 성별을 선택하여 광고를 신청한다.
  - 광고가 재생되는 횟수를 카운트하여 재생된 횟수만큼 결제가 가능하다.

</br>

## 💡 제안배경
- 엘리베이터 시장, 2028년까지 연평균 4.42% 성장 전망
- 전세계 광고비 지출 규모 2023년 대비 2024년 8.2% 증가 예상
  
</br>

# 2. 사용 언어
| 구분         | 내용               |
|--------------|-------------------|
| 사용 언어    | <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" /> <img src="https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white" /> <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" /> <img src="https://img.shields.io/badge/CSS-239120?style=for-the-badge&logo=css3&logoColor=white" /> |
| DB  | <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=black" />|
| API |<img src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png" width="90"> <img src="https://github.com/KIMGUUNI/A_EyeF/assets/142488051/cf812fad-134d-4308-8f9a-b4c73dc10640" width="90"> <img src="https://github.com/KIMGUUNI/A_EyeF/assets/142488051/4df68764-35cb-4886-8d90-f105eb4ccf13" width="90">|
| BACK-END  |  <img src="https://blog.kakaocdn.net/dn/bpMn1w/btqEbuwPNvX/VNyzW4QFj1NGoCuQB3EwG0/img.jpg" height="30">|
| storage   | <img src="https://techrecipe.co.kr/wp-content/uploads/2020/08/200824_Google-Drive_001.jpg" width="100">  |
| 라이브러리| <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" />  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTc1aov4a4ONcOBVIXydQjhh5intGt6j8yz5D9vdHe4p-gJAth-jzTUsaMS9cyMpQy66Q&usqp=CAU" width="80">  |
| WebServer    | <img src="https://images.velog.io/images/dbfudgudals/post/2ec0586e-1d62-475d-85c4-0f78b9d2fc34/image.png" width="100">    |
| IDE   | <img src="https://img.shields.io/badge/Eclipse-2C2255?style=for-the-badge&logo=eclipse&logoColor=white" /> |

</br>

# 3. ERD 
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/d002a731-40eb-4bec-9337-c2773b836a6a" width="100%" height="100%">

</br>

# 4. 시스템 아키텍처 
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/118683437/25ef6622-a5e7-499e-8194-a85fb37de62d" width="100%" height="100%">

</br>

# 5. 시스템 흐름도 
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/118683437/cf6d6b0c-e1b0-4fe7-8c0f-80bb4685b7fc" width="100%" height="100%">

</br>

# 6. 기능

<details>

<summary>기능 보기</summary>

## 6.1 Security
![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/236167f1-2452-4775-bf4b-b063490f5811)

- JWT를 통해 페이지 권한 부여한다.
- 비밀번호를 암호화 한다.

</br>

## 6.2 객체 인식

![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/35f870a4-92a9-4826-a4b3-ee89c3f1721b)


- YOLOv8을 통해 객체의 얼굴을 인식한다.
- CNN기반의 모델을 통해 나이와 성별을 예측한다.
- 예측된 값을 SQS Message Body에 담아 전송한다.

</br>

## 6.3 광고 송출

![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/ff2119fd-ec08-46d3-accf-dda6792282e1)
![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/baf10eb0-9b1a-4bd8-ab9c-5b837b131dc7)



  - Message로 Lambda 함수 트리거가 작동한다.
  - S3 객체 URL 반환 후 API Gateway WebSocket으로 실시간으로 영상이 송출된다.

</br>

## 6.4 광고 신청
![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/a45c5e19-6983-4967-8d83-52d0f6b00479)



  - 사용자는 원하는 타겟의 성별과 연령을 선택한다.
  - 선택 후 광고 파일을 업로드한다.
  - 광고 신청 버튼을 클릭하면 데이터베이스 및 S3에 정보가 저장된다.

</br>

## 6.5 광고 승인

![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/08cb2c11-c304-4a9b-be74-b9fa29640e87)

  - 광고 승인 대기 목록들이 보여진다.
  - 광고 승인 시, 기존 S3 URL 파일을 복사하여 새로운 폴더에 저장되고 기존의 파일은 삭제된다.


</br>

## 6.6 대시보드

![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/a4b672bb-3706-4d58-ae6c-86527aa44961)
  
  - 클릭된 광고의 정보를 확인할 수 있다.
  - 클릭된 광고의 노출 횟수와 광고 타겟 정보가 대시보드로 보여진다.

</br>

## 6.7 광고 결제

![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/8547053a-4efc-4f9e-9e1f-a770c049d704)


  - 신청한 광고의 현재 재생 횟수에 따른 결제 금액이 보여진다.
  - 결제를 원하는 광고를 선택하여 결제 가능하다.
  - 간편 결제가 가능하다. (카카오페이,삼성페이 등)

</br>

## 6.8 문의글 답변 및 삭제

![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/20c8f44e-0cf9-45d6-a8dd-5c8a1dc61890)

  - 사용자는 문의글 작성이 가능하다.
  - 관리자는 모든 문의 내용 열람, 답변 및 삭제가 가능하다.

</br>

## 6.9 반응형 웹

![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/20b82c41-1e28-4d95-9618-e1d76044d502)

  - 화면 크기에 따라 최적화되는 반응형 웹 페이지를 구현했다.

</details>

# 7. 트러블 슈팅
### 📍 토큰 관리 문제

<details>
<summary><b> 자세히 보기</b></summary>
  
#### 문제 상황
  - 리프레시 토큰을 DB에 저장 시, 만료된 토큰이 DB에 계속 쌓이는 문제 발생

#### 해결 시도
  - DB 스케줄러를 이용하여 주기적으로 삭제하려 했으나, 권한 부여의 어려움 발생

#### 해결 방안
  - 스프링 스케줄러를 활용, 만료된 토큰을 삭제하여 해결

~~~java

@Scheduled(fixeRate=604800000)

~~~


</details>

</br>

### 📍 웹 소켓 통신 모니터링 및 로깅문제

<details>
<summary><b> 자세히 보기</b></summary>

#### 문제 상황
  - 람다함수 안에서 웹 소켓 사용 시, Cloud Watch 에서 모니터링 및 로깅 확인 불가능

#### 해결 시도
  - 웹 소켓을 사용하려 했으나, 직접 라이브러리를 다운받아 압축하여 함수 안에 집어 넣어야 하는 번거로움이 발생

#### 해결 방안
  - API Gateway Websocket을 사용 >> Cloud Watch 에서 모니터링 및 로깅 확인 가능


</details>

</br>

# 8. 개발 기간 및 작업관리
## 개발 기간
> - 전체 개발 기간 : 2024-02-01 ~ 2024-02-27

</br>

 ## 작업관리
> - GitHub를 사용하여 프로젝트 협업을 진행하였습니다.
> - 매일 프로젝트를 진행하기 전 작업 순서와 방향성에 대해 회의를 하고 새롭게 배운 내용을 공유하는 시간을 가졌습니다.

</br>

# 9. 팀원소개

<table>
  <tr>
    <td align="center"><img src="https://github.com/KIMGUUNI/A_EyeF/assets/118683437/459cea7a-7324-4e4c-8783-6157db8847f6" width="140" height="180" /></td>
    <td align="center"><img src="https://github.com/KIMGUUNI/A_EyeF/assets/118683437/278b105e-c98e-4238-a8b3-0a6a54cd0908" width="140" height="180" /></td>
    <td align="center"><img src="https://github.com/KIMGUUNI/A_EyeF/assets/118683437/bc2b30e0-8924-4194-8a75-a6c959398132" width="140" height="180" /></td>
    <td align="center"><img src="https://github.com/KIMGUUNI/A_EyeF/assets/118683437/90e2da19-10cb-4fd2-a11f-fed623fa2eb7" width="140" height="180" /></td>
    <td align="center"><img src="https://github.com/KIMGUUNI/A_EyeF/assets/118683437/92c07452-b00e-4914-b8ed-4d5562c68609" width="140" height="180" /></td>
  </tr>
  <tr>
    <td align="center"><strong>김건휘</strong></td>
    <td align="center"><strong>김찬혁</strong></td>
    <td align="center"><strong>조원제</strong></td>
    <td align="center"><strong>임혜지</strong></td>
    <td align="center"><strong>박형찬</strong></td>
  </tr>
  <tr>
    <td align="center"><b>Project Manager</b></td>
    <td align="center"><b>Backend</b></td>
    <td align="center"><b>Backend</b></td>
    <td align="center"><b>Modeling</b></td>
    <td align="center"><b>Frontend</b></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/KIMGUUNI" target='_blank'>github</a></td>
    <td align="center"><a href="https://github.com/chanhyuckkim" target='_blank'>github</a></td>
    <td align="center"><a href="https://github.com/jaewon07" target='_blank'>github</a></td>
    <td align="center"><a href="https://github.com/Limmaji" target='_blank'>github</a></td>
    <td align="center"><a href="https://github.com/phc1235" target='_blank'>github</a></td>
  </tr>
</table>

</br>

# 10. API 
날씨 https://openweathermap.org/

뉴스 https://newsapi.org/

결제 https://portone.io/
